# Refine the homepage slider

## Goal
Turn the static homepage lead image into a polished, Etnies-inspired campaign slider while preserving Bayonne Athletics’ typography, colors, photography, and store links.

## Changes
- Build a full-width campaign carousel using the strongest existing Fall 001 imagery.
- Give each slide its own concise collection message and relevant shop destination.
- Add clear previous/next controls, slide count, progress indicators, and swipe support.
- Use restrained crossfades and subtle image movement; pause on interaction and honor reduced-motion settings.
- Tune desktop and mobile crops independently so products and overlaid copy remain legible.
- Keep the next homepage section visible below the first screen and retain one accessible page heading.

## Validation
- Test automatic advance, manual controls, keyboard focus, links, and pause behavior.
- Review desktop and mobile screenshots for image crop, copy contrast, overlap, and layout stability.

## Technical details
- Refactor the existing `LandingHero` rather than adding another competing slider.
- Reuse bundled campaign assets and semantic design tokens; no external media or copied Etnies branding.
- Keep the existing TanStack routes and product destinations unchanged.
