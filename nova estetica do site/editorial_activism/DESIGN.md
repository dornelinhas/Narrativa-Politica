---
name: Editorial Activism
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#615e58'
  on-secondary: '#ffffff'
  secondary-container: '#e7e2da'
  on-secondary-container: '#67645e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e7e2da'
  secondary-fixed-dim: '#cac6be'
  on-secondary-fixed: '#1d1c17'
  on-secondary-fixed-variant: '#494741'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  amarelo: '#FFDC00'
  vermelho: '#D22828'
  rosa: '#FF3C82'
  azul: '#3C64E6'
  verde: '#A0D246'
  lilas: '#9660E0'
typography:
  display-xl:
    fontFamily: Barlow Condensed
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 52px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 38px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: DM Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  section-padding: 80px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system blends the raw, high-energy aesthetic of editorial collage with a structured, professional digital framework. It is designed for an audience engaged in social impact and political transformation, demanding both urgency and credibility.

The visual style is **Modern Brutalism mixed with Editorial Collage**. It utilizes "paper-cut" textures, overlapping geometric elements, and high-contrast typography to create a sense of a living "social hub." Key brand attributes include:
- **Urgent & Authoritative:** Bold, condensed typography demands immediate attention.
- **Layered Complexity:** Overlapping elements and tactile textures suggest a multi-faceted narrative.
- **Categorical Clarity:** A strict color-coding system organizes complex information into digestible themes.
- **Human-Centric:** Use of halftone photography and "scanned" physical artifacts (like receipts or documents) anchors the digital experience in real-world impact.

## Colors

The palette is anchored by a high-contrast foundation of "Deep Ink" (#121212) and a textured "Creme" (#F5F0E8) background that simulates organic paper. 

Chromatically, the system employs a **Functional Multi-Color Palette**. Each hue is tied to a specific content pillar:
- **Amarelo:** High-energy calls to action and movement.
- **Vermelho:** Critical status, brand accents, and editorial core.
- **Rosa:** Gender, mentorship, and human-centric narratives.
- **Azul:** Leadership and structural radar.
- **Verde:** Data-driven analysis and economic indicators.
- **Lilas:** Educational trails and knowledge formation.

Use the creme background for most surfaces to maintain the "editorial" feel, switching to deep black for high-impact section breaks.

## Typography

The typographic hierarchy is built on a sharp contrast between **Barlow Condensed** (Display) and **DM Sans** (Utility).

**Barlow Condensed** must be used for all impactful headlines, typically in Bold or Black weights. It is frequently set in uppercase to reinforce an activist, "breaking news" tone. For digital interfaces, ensure vertical line heights are tight (1.0 - 1.1) to maintain the density of editorial headlines.

**DM Sans** handles all long-form reading and functional labels. It provides a clean, neutral counterpoint to the aggressive headlines. Use increased letter spacing for small captions to ensure legibility against textured backgrounds.

## Layout & Spacing

The system follows a **12-column grid** for structural reliability but encourages "breakouts" to simulate the collage aesthetic. 

- **The Grid:** While elements align to a standard column structure, decorative shapes, images, and secondary text blocks should frequently overlap grid lines or "bleed" off the edges of containers.
- **Responsive Behavior:** 
  - **Desktop:** Large margins (60px+) and wide gutters (24px) allow for "white space" that isn't white, but rather textured creme surface.
  - **Mobile:** Transition to a single-column layout with 20px side margins. Headlines scale significantly to maintain their "Display" impact (using the `headline-lg-mobile` token).
- **Collage Overlap:** Allow for a -24px to -48px negative margin on decorative icons or paper-cut elements to create depth.

## Elevation & Depth

Depth in this system is created through **physical layering** rather than Gaussian blurs.

- **Paper Stacking:** Use subtle, sharp "drop shadows" (low blur, 2-4px offset) to make elements look like they were pasted onto the page.
- **Tonal Layers:** High-contrast color blocks (e.g., a Black card on a Creme background) create immediate hierarchy.
- **Texture Overlays:** Apply a global "grain" or "noise" filter (approx 3-5% opacity) over the entire UI to kill the "digital flatness."
- **Halftone Effects:** Photographic assets should utilize halftone dot patterns or high-contrast black-and-white treatments to feel like newspaper clippings.
- **Hard Borders:** Use 1px or 2px solid strokes in #121212 for cards to define boundaries clearly without relying on soft shadows.

## Shapes

The shape language is primarily **Geometric and Brutalist**, accented by "organic" paper edges.

- **Standard Elements:** Use a "Soft" (0.25rem) radius for most UI components (buttons, input fields) to keep them professional.
- **The "Paper Cut":** Large cards or featured sections should utilize an SVG mask that creates a "torn paper" edge on at least one side (usually the bottom or top).
- **Geometric Primitives:** Circles and squares derived from the logo are used as massive, low-opacity (8-12%) background watermarks to fill space and guide the eye.
- **Accent Bars:** Use 6px vertical bars on the left side of cards, color-coded to the content category.

## Components

### Buttons
Primary buttons are solid #121212 with white text, using the `label-bold` typography. They feature a sharp 1px border. On hover, they shift to the category-specific color (e.g., Green for data). Secondary buttons use a "Ghost" style with a 2px solid border.

### Cards
Cards are the heart of the collage. They must feature:
- A textured background (creme or white).
- A category color accent (vertical bar or top stroke).
- "Scanned" imagery or halftone photos.
- 1px solid borders with 0.25rem corner radius.

### Chips & Tags
Use pill-shaped backgrounds (`rounded-full`) for format tags (e.g., "E-BOOK", "VIDEO"). These should use high-contrast color pairings, such as Black background with Yellow text.

### Input Fields
Strict and utilitarian. White background, 1px black border, and DM Sans typography. Focus states should use a thick 3px bottom border in the brand's Vermelho (#D22828).

### Quotes
Large, stylized Barlow Condensed quote marks (80px+) set at 20% opacity behind DM Sans italic body text. This reinforces the editorial "magazine" feel.