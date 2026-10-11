# Design System & Component Tokens: TrafficSync

**Presented by:** Danielle Laurence B. Lenon (CS-401, 2203 - 6APSI)  
**Framework:** Tailwind CSS & Component Tokens

---

## 1. Color Tokens: Our Visual Design Palette
TrafficSync utilizes a purposeful, high-contrast color palette paired with iOS 27 Liquid Glass frosted glassmorphism:
- **Primary (`#2563EB` / Blue 600):** Used for primary links, action buttons, active states, and navigational focus indicators.
- **Accent (`#16A34A` / Green 600):** Used for call-to-action highlights, success states, active phase indicators, and confirmation badges.
- **Background (`#F9FAFB`) & Surface (`#FFFFFF`):** Clean page background and elevated card surfaces.
- **Text (`#1F2937`):** High-contrast dark charcoal for primary typography.

---

## 2. Typography Scale Overview (Exact Pixel Sizes)
- **Heading Size:** `24px` bold (used for page titles and major section headers).
- **Body Text:** `16px` regular (used for description text, form labels, and table content).
- **Small Text:** `14px` regular (used for captions, secondary metadata, and helper text).
- **Font Family:** Standardized globally to `Arial, sans-serif` for clean readability and consistent cross-platform rendering.

---

## 3. Spacing & Geometry (8px Base Unit)
- **Base Unit:** `8px`.
- **Tight Spacing:** `8px` (`p-2`, `gap-2`) — used between closely related items and inline badges.
- **Standard Spacing:** `24px` (`p-6`, `gap-6`) — used between major UI sections and grid containers.
- **Edge Padding:** `32px` (`md:p-8`) — used for outer screen margins and viewport borders.
- **Pill-Shaped Geometry (`rounded-full`):** All interactive controls, buttons, input fields, dropdown menus, checkboxes, and badge containers feature fully rounded pill geometry.

---

## 4. Reusable Components (Atomic Design)
- **Atoms (`src/components/atoms/`):** `<Button />` (supporting variants, `onClick`, icons, and children), `<Input />`, `<Checkbox />`, `<Select />`, `<Icon />`.
- **Molecules (`src/components/molecules/`):** `<FormField />`, `<SimulationCard />`, `<LaneConfigRow />`, `<TimingInputRow />`, `<PhaseBar />`.
- **Organisms (`src/components/organisms/`):** `<Navbar />` (featuring the interactive Liquid Glass clarity slider), `<SimulationGrid />`, `<SetupSection />`, `<TimingsTable />`, `<ResultsSummary />`, `<LaneBreakdown />`.

---

## 5. Responsive Behavior
- **Mobile (< 768px):** Single-column vertical stacks, collapsible action buttons, and horizontal scroll wrappers for dense timing tables.
- **Desktop (> 768px):** Multi-column CSS grids (2 to 3 columns) and split-pane reporting dashboards.
