![Alt text](https://images.pexels.com/photos/33593008/pexels-photo-33593008.jpeg)

# 🍕 DoughLab 🍕

DoughLab is a small React + TypeScript playground for calculating pizza dough formulas based on **pan shape**, **pan size**, and **pizza style**. It focuses more on **logic and architecture** than on visual polish, and uses a typed, reusable form system plus global state with Zustand.

---

## What It Does

- Lets you select:
  - **Shape**: `NONE`, `CIRCLE`, `RECTANGLE`, `SQUARE`
  - **Style**: `NONE`, `NYC`, `CHICAGO`, `MARGHERITA`, `NAPOLETANA`, `DETROIT`, `SICILIAN`, `GRANDMA`
  - **Size**: depends on shape (e.g. `10"` / `12"` for circles, `6x6` / `9x9` for rectangles, etc.)
- Computes:
  - Pan **area** based on shape + size
  - Total **dough weight** from style-specific dough density
  - **Flour / water / salt / yeast / oil** using baker’s percentages
- Displays results as:
  - **Two side‑by‑side cards**: one **Metric (g)**, one **Imperial (oz)**
  - Left‑aligned labels, right‑aligned values in both columns

---

## How the Dough Calculations Work

The calculation pipeline is intentionally simple and explicit.

### 1. Area Calculation

The function:

```ts
calculateArea(input)
```

takes a discriminated union based on shape (roughly):

- `CIRCLE` → `{ shape: "CIRCLE"; diameter: number }`
- `SQUARE` → `{ shape: "SQUARE"; side: number }`
- `RECTANGLE` → `{ shape: "RECTANGLE"; width: number; height: number }`

Formulas used:

- **Circle**:  
  `area = π × (diameter / 2)²`
- **Square**:  
  `area = side × side`
- **Rectangle**:  
  `area = width × height`

This keeps the logic explicit and makes it impossible (at the type level) to “forget” a dimension for a shape.

### 2. Dough Density by Style

Each pizza style has an associated **dough density** (grams of dough per square unit of pan area). Conceptually:

```ts
const doughDensityMap = {
  NYC:       3.8,
  CHICAGO:   6.2,
  MARGHERITA: 3.2,
  NAPOLETANA: 3.1,
  DETROIT:   5.5,
  SICILIAN:  4.8,
  GRANDMA:   4.3,
  // NONE -> treated as 0 (no valid style selected)
};
```

The function:

```ts
doughDensity(style)
```

returns the numeric density for a given style. If the style is `NONE`, the density is treated as `0` so calculations produce a “no result” state.

### 3. Total Dough Weight

Once you have area **A** and density **D**, you get a target total dough weight:

```ts
doughWeight = area * density;
```

This is the base for all ingredient calculations.

### 4. Ingredient Breakdown (Baker’s Percentages)

The function:

```ts
calculateDoughIngredients(area, style, hydration, salt, yeast, oil)
```

does the following:

- Get `density = doughDensity(style)`
- Compute `doughWeight = area * density`
- Use baker’s percentages:

  - `hydration` → default `0.65` (65% water)
  - `salt` → default `0.03` (3% salt)
  - `yeast` → default `0.01` (1% yeast)
  - `oil` → default `0.02` (2% oil)

- Total percentage factor:

  ```ts
  factor = 1 + hydration + salt + yeast + oil;
  ```

- Base flour weight:

  ```ts
  flour = doughWeight / factor;
  ```

- Other ingredients:

  ```ts
  water = flour * hydration;
  salt  = flour * saltPct;
  yeast = flour * yeastPct;
  oil   = flour * oilPct;
  ```

The function returns a structured object with:

```ts
{
  doughWeight,
  flour,
  water,
  salt,
  yeast,
  oil
}
```

App‑level code then converts those into:

- **Metric** values in grams (with `toFixed(1)`)
- **Imperial** values in ounces (`g / 28.3495`, `toFixed(2)`)

These are rendered into two side‑by‑side “Result” cards.

---

## State & Architecture

### Global State with Zustand

Instead of lifting React state up through multiple components, DoughLab uses a small Zustand store:

```ts
interface PizzaState {
  shape: PizzaShape;
  style: PizzaStyle;
  size: PizzaSizeOption;

  setShape: (shape: PizzaShape) => void;
  setStyle: (style: PizzaStyle) => void;
  setSize: (size: PizzaSizeOption) => void;
}
```

Key points:

- `shape`, `style`, and `size` are all stored centrally.
- Selecting a **shape** can reset the **size** when needed (e.g. when shape changes, previous size may no longer be valid).
- Components like `ShapeSelector`, `StyleSelector`, and `SizeSelector` subscribe only to the slice of state they care about.

This keeps the app simple while still showing a realistic global state pattern.

---

## Custom Generic `<FormSelect />` Component

Instead of using native `<select>` elements everywhere, the app uses a custom **generic** select component that is reused for shape, style, and size.

### Type-Safe Options with Literal Arrays

Each model uses the pattern:

```ts
export const PizzaShape = ['NONE', 'CIRCLE', 'RECTANGLE', 'SQUARE'] as const;
export type PizzaShape = (typeof PizzaShape)[number];
```

Same idea for `PizzaStyle` and the size options.

This lets the select component stay strongly typed without hard‑coding specific enums.

### Generic Props

The form select is defined roughly as:

```ts
interface FormSelectProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}
```

And implemented as a custom dropdown using:

- `useState` → open/close state
- `useRef` / `useEffect` → close on outside click
- A mapped list of options with click handlers

Because it’s generic (`<T extends string>`), it can be reused for **any** of:

- `PizzaShape`
- `PizzaStyle`
- `PizzaSizeOption`

Usage example:

```tsx
<FormSelect
  label="Pizza Shape"
  options={PizzaShape}
  value={shape}
  onChange={setShape}
/>
```

This shows how to build a lightweight, type‑safe, reusable select component without dragging in a full UI framework.

---

## Layout & Results

The main layout is:

- A form grid for the three selectors
- A conditional render for the results:
  - If `shape`, `style`, and `size` are all valid → show results
  - Otherwise → show an instructional message

The result display is extracted into its own `Results` component, which:

- Accepts the raw calculation result object as props
- Builds a `rows` array with `{ label, metric, imperial }`
- Renders two **cards**:
  - Left card labeled “Metric”
  - Right card labeled “Imperial”
- Uses `flex` with `justify-between` on each row for left‑aligned labels and right‑aligned values in both cards.

---

## Project Structure (Approximate)

```txt
src/
 ├─ components/
 │   ├─ FormSelect/
 │   │   └─ FormSelect.tsx
 │   ├─ ShapeSelector/
 │   ├─ SizeSelector/
 │   ├─ StyleSelector/
 │   └─ Results/
 ├─ models/
 │   ├─ PizzaShape.ts
 │   ├─ PizzaStyle.ts
 │   └─ PizzaSize.ts
 ├─ stores/
 │   └─ pizzaStore.ts
 ├─ utils/
 │   ├─ doughCalculator.ts
 │   └─ resolveAreaInput.ts
 └─ App.tsx
```

The exact structure may differ slightly, but this is the conceptual layout.

---

## 🛠 Getting Started

```sh
git clone <your-repo-url>
cd doughlab
npm install
npm run dev
```

Open:

```txt
http://localhost:5173/
```

Then:

1. Pick a **shape**
2. Pick a **size** (valid options depend on shape)
3. Pick a **style**
4. Read the **dough formula** in both metric and imperial.

---

## Possible Future Improvements

- Custom hydration, salt, yeast, and oil sliders
- Support for multiple pizzas / batch calculations
- Saving named presets (e.g., “Friday Night Detroit”)
- Export to text / clipboard / PDF
- Proper responsive design and theming
- Inline graph showing dough weight vs. pan size

---

## License

MIT — do whatever, improve it, break it, fork it.
