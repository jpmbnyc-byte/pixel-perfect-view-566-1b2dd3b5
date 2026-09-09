/**
 * Landing editorial: people and places, not a second catalog grid.
 * Captions name streets / waterfront / 07002 — never invented people.
 */

import type { CanonicalProductId } from "@/lib/imageRegistry";

import stadiumTunnel from "@/assets/bayonne/fall001/match-jersey-stadium.png";
import beanieOnSteps from "@/assets/bayonne/fall001/gothic-b-beanie-black-lifestyle.png";
import travelCouple from "@/assets/bayonne/fall001/travel-couple.png";
import travelMenFront from "@/assets/bayonne/fall001/travel-men-front.png";
import travelWomenSeated from "@/assets/bayonne/fall001/lookbook-travel-women-seated.jpg";
import harborCoachWorn from "@/assets/bayonne/fall001/harbor-coach-worn.png";
import twoToneCap from "@/assets/bayonne/fall001/lookbook-two-tone-cap.jpg";

export type PlacePlate = {
  id: string;
  src: string;
  productId: CanonicalProductId;
  place: string;
  caption: string;
  alt: string;
  span: "feature" | "tall" | "standard";
};

export const PEOPLE_PLACES: PlacePlate[] = [
  {
    id: "stadium-tunnel",
    src: stadiumTunnel,
    productId: "heritage-jersey",
    place: "Stadium tunnel",
    caption: "Match kit, on the way in.",
    alt: "1936 Match Jersey, worn in a stadium tunnel",
    span: "feature",
  },
  {
    id: "on-the-steps",
    src: beanieOnSteps,
    productId: "gothic-b-beanie",
    place: "On the steps",
    caption: "Gothic B. Off the field.",
    alt: "Gothic B Beanie, worn on concrete steps",
    span: "tall",
  },
  {
    id: "travel-couple",
    src: travelCouple,
    productId: "travel-set",
    place: "Two fits",
    caption: "Travel weight. The 07002 mark on both.",
    alt: "Travel Set, couple wearing Max Heavy",
    span: "standard",
  },
  {
    id: "travel-solo-men",
    src: travelMenFront,
    productId: "max-heavy-full-zip",
    place: "Solo",
    caption: "Max Heavy, standing.",
    alt: "Travel Set, men’s full-body front",
    span: "standard",
  },
  {
    id: "travel-solo-women",
    src: travelWomenSeated,
    productId: "travel-set",
    place: "Solo",
    caption: "Same heavyweight. Seated.",
    alt: "Travel Set, women’s seated studio shot",
    span: "standard",
  },
  {
    id: "harbor-worn",
    src: harborCoachWorn,
    productId: "harbor-coach",
    place: "Harbor Division",
    caption: "07002 on the chest. Worn.",
    alt: "Harbor Division Hooded Coach Jacket, worn",
    span: "standard",
  },
  {
    id: "club-cap",
    src: twoToneCap,
    productId: "two-tone-cap",
    place: "Club cap",
    caption: "Bone crown. Black bill. Garnet B.",
    alt: "Two-Tone Club Cap, worn against a neighborhood wall",
    span: "standard",
  },
];
