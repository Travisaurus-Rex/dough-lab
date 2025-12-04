import './App.css'
import { Results } from './components/Results/Results';
import { ShapeSelector } from './components/ShapeSelector/ShapeSelector'
import { SizeSelector } from './components/SizeSelector/SizeSelector'
import { StyleSelector } from './components/StyleSelector/StyleSelector'
import { usePizzaStore } from './stores/pizzaStore';
import { calculateArea, calculateDoughIngredients } from './utils/doughCalculator';
import { resolveAreaInput } from './utils/resolveAreaInput';

function App() {
  const pizzaShape = usePizzaStore(state => state.shape);
  const pizzaStyle = usePizzaStore(state => state.style);
  const pizzaSize = usePizzaStore(state => state.size);
  const areaInput = resolveAreaInput(pizzaShape, pizzaSize);

  let result = null;

  if (pizzaShape !== "NONE" && pizzaSize !== "NONE" && pizzaStyle !== "NONE" && areaInput) {
    const area = calculateArea(areaInput);
    result = calculateDoughIngredients(area, pizzaStyle);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto my-6 p-4 border border-black rounded-sm">
        <h1 className="text-5xl mb-6">DoughLab</h1>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <ShapeSelector />
          <StyleSelector />
          <SizeSelector />
        </div>
        {result ? (
          <Results result={result} />
        ) : (
          <p className="text-gray-500 italic">Select a shape, size, and style to calculate dough.</p>
        )}
      </div>
    </>
  )
}

export default App
