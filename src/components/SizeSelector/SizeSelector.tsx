import type { PizzaSizeOption } from '../../models/PizzaSize';
import { usePizzaStore } from '../../stores/pizzaStore';
import { sizeOptionsForShape } from '../../utils/sizeOptionsForShape';
import { FormSelect } from '../FormSelect/FormSelect';

export function SizeSelector() {
    const pizzaShape = usePizzaStore(state => state.shape);
    const pizzaSize = usePizzaStore(s => s.size);
    const setPizzaSize = usePizzaStore(s => s.setSize);

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