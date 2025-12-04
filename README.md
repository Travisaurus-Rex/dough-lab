🍕 DoughLab 🍕

DoughLab is a pizza dough calculation tool designed for experimentation, precision, and learning. Choose your pizza **shape**, **style**, and **size**, and the app computes your dough formula in both **metric** and **imperial** units.

---

## Features

- Reactive ingredient calculations based on:
  - Shape (Circle, Square, Rectangle)
  - Size (Diameter or Dimensions depending on shape)
  - Style (NYC, Chicago, Detroit, Napoletana, Grandma, Sicilian, etc.)
- Ingredient breakdown displays in:
  - **Metric (grams)**
  - **Imperial (ounces)**
- Automatic hydration, salt, yeast, and oil ratios
- Custom reusable form components
- Global state management using **Zustand**
- Clean unstyled UI building blocks meant for extension

---

## Tech Stack

| Layer | Tool |
|-------|------|
| UI | React + TailwindCSS |
| State Mgmt | Zustand |
| Logic | TypeScript math + conversion utilities |
| Build System | Vite / React tooling |

---

## Installation

```sh
git clone <your-repo-url>
cd doughlab
npm install
npm run dev
