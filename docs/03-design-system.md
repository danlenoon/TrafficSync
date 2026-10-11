# Design system: TrafficSync

The rules and visual standards TrafficSync follows to maintain a polished, modern interface across all pages and components.

## Colour & Liquid Glass Aesthetics
TrafficSync implements the **iOS 27 Liquid Glass** design standard, utilizing frosted translucent glassmorphism (`backdrop-filter: blur`, specular borders, ambient shadows) that dynamically adapts based on the user's preference.
- **Glass Panel Background:** `--card-bg` / `--glass-bg` (translucent white/dark layers with dynamic opacity).
- **Glass Border:** `--glass-border` (subtle light-reflective border).
- **Text Primary:** `--text-main` (sharp, high-contrast dark text).
- **Text Muted:** `--text-muted` (subtle secondary text).

## Typography
- **Font Family:** `Arial, sans-serif` standardized globally.
- **Sizes:** 
  - Heading Large: `24px` / `text-2xl` bold.
  - Heading Medium: `18px` / `text-lg` bold.
  - Body Text: `14px` / `text-sm` medium.
  - Caption / Badges: `12px` / `text-xs`.

## Geometry & Spacing
- **Pill-Shaped Geometry:** All interactive controls — buttons, input fields, dropdown menus, checkboxes, and badge containers — feature fully rounded pill corners (`rounded-full`).
- **Spacing Scale:** Consistent Tailwind spacing scales (`p-4`, `p-6`, `space-y-4`, `gap-3`) ensuring rhythmic layout alignment.

## Components & Interactive States
- **Liquid Glass Navbar Slider:** An interactive slider ranging from 0% (ultra clear) to 100% (ultra tinted) with `○` and `✦` endpoints and a fatter rounded oval thumb.
- **Custom Dropdowns:** Styled via `-webkit-appearance: none; appearance: none;` with a vertically centered SVG down chevron indicator and embedded movement arrows (`↰`, `↱`, `↑`, `↩`).
- **Modals & Dialogs:** Frosted glass confirmation popups for deletion and unsaved changes navigation warnings.
