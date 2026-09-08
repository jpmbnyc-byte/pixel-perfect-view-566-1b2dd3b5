import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { MotionMark, Numeric201, Wordmark } from "@/components/brand/BrandMarks";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/lib/catalog";
import { DEPARTMENT_TO } from "@/lib/departments";
import { BAYONNE_BEES_KIT } from "@/lib/kits/bayonne-bees";
import { cn } from "@/lib/utils";

const SLUG = BAYONNE_BEES_KIT.slug;

type Props = {
  className?: string;
  /** Overlay a dark hero without a bone bar. */
  inverted?: boolean;
};

export function StoreNav({ className, inverted = false }: Props) {
  const tone = inverted
    ? "border-bone/15 bg-black/30 text-bone backdrop-blur-md"
    : "border-ink/10 bg-paper/95 text-ink backdrop-blur-md";

  return (
    <header className={cn("sticky top-0 z-50 border-b", tone, className)}>
      <div className="mx-auto grid h-[4.25rem] w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Departments">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={DEPARTMENT_TO[c.id]}
              params={{ slug: SLUG }}
              className="place-line text-current transition-opacity hover:opacity-55"
            >
              {c.label.replace("1936 ", "").replace(" + Core", "")}
            </Link>
          ))}
        </nav>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="tap-44 inline-flex items-center justify-center focus-ring"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.25} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[min(100%,22rem)] border-ink/10 bg-paper text-ink sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Bayonne Athletics</SheetTitle>
                <Wordmark variant="compact" />
                <p className="place-line mt-4">Train · Compete · Represent</p>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-5" aria-label="Departments">
                {CATEGORIES.map((c) => (
                  <SheetClose asChild key={c.id}>
                    <Link
                      to={DEPARTMENT_TO[c.id]}
                      params={{ slug: SLUG }}
                      className="type-campaign text-2xl text-ink"
                    >
                      {c.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <p className="mt-12">
                <MotionMark className="text-garnet" />
              </p>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          to="/team"
          className="justify-self-center focus-ring"
          aria-label="Bayonne Athletics home"
        >
          <Wordmark variant="compact" />
        </Link>

        <div className="flex items-center justify-end gap-5">
          <Link
            to="/team/$slug/match"
            params={{ slug: SLUG }}
            className="place-line hidden text-current transition-opacity hover:opacity-55 sm:inline"
          >
            Shop
          </Link>
          <Numeric201 className="text-[1.15rem] opacity-80" />
        </div>
      </div>
    </header>
  );
}
