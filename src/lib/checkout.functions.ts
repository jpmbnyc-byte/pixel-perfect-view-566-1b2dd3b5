import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import Stripe from "stripe";
import { z } from "zod";

import {
  CHECKOUT_CURRENCY,
  INTEGRATION_IDENTIFIER,
  resolveCheckout,
  shippingOptionsFor,
  storeIsOpen,
  type CheckoutInput,
} from "@/lib/checkout";
import { shoeRunFor } from "@/lib/footwear";

const checkoutInput = z.object({
  productId: z.string().min(1),
  size: z.string().min(1),
  name: z.string().optional(),
  number: z.string().optional(),
  fontId: z.string().optional(),
});

function stripeClient() {
  const key = process.env["STRIPE_SECRET_KEY"]?.trim();
  if (!key) return null;
  return new Stripe(key);
}

function originFromRequest() {
  try {
    return getRequestUrl({ xForwardedHost: true, xForwardedProto: true }).origin;
  } catch {
    return "http://127.0.0.1:43177";
  }
}

function mockCompleteUrl(origin: string, input: CheckoutInput, description: string, amount: number) {
  const q = new URLSearchParams({
    mock: "1",
    product: input.productId,
    size: input.size,
    amount: String(amount),
    description,
  });
  return `${origin}/order/complete?${q.toString()}`;
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator(checkoutInput)
  .handler(async ({ data }) => {
    if (!storeIsOpen()) {
      throw new Error("Fall 001 checkout is closed.");
    }

    const resolved = resolveCheckout({
      productId: data.productId,
      size: data.size,
      ...(data.name ? { name: data.name } : {}),
      ...(data.number ? { number: data.number } : {}),
      ...(data.fontId ? { fontId: data.fontId } : {}),
    });
    if (!resolved.ok) throw new Error(resolved.error);

    const origin = originFromRequest();
    const { product, unitAmount, description, size, name, number, fontLabel, personalized } =
      resolved.value;
    const shoe = product.sizeChart === "shoe" ? shoeRunFor(product.id, size) : undefined;

    const stripe = stripeClient();
    if (!stripe) {
      return { url: mockCompleteUrl(origin, { productId: data.productId, size: data.size }, description, unitAmount), mode: "mock" as const };
    }

    const shipping = shippingOptionsFor(unitAmount);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: INTEGRATION_IDENTIFIER,
      customer_creation: "if_required",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "IE", "AU", "NZ"],
      },
      shipping_options: shipping.map((option) => ({
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: option.amount, currency: CHECKOUT_CURRENCY },
          display_name: option.displayName,
          delivery_estimate: {
            minimum: { unit: "business_day", value: option.minDays },
            maximum: { unit: "business_day", value: option.maxDays },
          },
        },
      })),
      allow_promotion_codes: true,
      custom_fields: [
        {
          key: "note",
          label: { type: "custom", custom: "Order note" },
          type: "text",
          optional: true,
        },
      ],
      custom_text: {
        shipping_address: {
          message: "Made to order for Fall 001. Ships after production — not next-day warehouse stock.",
        },
        submit: {
          message: personalized
            ? "Personalized pieces cannot be changed or returned after checkout."
            : "Made-to-order pieces follow the Fall 001 production window.",
        },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CHECKOUT_CURRENCY,
            unit_amount: unitAmount,
            product_data: {
              name: product.name,
              description,
              metadata: { product_id: product.id },
            },
          },
        },
      ],
      metadata: {
        collection: "Fall 001",
        product_id: product.id,
        product_name: product.name,
        size,
        name,
        number,
        font: fontLabel ?? "",
        personalized: personalized ? "yes" : "no",
        upc: shoe?.upc ?? "",
      },
      success_url: `${origin}/order/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancel?product=${encodeURIComponent(product.id)}`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return { url: session.url, mode: "stripe" as const };
  });

export type OrderSummary = {
  mode: "stripe" | "mock";
  paid: boolean;
  email: string | null;
  productName: string;
  description: string;
  amountTotal: number | null;
  shippingCents: number | null;
  note: string | null;
};

export const loadOrderSummary = createServerFn({ method: "GET" })
  .validator(
    z.object({
      sessionId: z.string().optional(),
      mock: z.string().optional(),
      product: z.string().optional(),
      size: z.string().optional(),
      amount: z.string().optional(),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ data }): Promise<OrderSummary | null> => {
    if (data.mock === "1") {
      const resolved = data.product ? resolveCheckout({ productId: data.product, size: data.size ?? "M" }) : null;
      return {
        mode: "mock",
        paid: false,
        email: null,
        productName: resolved?.ok ? resolved.value.product.name : "Fall 001 piece",
        description: data.description ?? (resolved?.ok ? resolved.value.description : ""),
        amountTotal: data.amount ? Number(data.amount) : null,
        shippingCents: null,
        note: "Local fallback — add STRIPE_SECRET_KEY to enable hosted Stripe Checkout.",
      };
    }

    if (!data.sessionId) return null;
    const stripe = stripeClient();
    if (!stripe) return null;

    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items"],
    });

    const noteField = session.custom_fields?.find((field) => field.key === "note");
    const line = session.line_items?.data[0];

    const meta = session.metadata ?? {};
    return {
      mode: "stripe",
      paid: session.payment_status === "paid",
      email: session.customer_details?.email ?? session.customer_email ?? null,
      productName: line?.description ?? meta["product_name"] ?? "Fall 001",
      description: [meta["size"] && `Size ${meta["size"]}`, meta["name"], meta["number"]]
        .filter(Boolean)
        .join(" · "),
      amountTotal: session.amount_total,
      shippingCents: session.shipping_cost?.amount_total ?? null,
      note: noteField?.text?.value ?? null,
    };
  });
