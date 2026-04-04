export type AreaInput =
  | { shape: "CIRCLE"; diameter: number }
  | { shape: "SQUARE"; side: number }
  | { shape: "RECTANGLE"; width: number; height: number };