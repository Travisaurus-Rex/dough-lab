import type { PizzaShape } from "../models/PizzaShape";
import { CircleSizes, RectangleSizes, SquareSizes, type PizzaSizeOption } from "../models/PizzaSize";


export function sizeOptionsForShape(shape: PizzaShape): PizzaSizeOption[] {
  switch (shape) {
    case 'CIRCLE':
      return ['NONE', ...CircleSizes];
    case 'RECTANGLE':
      return ['NONE', ...RectangleSizes];
    case 'SQUARE':
      return ['NONE', ...SquareSizes];
    default:
      // No shape chosen yet
      return ['SELECT A PIZZA SHAPE'];
  }
}
