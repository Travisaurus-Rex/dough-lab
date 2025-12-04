import type { AreaInput } from "../models/AreaInput";
import type { DoughBreakdown } from "../models/DoughBreakdown";
import type { PizzaStyle, RealPizzaStyle } from "../models/PizzaStyle";

export function calculateArea(input: AreaInput): number {
  switch (input.shape) {
    case "CIRCLE": {
      const radius = input.diameter / 2;
      return Math.PI * radius * radius;
    }

    case "SQUARE":
      return input.side * input.side;

    case "RECTANGLE":
      return input.width * input.height;
  }
}

export const doughDensityMap: Record<RealPizzaStyle, number> = {
  NYC: 3.8,
  CHICAGO: 6.2,
  MARGHERITA: 3.2,
  NAPOLETANA: 3.1,
  DETROIT: 5.5,
  SICILIAN: 4.8,
  GRANDMA: 4.3,
};


export function doughDensity(style: PizzaStyle): number {
  if (style === 'NONE') return 0;
  return doughDensityMap[style];
}

export function calculateDoughIngredients(
  area: number,
  style: PizzaStyle,
  hydration = 0.65,
  salt = 0.03,
  yeast = 0.01,
  oil = 0.02
): DoughBreakdown {

  const density = doughDensity(style);

  if (!density || area === 0) {
    return {
      doughWeight: 0,
      flour: 0,
      water: 0,
      salt: 0,
      yeast: 0,
      oil: 0,
    };
  }

  const doughWeight = area * density;
  const factor = 1 + hydration + salt + yeast + oil;
  const flour = doughWeight / factor;

  return {
    doughWeight,
    flour,
    water: flour * hydration,
    salt: flour * salt,
    yeast: flour * yeast,
    oil: flour * oil,
  };
}

