import { useEffect, useState } from "react";
import { countdownParts } from "@/lib/kit";

type Props = {
  closesAt: string;
  className?: string;
};

function labelFrom(closesAt: string, now: number) {
  const parts = countdownParts(closesAt, now);
  if (!parts) return null;
  if (parts.days > 0) return `${parts.days}d ${parts.hours}h`;
  if (parts.hours > 0) return `${parts.hours}h ${parts.minutes}m`;
  return `${parts.minutes}m`;
}

/** Soft urgency from kit.closesAt — no false scarcity. */
export function StoreCloseCountdown({ closesAt, className = "" }: Props) {
  const [label, setLabel] = useState(() => labelFrom(closesAt, Date.now()));

  useEffect(() => {
    const tick = () => setLabel(labelFrom(closesAt, Date.now()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [closesAt]);

  if (!label) {
    return (
      <p className={`label-caps text-bone/45 ${className}`}>
        Match roster window closed · Faithful stays open
      </p>
    );
  }

  return (
    <p className={`label-caps text-bone/55 ${className}`}>
      Match roster window · <span className="text-bone">{label}</span> left
    </p>
  );
}
