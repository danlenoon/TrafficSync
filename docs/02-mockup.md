# UI Mockup & Wireframe Specifications (M6A2)

---

## 1. Overview & Design Principles
TrafficSync's user interface is designed around clarity, speed, and precision for civil engineering students and urban traffic planners. Inspired by the M6A2 low-fidelity wireframe specifications, the application employs a responsive layout supporting both desktop grids and stacked mobile phone views. The interface incorporates the iOS 27 Liquid Glass design system, featuring frosted translucent cards, fully rounded pill geometry (`rounded-full`), clean Arial typography, and a dynamic Liquid Glass clarity control slider.

---

## 2. Screen Wireframe Layouts (Desktop vs. Phone)

### Screen 1: Home / Dashboard
- **Desktop Layout:** 
  - Header with application logo on the left, profile icon on the right, and a primary **"+ New Simulation"** button.
  - Main content displaying a responsive 3-column grid of saved intersection simulation cards (showing intersection title, lane counts, and cycle lengths with a "View" action).
- **Phone Layout:**
  - Header buttons stack vertically under the title.
  - The 3-column grid collapses into a single 1-column vertical card stack.
- **Empty State:** Clean banner prompting the user to create their first simulation when no saved records exist.

### Screen 2: Simulation Editor
- **Desktop Layout:**
  - Header featuring a "Back" link and a primary **"Calculate Cycle"** action button.
  - **Section 1 (Setup):** 2-column layout with Road Name input on the left and active Direction checkboxes (East, North, South, West) on the right.
  - **Section 2 (Lanes):** 2-column configuration cards for assigning lane movement types (Left, Right, U-Turn, Straight).
  - **Section 3 (Timings):** Comprehensive table for entering Go (Green), Caution (Amber), and Stop (Red clearance) timing seconds per lane.
- **Phone Layout:**
  - "Calculate Cycle" button drops below the header title.
  - Setup and Lane sections stack vertically into single columns.
  - Timing tables adapt with horizontal scaling containers.

### Screen 3: Results & Report
- **Desktop Layout:**
  - Header with title, Edit, Done, and Save action buttons on the right.
  - Main content structured in a 2-column split: **Master Cycle Summary** occupying one-third (1/3) on the left, and **Lane Breakdown List** occupying two-thirds (2/3) on the right.
- **Phone Layout:**
  - Action buttons stack neatly beneath the header title.
  - Content stacks vertically with Master Cycle Summary on top and the Lane Breakdown List below.

---

## 3. Atomic Design Component Hierarchy

- **Atoms (`src/components/atoms/`):**
  - `<Button />`, `<Input />`, `<Checkbox />`, `<Select />`, `<Icon />` (fully pill-rounded `rounded-full` geometry).
- **Molecules (`src/components/molecules/`):**
  - `<FormField />`, `<SimulationCard />`, `<LaneConfigRow />`, `<TimingInputRow />`, `<PhaseBar />`.
- **Organisms (`src/components/organisms/`):**
  - `<Navbar />`, `<SimulationGrid />`, `<SetupSection />`, `<TimingsTable />`, `<ResultsSummary />`, `<LaneBreakdown />`.
- **Pages (`src/pages/`):**
  - `<Dashboard />`, `<SimulationEditor />`, `<Results />`.

---

## 4. User Task Walkthrough (Sanity Check)

1. **Start:** User lands on the Dashboard view (`/`).
2. **Action:** Clicks the `+ New Simulation` button.
3. **Navigation:** Routed to the Simulation Editor (`/editor`).
4. **Action:** Fills out `<SetupSection>` (types intersection name, checks directions).
5. **Action:** Configures lane movements in `<LanesSection>`.
6. **Action:** Inputs Go, Amber, and Red clearance timing seconds into `<TimingsTable>`.
7. **Action:** Clicks **"Calculate Cycle"**.
8. **Navigation:** Routed to the Results view (`/results`).
9. **Outcome:** Views calculated Total Cycle Length in the Master Summary and per-lane Red Stop times in the breakdown list.
10. **Finish:** Clicks **"Done"** to return to the Dashboard.
