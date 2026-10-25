# Mockup

## 1. Overview & Design Principles
TrafficSync's user interface is purposefully designed for civil engineering students, urban traffic planners, and municipal analysts who demand high operational clarity, precision, and visual feedback. The application implements a fully responsive design system accommodating wide-screen desktop displays, laptop views, and stacked mobile layouts. 

The interface incorporates the **Liquid Glass design system**, featuring translucent cards, concentric rounded-pill geometry (`rounded-full`), high-contrast Arial typography, and an interactive **Liquid Glass dynamic clarity slider** that adjusts transparency, backdrop blur, and border contrast in real-time.

---

## 2. Screen Wireframe Layouts (Desktop vs. Phone)

### Screen 1: Home / Dashboard (`/`)
* **Desktop Layout:** 
  * Sleek top navigation bar featuring the TrafficSync logo, interactive Liquid Glass slider, and a prominent primary action button: **"+ New Simulation"**.
  * Responsive triple-column / quad-column card grid showcasing saved intersection simulations in an expanded `max-w-7xl` container. Each card displays the road name, formatted creation timestamp, configured lane count, active directional badges (`N`, `S`, `E`, `W`), and a hover-revealed delete icon button (`Trash2`).
  * Clicking any card loads the simulation snapshot seamlessly into the editor.
* **Phone Layout:**
  * Top navigation bar arranges the logo and Liquid Glass slider centrally in a vertically stacked layout.
  * The multi-column grid smoothly stacks into a single-column vertical list with centered action buttons (`w-full max-w-xs mx-auto`), touch-friendly card spacing, and prominent delete triggers.
* **Empty State:** A clean Liquid Glass prompt card welcoming first-time users to create their inaugural intersection simulation with centered call-to-action buttons.

---

### Screen 2: Simulation Editor (`/editor`)
* **Desktop Layout:**
  * Header contains a return link to the Dashboard positioned inside the main card, accompanied by right-aligned subtitle guidance.
  * **Section 1: Intersection Setup:** Dual-column card featuring the Road Name text input on the left (with autofill protection) and active Direction checkboxes (Northbound, Southbound, Eastbound, Westbound) equipped with directional indicator arrows on the right.
  * **Section 2: Lane Customization:** Directional sub-cards displaying lane counts, circular lane badges fitting 1 to 3 arrows in a single line, centered `+ Add Lane` buttons below configured lanes, and pedestrian crossing toggles.
  * **Section 3: Phase Timings Calculator:** High-density timing table featuring custom oval up/down pickers for Go ($\ge 1\text{s}$), Caution (Amber), and Red Clearance (RC) with fluid press-and-hold acceleration, continuous typing support, and synchronized hover effects.
  * **Section 4: Interactive Phase Builder:** Visual triple-lens signal heads for vehicular lanes and dual-bulb pedestrian signals across sequential phases. New phases default to unconfigured (`CLICK TO SET`) to require intentional user selection.
  * **Action Footer:** "Save" and "Calculate Cycle" buttons are cleanly docked below the Phase Timings Calculator inside the card boundaries without horizontal right-side overflow.
* **Phone Layout:**
  * "Calculate Cycle" and "Save" actions dock cleanly beneath the Phase Timings Calculator.
  * Setup, Lane, and Phase cards stack sequentially into a single column.
  * `+ Add Lane` and `+ Add Phase` buttons feature wider mobile widths (`w-full xs:w-auto max-w-xs`) for effortless thumb tapping.
  * Tables and phase signal columns offer horizontal overscroll with unified transparent custom scrollbars.

---

### Screen 3: Cycle Results Summary (`/results`)
* **Desktop Layout:**
  * Navigation bar with centered **"Dashboard"** button on the primary Y-axis, an **"Edit Simulation"** action, and an inline **"Save"** trigger with a 2-second confirmation state.
  * Dual-column analytical split: **Master Cycle Summary** occupying one-third (1/3) of the screen with big-stat circular badges, and the **Detailed Directional Breakdown** occupying two-thirds (2/3).
  * Interactive color-coded percentage breakdown bars (Green Go, Yellow Caution, Red Stop) with hover tooltips displaying exact seconds and percentages.
* **Phone Layout:**
  * Action buttons stack cleanly above the summary.
  * Master Cycle Summary docks at the top of the viewport, followed immediately by vertical lane timing cards and stacked percentage bars.

---

## 3. Atomic Design Component Hierarchy

To maintain clean code separation and reusability, components are organized according to strict Atomic Design principles:

* **Atoms (`src/components/atoms/`):**
  * `<Button />` — Primary, secondary, outline, and destructive button variants with concentric pill curves (`rounded-full`).
  * `<Input />` — Form text and numeric inputs with Liquid Glass backgrounds and autofill suppressors.
  * `<Checkbox />` — Directional selection checkboxes with blue active states.
  * `<Badge />` — Directional and turning arrow pills.
* **Molecules (`src/components/molecules/`):**
  * `<SimulationCard />` — Portfolio card with timestamps, badge arrays, load clicks, and stop-propagated delete actions.
  * `<LaneBadge />` — Circular badge displaying 1 to 3 movement arrows in a single line.
  * `<TimingPicker />` — Custom oval press-and-hold up/down stepper with continuous typing and global window release listeners.
* **Organisms (`src/components/organisms/`):**
  * `<Navbar />` — Main header housing the logo, title, and interactive Liquid Glass slider.
  * `<SetupSection />` — Intersection name and directional approach selectors with mobile autofill suppression.
  * `<LanesSection />` — Lane count customizers with centered add-lane controls.
  * `<TimingsSection />` — Numerical timing controls for Go, Caution, and Red Clearance intervals.
  * `<PhaseBuilderSection />` — Visual traffic signal heads, 3-column pedestrian signal housing, and sequential phase state matrix.
* **Pages (`src/pages/`):**
  * `<Dashboard />` — Portfolio view and new simulation initiator with wider card grids.
  * `<SimulationEditor />` — Central multi-stage configuration and calculation workspace.
  * `<Results />` — Detailed cycle output, phase proportions, and analysis summary.
