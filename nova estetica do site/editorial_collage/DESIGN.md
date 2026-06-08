---
name: Editorial Collage
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
  amarelo-movimento: '#FFDC00'
  vermelho-editorial: '#D22828'
  rosa-mentoria: '#FF3C82'
  azul-lideranca: '#3C64E6'
  verde-analise: '#A0D246'
  lilas-formacao: '#9660E0'
typography:
  headline-xl:
    fontFamily: Barlow Condensed
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -3px
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 52px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -2px
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -1px
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -1px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: DM Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 4px
  caption:
    fontFamily: DM Sans
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 2px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1200px
  gutter: 32px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

This design system is built on a **Brutalist-Light** aesthetic that merges the raw, urgent energy of political activism with the structured reliability of a professional education hub. The personality is direct, bold, and authoritative, yet accessible through tactile metaphors.

The visual language is anchored in a **collage aesthetic**, utilizing torn paper textures, halftone patterns, and vibrant color blocking. It balances high-impact social media visuals with a clean, functional editorial structure. Geometric elements from the logo—circles, rectangles, and bars—are used as dynamic graphic accents to guide the eye and categorize content.

## Colors

The palette is vibrant and highly semantic. While **Preto (#121212)** and **Creme (#F5F0E8)** provide the structural foundation and editorial "paper" feel, the chromatic colors serve as navigational anchors:

- **Amarelo**: High-impact CTAs and "Movement" themes.
- **Vermelho**: Critical highlights and "Editorial" labels.
- **Rosa**: "Mentorship & Gender" focused content.
- **Azul**: Professional authority and "Leadership" tracks.
- **Verde**: Data-driven "Analysis" and statistics.
- **Lilas**: "Educational Paths" and training modules.

Use Creme as the primary surface color to reduce eye strain compared to pure white, maintaining the tactile paper narrative.

## Typography

The system employs a "High-Impact Display vs. Clean Functional" pairing. 

**Barlow Condensed** is reserved for headlines and impactful statements, used primarily in uppercase with tight tracking to evoke a sense of urgency and newspaper headlines. 

**DM Sans** handles all functional and long-form reading, providing a neutral, modern counterpoint that ensures the platform remains professional and legible as an educational resource. Use the **label-bold** style for section headers and meta-tags to maintain a structured information hierarchy.

## Layout & Spacing

The layout follows a structured **12-column fixed grid** for desktop, ensuring an organized portal feel, while components within that grid often use "broken" or overlapping collage techniques.

- **Desktop**: 1200px max-width with 32px gutters.
- **Mobile**: Single column with 20px side margins.
- **Rhythm**: Use 8px increments for standard spacing, but allow for 4px increments in tight UI components (like chips or labels).
- **White Space**: Maintain generous vertical gaps (80px) between major sections to allow the bold typography and collage elements room to breathe.

## Elevation & Depth

This design system rejects traditional soft shadows in favor of **Graphic Layering**:

- **Z-Axis Hierarchy**: Depth is communicated through the stacking of "torn paper" layers and solid-colored geometric shapes.
- **Tonal Layering**: Use translucent black or white overlays (`rgba(0,0,0,0.05)`) to create subtle container definitions on neutral backgrounds.
- **Tactile Accents**: Implement paper grain textures and halftone patterns as background fills to give digital surfaces a physical, "printed" quality.
- **Flat Depth**: High-contrast borders (1px to 3px) replace shadows for card and button definition.

## Shapes

The shape language is a mix of geometric precision and organic "torn" edges:

- **Containers**: Cards and primary buttons use **Rounded (0.5rem)** corners to soften the brutalist impact and make the platform feel modern.
- **Functional Elements**: Smaller tags and badges use **Soft (0.25rem)** corners.
- **Visual Graphics**: Decorative elements (circles and rectangles) should remain perfectly geometric to contrast against the "torn paper" imagery used in hero sections.
- **Pills**: Navigation chips and specific CTAs use a full pill-shape (round-xl) for maximum clickability and distinction.

## Components

### Buttons
- **Primary**: Solid background (Amarelo or Vermelho), black text, 0.5rem radius.
- **Secondary**: Outlined (1.5px solid Preto) with a paper-texture hover effect.
- **Action Pills**: Full pill-shaped tags for category filtering.

### Cards
- **Editorial Cards**: Creme background, 1px subtle border, 1rem corner radius. Use a 6px vertical "accent bar" on the left side to denote the content category (e.g., Green for Data).
- **Collage Cards**: Feature torn paper edges on one or two sides, often with an overlapping geometric shape in the corner.

### Inputs & Form Fields
- Minimalist design with a 1px bottom border only, or a fully enclosed box with a subtle paper texture background. Labels should use the **label-bold** typography style.

### Lists & Navigation
- **Navigation**: Clean, uppercase DM Sans with high letter spacing. Active states should be highlighted with a "hand-drawn" style underline in a brand color.
- **Lists**: Bullet points replaced by small geometric shapes (red circles or blue squares).

### Progress & Status
- **Education Traces**: Use thick, solid progress bars (6px - 10px height) in themed colors (Lilas for training) against a low-opacity version of the same hue.