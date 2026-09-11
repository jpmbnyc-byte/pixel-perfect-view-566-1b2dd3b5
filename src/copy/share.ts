/**
 * Share language — the same voice as the storefront, not platform jargon.
 * Captions are what gets pasted into messages, notes, and native share sheets.
 */

import { COLLECTION_COPY, DEPARTMENT_COPY, productCopyFor } from "@/copy/collection";
import type { CategoryId } from "@/lib/catalog";

export const SHARE_COPY = {
  passOn: "Pass it on",
  copied: "Copied. Represent.",
  siteName: COLLECTION_COPY.brand,
  ogAlt: "Bayonne Athletics shop, 07002. Built different. Harbor Sweatpant — Heather Grey / Garnet.",
} as const;

export const OG_IMAGE = "/og.jpg";

export type SharePayload = {
  title: string;
  description: string;
  caption: string;
  path: string;
};

function lines(...parts: Array<string | undefined | false>) {
  return parts.filter((part): part is string => Boolean(part && part.trim())).join("\n");
}

export function shareHome(): SharePayload {
  return {
    title: `${COLLECTION_COPY.brand} — ${COLLECTION_COPY.season}`,
    description: `${COLLECTION_COPY.lockup} ${COLLECTION_COPY.community} Match, performance, travel, Harbor Division and club goods.`,
    caption: lines(
      COLLECTION_COPY.lockup,
      `${COLLECTION_COPY.brand} — ${COLLECTION_COPY.season}`,
      COLLECTION_COPY.community,
      COLLECTION_COPY.motto,
    ),
    path: "/team",
  };
}

export function shareProduct(product: {
  id: string;
  name: string;
  line: string;
  handle: string;
}): SharePayload {
  const copy = productCopyFor(product.id);
  const tagline = copy?.tagline ?? COLLECTION_COPY.lockup;
  const card = copy?.card;
  return {
    title: `${product.name} — ${COLLECTION_COPY.brand}`,
    description: [tagline, card, product.line, COLLECTION_COPY.place].filter(Boolean).join(" "),
    caption: lines(tagline, `${product.name} — ${COLLECTION_COPY.brand}`, product.line, COLLECTION_COPY.motto),
    path: `/team/bayonne-bees/${product.id}`,
  };
}

export function shareDepartment(id: CategoryId): SharePayload {
  const dept = DEPARTMENT_COPY[id];
  const labels: Record<CategoryId, string> = {
    match: "1936 Match",
    performance: "Performance",
    travel: "Travel + Core",
    harbor: "Harbor Division",
    club: "Club Goods",
  };
  return {
    title: `${labels[id]} — ${COLLECTION_COPY.brand} ${COLLECTION_COPY.season}`,
    description: `${dept.title} ${dept.body} ${COLLECTION_COPY.lockup} ${COLLECTION_COPY.place}.`,
    caption: lines(dept.title, `${labels[id]} — ${COLLECTION_COPY.brand}`, COLLECTION_COPY.lockup, COLLECTION_COPY.motto),
    path: `/team/bayonne-bees/${id === "match" ? "match" : id}`,
  };
}
