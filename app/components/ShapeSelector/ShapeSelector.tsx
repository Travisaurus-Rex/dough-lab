import { PizzaShape } from '../../models/PizzaShape';
import { usePizzaStore } from '../../stores/pizzaStore';
import { FormSelect } from '../FormSelect/FormSelect';

export function ShapeSelector() {
    const pizzaShape = usePizzaStore(state => state.shape);
    const setPizzaShape = usePizzaStore(state => state.setShape);
    
    return (
        <div>
            <FormSelect 
                label="Pizza Shape"
                options={PizzaShape}
                value={pizzaShape}
                onChange={(val) => setPizzaShape(val)} />
        </div>
    )
}