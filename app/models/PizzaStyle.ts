export const PizzaStyle = ['NONE', 'NYC', 'CHICAGO', 'MARGHERITA', 'NAPOLETANA', 'DETROIT', 'SICILIAN','GRANDMA'];
export type PizzaStyle = (typeof PizzaStyle)[number];
export type RealPizzaStyle = Exclude<PizzaStyle, 'NONE'>;
