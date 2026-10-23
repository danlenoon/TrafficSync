# UI Mockup & Wireframe Specifications (M6A2)

## 1. Overview & Design Principles
TrafficSync's user interface is purposefully designed for civil engineering students, urban traffic planners, and municipal analysts who demand high operational clarity, precision, and visual feedback. Built upon the M6A2 wireframe specifications, the application implements a fully responsive design system accommodating wide-screen desktop displays, laptop views, and stacked mobile layouts. 

The interface incorporates the **iOS 27 Liquid Glass design system**, featuring Liquid Glass translucent cards, concentric rounded-pill geometry (`rounded-full`), high-contrast Arial typography, and an interactive **Liquid Glass dynamic clarity slider** that adjusts transparency, backdrop blur, and border contrast in real-time.

---

## 2. Screen Wireframe Layouts (Desktop vs. Phone)

### Screen 1: Home / Dashboard (`/`)
* **Desktop Layout:** 
  * Sleek top navigation bar featuring the TrafficSync logo, interactive Liquid Glass slider, and a prominent primary action button: **"+ New Simulation"**.
  * Responsive 3-column / 4-column card grid showcasing saved intersection simulations. Each card displays the road name, formatted creation timestamp, active directional badges (`N`, `S`, `E`, `W`), and a hover-revealed delete icon button (`Trash2`).
  * Clicking any card loads the simulation snapshot seamlessly into the editor.
* **Phone Layout:**
  * Top navigation bar arranges controls vertically or in a compact header.
  * The multi-column grid smoothly stacks into a single-column vertical list with touch-friendly tap targets and permanent delete triggers.
* **Empty State:** A clean Liquid Glass prompt card guiding first-time users to create their inaugural intersection simulation.

---

### Screen 2: Simulation Editor (`/editor`)
* **Desktop Layout:**
  * Header contains a return link to the Dashboard and a primary **"Calculate Cycle"** call-to-action button, flanked by an inline **"Save"** action.
  * **Section 1: Intersection Setup:** 2-column card featuring the Road Name text input on the left and active Direction checkboxes (Northbound, Southbound, Eastbound, Westbound) equipped with directional indicator arrows on the right.
  * **Section 2: Lane Customization:** Directional sub-cards displaying lane counts, circular lane badges fitting 1 to 3 arrows in a single line, custom Norman Window turning dropdowns, and pedestrian crossing toggles.
  * **Section 3: Phase Timings Calculator:** High-density timing table featuring custom oval up/down pickers for Go ($\ge 1\text{s}$), Caution (Amber), and Red Clearance (RC) with fluid press-and-hold acceleration.
  * **Section 4: Interactive Phase Builder:** Visual 3-lens signal heads for vehicular lanes and pedestrian signals across sequential phases. New phases default to off (`CLICK TO SET`) to require intentional user selection.
* **Phone Layout:**
  * "Calculate Cycle" and "Save" actions dock cleanly beneath the screen header.
  * Setup, Lane, and Phase cards stack sequentially into a single column.
  * Tables and phase signal columns offer horizontal overscroll with unified transparent custom scrollbars.

---

### Screen 3: Cycle Results Summary (`/results`)
* **Desktop Layout:**
  * Navigation bar with centered **"Dashboard"** button on the primary Y-axis, an **"Edit Simulation"** action, and an inline **"Save"** trigger with a 2-second confirmation state.
  * 2-column analytical split: **Master Cycle Summary** occupying one-third (1/3) of the screen with big-stat circular badges, and the **Detailed Directional Breakdown** occupying two-thirds (2/3).
  * Interactive color-coded percentage breakdown bars (Green Go, Yellow Caution, Red Stop) with hover tooltips displaying exact seconds and percentages.
* **Phone Layout:**
  * Action buttons stack cleanly above the summary.
  * Master Cycle Summary docks at the top of the viewport, followed immediately by vertical lane timing cards and stacked percentage bars.

---

## 3. Atomic Design Component Hierarchy

To maintain clean code separation and reusability, components are organized according to strict Atomic Design principles:

* **Atoms (`src/components/atoms/`):**
  * `<Button />` — Primary, secondary, outline, and destructive button variants with concentric pill curves (`rounded-full`).
  * `<Input />` — Form text and numeric inputs with Liquid Glass backgrounds.
  * `<Checkbox />` — Directional selection checkboxes with blue active states.
  * `<Badge />` — Directional and turning arrow pills.
* **Molecules (`src/components/molecules/`):**
  * `<SimulationCard />` — Portfolio card with timestamps, badge arrays, load clicks, and stop-propagated delete actions.
  * `<LaneBadge />` — Enlarged circular badge (`w-11 h-11`) displaying 1 to 3 movement arrows in a single line.
  * `<TimingPicker />` — Custom oval press-and-hold up/down stepper with global window release listeners.
* **Organisms (`src/components/organisms/`):**
  * `<Navbar />` — Main header housing the logo, title, and interactive Liquid Glass slider.
  * `<SetupSection />` — Intersection name and directional approach selectors.
  * `<LanesSection />` — Lane customization engine with Norman Window floating dropdown popovers.
  * `<TimingsSection />` — Numerical timing controls for Go, Amber, and Red Clearance intervals.
  * `<PhaseBuilderSection />` — Visual traffic signal heads and sequential phase state matrix.
* **Pages (`src/pages/`):**
  * `<Dashboard />` — Portfolio view and new simulation initiator.
  * `<SimulationEditor />` — Central multi-stage configuration and calculation workspace.
  * `<Results />` — Detailed cycle output, phase proportions, and analysis summary.

---

## 4. Norman Window Popover Architecture

A major UX breakthrough in the mockup is the **Norman Window Structure Dropdown Menu**:
* Modeled after classical Norman architecture (semicircular arch atop a rectangular base).
* Utilizes **Fixed Viewport Spatial Positioning** via `getBoundingClientRect()` rather than relative absolute stacking.
* Dynamically calculates available screen height on the Y-axis:
  * When opening **downward**: Features an arched top and rounded pill base (`border-radius: 2.5rem 2.5rem 2rem 2rem`).
  * When opening **upward**: Inverts its geometry to feature an arched base and rounded pill top (`border-radius: 2rem 2rem 2.5rem 2.5rem`).
* Completely eliminates boundary clipping, z-index clashing, and parent overflow truncation across all devices.
