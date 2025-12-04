import { create } from 'zustand';
import type { PizzaShape } from '../models/PizzaShape';
import type { PizzaStyle } from '../models/PizzaStyle';
import type { PizzaSizeOption } from '../models/PizzaSize';

interface PizzaState {
  shape: PizzaShape;
  style: PizzaStyle;
  size: PizzaSizeOption;

  setShape: (shape: PizzaShape) => void;
  setStyle: (style: PizzaStyle) => void;
  setSize: (size: PizzaSizeOption) => void;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  shape: 'NONE',
  style: 'NONE',
  size: 'SELECT A PIZZA SHAPE',

  setShape: (shape) =>
    set({
      shape,
      // When shape changes, move to placeholder "NONE"
      size: shape === 'NONE' ? 'SELECT A PIZZA SHAPE' : 'NONE',
    }),
  setStyle: (style) => set({ style }),
  setSize: (size) => set({ size }),
}));