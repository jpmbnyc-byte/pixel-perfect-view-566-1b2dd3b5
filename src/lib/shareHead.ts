import { OG_IMAGE, SHARE_COPY, type SharePayload } from "@/copy/share";

/** Stable public card. Locals know the block; the BA stamp is ours. */
export function shareHead(payload: SharePayload, opts?: { type?: "website" | "product"; image?: string }) {
  const image = opts?.image ?? OG_IMAGE;
  const type = opts?.type ?? "website";
  return {
    meta: [
      { title: payload.title },
      { name: "description", content: payload.description },
      { property: "og:site_name", content: SHARE_COPY.siteName },
      { property: "og:title", content: payload.title },
      { property: "og:description", content: payload.description },
      { property: "og:type", content: type },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: SHARE_COPY.ogAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: payload.title },
      { name: "twitter:description", content: payload.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: payload.path }],
  };
}
