# No Parade F.C. — The System

## The one sentence

**A local design house that makes custom kits for teams a national vendor will not
bother to serve properly, and proves its care in details most people never notice.**

Everything below follows from that. When an instruction is missing, decide from it.

---

## PART I — THE FIVE LAWS

These govern design, code, copy, and commerce equally. They are not style preferences.

**1. Procession, not parade.**
Nothing performs for an audience. The design does not shout, the copy does not wink, the
mark does not compete with the team it serves. Work that calls attention to itself has
failed, however skilled it is.

**2. Specificity is the entire moat.**
"Garnet since 1936 — not maroon, not burgundy, not cardinal" defeats a national vendor
that no amount of scale can answer. Every decision should increase specificity: a real
color, a real date, a real address, a real person's name. Generic is the competition's
structural condition. Do not join them there.

**3. One source, many surfaces.**
One geometry definition renders the preview, the mockup, and the print file. One colorway
is on file forever. Coherence is not a
finishing touch; it is the product.

**4. Nothing ships unapproved.**
No print file is released without a recorded customer approval, and the approval is an
immutable snapshot. This protects the customer from a misspelled roster and the operator
from a disputed order. It is the most valuable feature in the system.

**5. The operator is the differentiator — automate around them, never over them.**
A person in Bayonne who designs the kit and answers a text at nine at night is the thing
no competitor can copy. Automate the roster math, the file generation, the queue. Never
automate the judgment or the relationship.

---

## PART II — THE DESIGN SYSTEM

### Pattern language
Motifs derive from **natural-system notation** — the ways humans record geological and
atmospheric processes. BASALT (columnar jointing), SHEAR (faulted bedding), ISOBAR
(pressure contours), FRONT (frontal boundary). This is deliberate: it gives every pattern
real structure, it generates its own doctrine lines, and it borrows from no culture, so
it can be sold anywhere without the appropriation exposure that federation kits carry by
design.

Never borrow a cultural motif. Source from stone, pressure, time, and the local built
environment.

### Pattern rules
- Tiles are defined in a shared 100 × 120 space and clipped to whichever silhouette is
  selected. Patterns are **sport-agnostic**; adding a sport means adding a path.
- Placement patterns (anchored rather than tiled, like ISOBAR) declare a per-silhouette
  anchor in the same module. Never solve this with scattered conditionals.
- Patterns render **tonal by default**. Contrast is three named steps — Tonal, Standard,
  Declared — never a slider. Sliders drift toward maximum.
- One gesture per kit. Families are never combined, layered, or stacked.

### Two design registers — know which garment you are designing

The restraint rules below govern **Match kits**, which are performance garments worn by
eleven people who must read as one unit. They are the wrong rules for spirit wear.

**MATCH register — restraint.** Tonal by default, one gesture, solid is legitimate. The
kit serves the team, not the individual wearing it.

**FAITHFUL register — legibility.** A hoodie is worn alone, in a crowd, by someone who is
not on the team. It must read from across a gym and photograph well from the stands. The
school name is legible. The year is legible. Contrast is Standard or Declared, rarely
Tonal. Our mark stays small; the team's identity is
allowed to be plainly visible.

Applying Match restraint to spirit wear produces a garment a grandmother cannot read from
row twelve. That is a design failure, not discipline.

### Restraint (Match register)
Solid is a legitimate design and should be the default. A team that cannot articulate a
reason for ornament should not have it. Negative space carries weight. No gradients, no
drop shadows, no outlines except on lettering where legibility demands it.

### Brand infusion — the inside/outside rule
**The team owns the outside. No Parade owns the inside and the edges.**
- Inside neck label carries the specification, not a logo: house, town, the exact color
  spec, and that it was cut and sewn to order.
- Outside back neck: the bar mark alone, small, no wordmark.
- A tonal mark placed where it rewards attention rather than demands it — one shade from
  the base, invisible at ten feet, unmistakable at arm's length.
- Hang tag and packing insert carry the only real sentences.

A parent should notice the same quiet mark on three garments a year apart and understand
there is a house behind them. That is the whole strategy.

---

## PART III — PRODUCT ARCHITECTURE

**Four tiers, named consistently everywhere:**
MATCH (game) · TRAINING · SIDELINE (coach, travel, warm-up) · FAITHFUL (alumni, boosters,
parents, students).

**Match is the anchor. Faithful is the volume.** A roster is eighteen people once a
season. A program's alumni, parents, and boosters are hundreds of people who buy for
years. The team order wins the account; the Faithful tier is the business that account
produces.

### The three Faithful buyers — design and merchandise for each by name

**PARENTS** buy to belong and to support. They buy in the moment — after a game, at
registration, when a link lands in the team group chat. They buy repeatedly across a
season and they are exactly the people who notice the color is wrong. Serve them with:
legible school identity, comfortable everyday cuts, broad sizing including women's fit,
and a store that is open when they remember to look.

