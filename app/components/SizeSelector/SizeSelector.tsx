import type { PizzaSizeOption } from '../../models/PizzaSize';
import { usePizzaStore } from '../../stores/pizzaStore';
import { sizeOptionsForShape } from '../../utils/sizeOptionsForShape';
import { FormSelect } from '../FormSelect/FormSelect';

export function SizeSelector() {
    const pizzaShape = usePizzaStore(state => state.shape);
    const pizzaSize = usePizzaStore(state => state.size);
    const setPizzaSize = usePizzaStore(state => state.setSize);

    const options = sizeOptionsForShape(pizzaShape);
    
    return (
        <div>
            <FormSelect<PizzaSizeOption>
                label="Pizza Size"
                options={options}
                value={pizzaSize}
                onChange={setPizzaSize} />
        </div>
    )
}