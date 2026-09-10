/**
 * Horizontal lookbook rail under the hero.
 * Each slide is a boosted studio still that opens a live product page.
 */

import type { CanonicalProductId } from "@/lib/imageRegistry";
import type { CategoryId } from "@/lib/catalog";

import lookbookMaxHeavyClose from "@/assets/bayonne/fall001/lookbook-max-heavy-close.jpg";
import lookbookTravelWomenSeated from "@/assets/bayonne/fall001/lookbook-travel-women-seated.jpg";
import lookbookTwoToneCap from "@/assets/bayonne/fall001/two-tone-cap-model-front.png";
import lookbookFieldCargoProfile from "@/assets/bayonne/fall001/lookbook-field-cargo-profile.jpg";
import lookbookFieldCargoBack from "@/assets/bayonne/fall001/lookbook-field-cargo-back.jpg";
import lookbookHarborCoachWorn from "@/assets/bayonne/fall001/lookbook-harbor-coach-worn.jpg";
import lookbookPerformanceWomen from "@/assets/bayonne/fall001/lookbook-performance-women.jpg";

export type HeroSlide = {
  id: string;
  src: string;
  productId: CanonicalProductId;
  category: CategoryId;
  alt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "max-heavy-close",
    src: lookbookMaxHeavyClose,
    productId: "max-heavy-full-zip",
    category: "travel",
    alt: "Max Heavy Full Zip, chest mark close-up",
  },
  {
    id: "travel-women-seated",
    src: lookbookTravelWomenSeated,
    productId: "travel-set",
    category: "travel",
    alt: "Travel Set, women’s seated studio shot",
  },
  {
    id: "two-tone-cap-look",
    src: lookbookTwoToneCap,
    productId: "two-tone-cap",
    category: "club",
    alt: "Two-Tone Club Cap, bone crown, black bill, garnet Gothic B, worn",
  },
  {
    id: "field-cargo-profile",
    src: lookbookFieldCargoProfile,
    productId: "field-cargo",
    category: "travel",
    alt: "Field Cargo, worn profile",
  },
  {
    id: "field-cargo-back",
    src: lookbookFieldCargoBack,
    productId: "field-cargo",
    category: "travel",
    alt: "Field Cargo, rear pocket and Local Issue mark",
  },
  {
    id: "harbor-coach-worn",
    src: lookbookHarborCoachWorn,
    productId: "harbor-coach",
    category: "harbor",
    alt: "Harbor Division Hooded Coach Jacket, worn",
  },
  {
    id: "performance-women",
    src: lookbookPerformanceWomen,
    productId: "performance-set",
    category: "performance",
    alt: "Performance Set, women’s studio shot",
  },
];

export function slidesForCategory(category?: CategoryId) {
  if (!category) return HERO_SLIDES;
  return HERO_SLIDES.filter((slide) => slide.category === category);
}
