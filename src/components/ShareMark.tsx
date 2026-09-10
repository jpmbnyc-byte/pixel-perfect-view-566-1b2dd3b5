"use client";

import { useState } from "react";

import { SHARE_COPY, type SharePayload } from "@/copy/share";
import { cn } from "@/lib/utils";

type Props = {
  payload: SharePayload;
  className?: string;
  tone?: "ink" | "bone";
};

export function ShareMark({ payload, className, tone = "ink" }: Props) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  const onShare = async () => {
    const url = typeof window === "undefined" ? payload.path : window.location.href;
    const text = `${payload.caption}\n${url}`;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: payload.title, text: payload.caption, url });
        return;
      }
      await navigator.clipboard.writeText(text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2200);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(text);
        setState("copied");
        window.setTimeout(() => setState("idle"), 2200);
      } catch {
        setState("idle");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      className={cn(
        "place-line tap-44 inline-flex items-center transition-opacity hover:opacity-70 focus-ring",
        tone === "bone" ? "text-bone" : "text-ink",
        className,
      )}
    >
      {state === "copied" ? SHARE_COPY.copied : SHARE_COPY.passOn}
    </button>
  );
}
