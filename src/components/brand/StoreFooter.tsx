import { Link } from "@tanstack/react-router";

import {
  Crest,
  GlobeMark,
  MotionMark,
  NewJerseyMark,
  Numeric201,
  Wordmark,
} from "@/components/brand/BrandMarks";
import { CATEGORIES } from "@/lib/catalog";
import { DEPARTMENT_TO } from "@/lib/departments";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { cn } from "@/lib/utils";

const SLUG = BAYONNE_BEES_KIT.slug;

export function StoreFooter({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <footer
      className={cn(
        "border-t",
        inverted ? "border-bone/15 bg-black text-bone" : "border-ink/10 bg-paper text-ink",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1.1fr_1fr_0.8fr]">
        <div>
          <Wordmark variant="primary" align="left" />
          <p className="place-line mt-8">Train · Compete · Represent</p>
          <p className="type-editorial mt-5 max-w-sm text-xl text-current/80">Built different.</p>
          <MotionMark className="mt-6 block text-garnet" />
        </div>

        <div>
          <p className="place-line">Departments</p>
          <ul className="mt-6 space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  to={DEPARTMENT_TO[c.id]}
                  params={{ slug: SLUG }}
                  className="font-sans text-sm tracking-wide transition-opacity hover:opacity-55"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-8 lg:items-end">
          <Crest className="h-28 w-28" />
          <div className="flex items-end gap-6">
            <NewJerseyMark className="h-14 w-8 opacity-80" />
            <GlobeMark className="h-10 w-10 opacity-80" />
            <Numeric201 className="text-5xl" />
          </div>
          <p className="place-line">Fall 001 · 07002</p>
        </div>
      </div>
    </footer>
  );
}
