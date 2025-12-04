import { PizzaStyle } from '../../models/PizzaStyle';
import { usePizzaStore } from '../../stores/pizzaStore';
import { FormSelect } from '../FormSelect/FormSelect';

export function StyleSelector() {
    const pizzaStyle = usePizzaStore((state) => state.style);
    const setPizzaStyle = usePizzaStore((state) => state.setStyle);
    return (
        <div>
            <FormSelect 
                label="Pizza Style"
                options={PizzaStyle}
                value={pizzaStyle}
                onChange={(val) => setPizzaStyle(val)} />
        </div>
    )
}