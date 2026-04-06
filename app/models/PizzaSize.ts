export const CircleSizes = ['8"', '10"', '12"', '14"'] as const;
export type CircleSize = (typeof CircleSizes)[number];

export const RectangleSizes = ['6x9', '12x16', '13x18'] as const;
export type RectangleSize = (typeof RectangleSizes)[number];

export const SquareSizes = ['8x8', '9x9', '12x12', '16x16'] as const;
export type SquareSize = (typeof SquareSizes)[number];

export type PizzaSize =
  | CircleSize
  | RectangleSize
  | SquareSize;

export type PizzaSizePlaceholder =
  | 'NONE'
  | 'SELECT A PIZZA SHAPE';

export type PizzaSizeOption = PizzaSize | PizzaSizePlaceholder;

