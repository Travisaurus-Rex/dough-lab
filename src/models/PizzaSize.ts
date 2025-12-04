export const CircleSizes = ['10"', '12"', '14"'] as const;
export type CircleSize = (typeof CircleSizes)[number];

export const RectangleSizes = ['6x6', '9x9', '12x12'] as const;
export type RectangleSize = (typeof RectangleSizes)[number];

export const SquareSizes = ['8x8', '10x10'] as const;
export type SquareSize = (typeof SquareSizes)[number];

export type PizzaSize =
  | CircleSize
  | RectangleSize
  | SquareSize;
  
export type PizzaSizePlaceholder =
  | 'NONE'
  | 'SELECT A PIZZA SHAPE';

export type PizzaSizeOption = PizzaSize | PizzaSizePlaceholder;

