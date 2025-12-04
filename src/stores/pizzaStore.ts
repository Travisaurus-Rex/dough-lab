import { create } from 'zustand';
import type { PizzaShape } from '../models/PizzaShape';
import type { PizzaStyle } from '../models/PizzaStyle';

interface PizzaState {
  shape: PizzaShape;
  style: PizzaStyle;
  size: string;

  setShape: (shape: PizzaShape) => void;
  setStyle: (style: PizzaStyle) => void;
  setSize: (size: string) => void;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  shape: 'NONE',
  style: 'NONE',
  size: '',

  setShape: (shape) => set({ shape }),
  setStyle: (style) => set({ style }),
  setSize: (size) => set({ size }),
}));