```markdown
# Design System Strategy: The Radical Record

## 1. Overview & Creative North Star
This design system is built upon the "Radical Record" philosophy. It is an aesthetic of **Brutalist Sophistication**—a high-tension intersection between the raw, unapologetic energy of political manifestos and the disciplined, structural integrity of Swiss international style. 

The "template" look is intentionally dismantled here. We do not use soft shadows or rounded corners to comfort the user; instead, we use high-contrast typography and rigid, 0px-radius geometry to command authority. The system breaks traditional web flows through intentional asymmetry, massive type scales, and "data-signal" colors that highlight critical social impact and economic truths.

## 2. Colors: High-Voltage Editorial
The color palette serves two masters: the High-Contrast Black/White foundation provides professional gravity, while the Neon accents act as tactical "alerts" for key narratives.

### Functional Roles:
*   **Primary (#0001bb):** Used for "Deep State" immersion. It provides the authoritative anchor for the most serious narrative paths.
*   **Secondary (#506600) & Neon Green (#CCFF00):** These are your "Economic Growth" signals. Use them to highlight positive social impact or calls to action.
*   **Tertiary (#640064) & Hot Pink (#FF00FF):** Use these for "Disruption" narratives or radical viewpoints that challenge the status quo.
*   **High-Contrast Backgrounds:** `surface` (#f9f9f9) and `on-background` (#1b1b1b) create a razor-sharp editorial environment.

### The "No-Line" Rule for Layout
Prohibit the use of 1px solid borders for sectioning global layout blocks. Layout transitions must be defined by **Background Color Shifts**. For example, a `surface-container-low` section should sit directly against a `surface` hero area. This creates a "blocked out" look that feels like a modern broadsheet newspaper rather than a generic website.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical, stacked sheets. Use the `surface-container` tiers to create depth:
*   **Level 0:** `surface` (The base paper).
*   **Level 1:** `surface-container-low` (Secondary content blocks).
*   **Level 2:** `surface-container-highest` (Active interactive zones or high-priority data blocks).
Nesting a `surface-container-lowest` card inside a `surface-container-high` section provides a sophisticated, "stamped" aesthetic without relying on dated shadows.

### Glassmorphism & Tonal Soul
For floating navigation or mobile menus, use semi-transparent `surface` colors with a heavy `backdrop-blur` (20px+). This allows the high-contrast neon accents to bleed through the UI, softening the brutalism with a layer of premium "digital glass."

## 3. Typography: The Authoritative Voice
Our typography is designed to mimic the headlines of a prestige political journal.

*   **Display & Headlines (Inter):** These are your "shouting" fonts. Set them with tight letter-spacing (-2%) and heavy weights. The `display-lg` (3.5rem) should feel massive, breaking the grid to force the eye to the narrative.
*   **Body & Titles (Public Sans):** This is the workhorse of the system. It provides the "clarity" needed for complex economic data. 
*   **Hierarchy as Identity:** Use extreme scale differences. A `display-md` headline followed by a `body-sm` metadata label creates an "Editorial Shock" that feels intentional and high-end.

## 4. Elevation & Depth: Tonal Layering
We reject traditional "floating" elements. Depth is achieved through layering and subtle ambient signals.

*   **The Layering Principle:** Depth is structural. Use `surface-container-highest` to "lift" a component. The contrast between the neutral surface and a neon accent color creates more perceived depth than a shadow ever could.
*   **Ambient Shadows:** If a floating state is required (e.g., a modal), use an ultra-diffused shadow. 
    *   *Spec:* `0px 24px 48px rgba(0, 0, 0, 0.06)`. The shadow must be almost invisible, acting more as a "soft glow of darkness" rather than a hard drop shadow.
*   **The "Ghost Border" Fallback:** For accessibility in complex data tables, use the `outline-variant` token at 15% opacity. Never use 100% opaque borders for subtle separation; it clutters the Swiss-inspired grid.
*   **The Brutalist Stroke:** Unlike the Ghost Border, *functional* elements like buttons or cards can use a 2px-4px solid `on-surface` border to lean into the brutalist aesthetic. This is an "all or nothing" rule: either a thick, bold stroke or no stroke at all.

## 5. Components

### Buttons: The Geometric Trigger
*   **Primary:** Rectangular (0px radius), `primary` background, `on-primary` text. Heavy 2px `on-surface` border.
*   **Secondary:** `surface-container-lowest` background with a thick 2px black border.
*   **States:** On hover, shift the background color to the neon `secondary_fixed` (#c3f400) to create a high-energy feedback loop.

### Cards: The Data Vessel
*   **Rules:** Absolutely no divider lines within cards.
*   **Style:** Use vertical whitespace (32px+) to separate content. Use a `surface-container-high` background for the card body to make it "pop" from the `surface` background.

### Input Fields: Stark Clarity
*   **Style:** No rounded corners. 2px bottom-border only (`outline`). When focused, the border transitions to `primary` (#0001bb) and increases to 3px.
*   **Labels:** Always use `label-md` in all-caps for a bureaucratic, authoritative feel.

### The "Narrative Block" (System-Specific Component)
A custom layout component for pull-quotes or economic stats. Use a full-width background of `primary` with `display-sm` text in `on-primary`. This breaks the vertical rhythm of the page and forces a pause in the user's scroll—mimicking the editorial layout of a high-end magazine.

## 6. Do's and Don'ts

### Do:
*   **Embrace the Grid:** Use a strict 12-column grid but allow elements to span unusual column counts (e.g., a 7-column main image and 5-column text) to create tension.
*   **Use Massive Whitespace:** High-end design is defined by what you *don't* fill. Let the typography breathe.
*   **Contrast is King:** If something is important, make it Neon Green against a Deep Blue background.

### Don't:
*   **No Rounded Corners:** `0px` means `0px`. Any radius above this will break the brutalist integrity of the system.
*   **No Generic Icons:** Avoid thin, wispy icons. Use bold, thick-stroke icons (2pt stroke minimum) that match the weight of the typography.
*   **No Center-Alignment for Long Form:** Keep body text left-aligned to maintain the "Radical Record" grid discipline. Only center-align `display` type for hero moments.

---
**Director's Note:** This system is not meant to be "quiet." It is meant to be the most authoritative voice in the room. Use the neon colors as surgical strikes, and let the high-contrast black and white do the heavy lifting of the narrative.