**ALUMNI** buy memory, and memory has a date on it. They are the least price-sensitive
segment and the most under-served by national vendors, whose catalogs have no concept of
*when you were there*. **The year is the product.** Class-year personalization is a field
exactly like name and number, it is infinitely repeatable, and every graduating class is
its own segment. Spike moments: homecoming, reunions, championships, deaths in the
community, anniversaries of a title.

**BOOSTERS** buy to organize and to fund. They are the gateway to an entire program.
Serve them with a per-item give-back to the booster or league — this is the answer to a
national vendor's fundraising platform, and it is how one team becomes eight.

**Sell sets, not items.** A coach ordering eighteen match kits adds a training set without
a second conversation, and loses the order to indecision if asked to choose six items
separately.

**Publish prices and minimums.** Never "contact us for a quote." Quote-gating is the
national vendors' habit and coaches hate it. Visible pricing pre-qualifies every lead.

**Honest product boundaries.** Fulfillment decides what can be promised. State size runs,
inseams, and what is jersey-only rather than discovering it on delivery. Never sell a
varsity game kit into a sanctioned league without confirming the current rules in writing.

---

## PART IV — ENGINE DOCTRINE

**One geometry module.** Silhouettes, tiles, placements, lettering zones, mark positions.
Three consumers read it — SVG preview, canvas mockup, print export — and none
re-implement it. The question "where is this defined?" must have exactly one answer.

**Vector first, raster last.** Never upscale a preview into a print file. Render again at
print size from the same source.

**Deterministic.** Same design data, byte-identical render, every time. No unseeded
randomness. This is what makes a reorder in year three match year one.

**Order-derived.** The commerce order carries a compact art spec as a hidden property, so
every print file is regenerable from the order alone. Databases are conveniences; the
order is the source of truth. Nothing may become unfulfillable because a service was down.

**Fail loud on quality.** A font that will not load blocks export rather than substituting
silently. Artwork below the DPI floor blocks approval. Report the real number and the
pixel width that would fix it — never silently upscale.

**Verify before calling a phase done:** cross-consumer agreement within 1%, resolution
invariance at 1×/2×/4×, the full silhouette × pattern matrix rendered as one sheet, font
loading, and extreme states. "It looked right on my screen" is not verification.

---

## PART V — COMMERCE SPINE

Shopify owns the cart, payment, orders, and email. The engine owns design and art. They
connect by a plain form POST carrying line-item properties — never an iframe, never a
cross-origin cart API, both of which fail on mobile in ways you learn about from an angry
coach rather than a test.

**Two store models, and do not confuse them.**

**Team stores close.** Roster-driven, a visible countdown, a fixed window. Players order
individually with their own name, number, and size; no coach collects cash. The coach's
roster controls identity; the player only chooses a size. Closing dates create the urgency
that gets a roster to actually order.

**Program stores stay open.** The Faithful tier is year-round with seasonal spikes, and
closing it is leaving money on the table. Alumni do not order on the coach's schedule.
Keep the program store live permanently, and merchandise it against the calendar:
back-to-school, homecoming, championship runs, graduation, the holidays, reunion years.

A closed store when an alumnus finally clicks the link is the most expensive kind of
tidiness.

---

## PART VI — VOICE

**Two registers. Never mixed.**

**Persuasion** — team pages, outreach, FAQ, approval pages. Long copy, because the
purchase is considered and the buyer is accountable to other people. Facts over
adjectives. Prices stated. Objections answered before they are raised.

**Restraint** — retail brand world, product pages, the homepage. Short, plain,
declarative. State what a thing is and what it does.

**A note on warmth for the Faithful tier.** Plainness written for a coach reads cold to a
parent or an alumnus, who is buying for reasons that are not functional. Stay free of
hype, but let place and memory in: the town, the year, the address, the thing that has
been true since 1936. Warmth is not the same as hype. The difference is that warmth is
specific and hype is inflated.

**Never:** superlatives without evidence, empty intensifiers, exclamation points,
"elevate / unleash / game-changer," jokes, knowing asides, or any line a competitor could
run unchanged. Cleverness that draws attention to the writing is the copy performing for
an audience, which the thesis rejects.

**Every claim must be provable on a phone call.** If it cannot be proved, delete it.

---

## PART VII — WHAT WE REFUSE

- Free-form design. Every kit belongs to a named family with fixed DNA.
- Borrowed cultural motifs.
- Invented testimonials, implied endorsements, or "trusted by" claims without names.
- Presenting a generated mockup as a photograph of the product.
- School or club marks without written authorization.
- Discounting the founding collections alongside clearance.
- Competing on shipping speed against a warehouse. Compete on decision speed — a proof in
  48 hours against a national vendor's weeks — and on being the only vendor who knows the
  town.

---

## THE DECISION TEST

Before shipping any design, line, feature, or product:

1. Is it true, and can it be proved?
2. Does it increase specificity, or retreat toward generic?
3. Does it serve the team, or does it perform?
4. Would it still be right in three seasons, when this team reorders?
5. Could a national vendor do this exact thing? If yes, it is not the work.
6. Who is buying this — a coach, a parent, an alumnus, a booster? Design and write for
   that person specifically. A garment made for everyone is made for no one.
