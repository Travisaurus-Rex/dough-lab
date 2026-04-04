import type { AreaInput } from "../models/AreaInput";

export function resolveAreaInput(shape: string, size: string): AreaInput | null {
  if (shape === "CIRCLE") {
    return { shape: "CIRCLE", diameter: parseInt(size) };
  }

  if (shape === "SQUARE") {
    return { shape: "SQUARE", side: parseInt(size) };
  }

  if (shape === "RECTANGLE") {
    const [w, h] = size.split("x").map(Number);
    return { shape: "RECTANGLE", width: w, height: h };
  }

  return null;
}
