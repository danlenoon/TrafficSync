# Design System & Component Tokens: TrafficSync

## 1. Color Tokens & Visual Design Palette
TrafficSync utilizes a purposeful, high-contrast engineering color palette paired with the Liquid Glass system:

| Token Name | Hex Code | Tailwind Equivalent | Purpose & Context |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `#2563EB` | `bg-blue-600` | Primary call-to-action buttons, active navigation states, lane badges, and focus rings. |
| **Primary Hover** | `#1D4ED8` | `hover:bg-blue-700` | Elevated hover state for interactive controls and primary buttons. |
| **Accent / Success** | `#16A34A` | `text-emerald-600` | Active signal Go states (Go 🟢), saved confirmation alerts, and success badges. |
| **Warning / Caution** | `#F59E0B` | `text-amber-500` | Active signal Caution 🟡 intervals and intermediate clearance badges. |
| **Destructive / Stop** | `#DC2626` | `text-red-600` | Active signal Stop / Red Clearance 🔴 states, delete action buttons, and confirmation warning modals. |
| **Surface (Card)** | Dynamic CSS | `var(--card-bg)` | Translucent card backing scaling dynamically from $8\%$ to $88\%$ opacity based on slider. |
| **Surface (Input)** | Dynamic CSS | `var(--input-bg)` | Translucent form inputs and button backing scaling with clarity. |
| **Text (Main)** | `#111827` / `#F8FAFC` | `var(--text-main)` | High-contrast dark charcoal (light mode) or crisp off-white (dark mode). |
| **Text (Muted)** | `#4B5563` / `#94A3B8` | `var(--text-muted)` | Descriptive helper text, section subheaders, and secondary metadata. |

---

## 2. Typography Scale Overview (Exact Pixel Specifications)

Standardized globally to `Arial, sans-serif` for clean readability, technical precision, and uniform cross-browser rendering:

* **Page & Main Headers (`H1`):** `28px` to `32px` (`font-black`, leading `1.2`, tracking `tight`).
* **Section Headers (`H2`):** `20px` to `24px` (`font-extrabold`, leading `1.3`).
* **Card Titles & Subsection Headers (`H3`):** `16px` to `18px` (`font-bold`).
* **Body Text (`P`, Labels):** `14px` to `16px` (`font-medium` or `font-semibold`, leading `1.5`).
* **Microcopy & Metadata:** `11px` to `12px` (`font-extrabold`, uppercase tracking `wider` or `widest`).
* **Code & Numerical Telemetry:** `13px` to `14px` (`font-mono` or `font-black` for cycle totals).

---

## 3. Spacing, Radius, & Concentric Geometry (8px Base Unit)

* **Base Grid Unit:** `8px`.
* **Tight Spacing:** `8px` (`p-2`, `gap-2`) — used between badge icons, button label gaps, and close-coupled controls.
* **Compact Spacing:** `16px` (`p-4`, `gap-4`) — used inside card padding, lane rows, and timing picker clusters.
* **Standard Section Spacing:** `24px` to `32px` (`p-6` to `p-8`, `gap-6` to `gap-8`) — outer margins and card division boundaries.
* **Concentric Pill Geometry (`rounded-full`):**
  * All interactive elements—including primary buttons, text inputs, checkboxes, lane badges, and up/down picker steppers—utilize full pill rounding (`rounded-full`).
  * Outer card wrappers use `rounded-3xl` (`24px` radius) or `rounded-2xl` (`16px` radius) to create smooth, concentric visual margins with interior pill controls.

---

## 4. Custom App-Consistent Scrollbars

All scrollable containers inside the application—including dense timing matrices, phase builder lane columns, and unified custom scrollbars defined in `client/src/index.css`:

```css
/* App-consistent transparent track and translucent blue pill thumb */
.custom-dropdown-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(37, 99, 235, 0.45) transparent;
}
.custom-dropdown-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-dropdown-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 9999px;
  margin: 6px 0;
}
.custom-dropdown-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(37, 99, 235, 0.45);
  border-radius: 9999px;
}
.custom-dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(37, 99, 235, 0.75);
}
```

---

## 5. The Liquid Glass Dynamic Clarity Engine

TrafficSync features a real-time visual customization engine that calculates root CSS custom properties dynamically based on the navbar slider ($0.0 \le \text{clarity} \le 1.0$):

$$\text{Alpha} = 0.10 + (\text{clarity} \times 0.85)$$
$$\text{Blur} = (\text{clarity} \times 24)\text{ px}$$
$$\text{Border Alpha} = 0.15 + (\text{clarity} \times 0.65)$$
$$\text{Card Alpha} = 0.08 + (\text{clarity} \times 0.80)$$
$$\text{Shadow Alpha} = 0.12 + (\text{clarity} \times 0.18)$$

This mathematical scaling guarantees that whether the user desires **ultra-clear crystal glass** (allowing vibrant underlying gradients to shine through) or a **rich, high-contrast Liquid Glass slate**, all typography, borders, and controls remain 100% readable and WCAG accessible.
