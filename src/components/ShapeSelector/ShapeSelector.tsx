import { useState } from 'react';
import { PizzaShape, type PizzaShape as PizzaShapeType } from '../../models/PizzaShape';
import { FormSelect } from '../FormSelect/FormSelect';

export function ShapeSelector() {
    const [shape, setShape] = useState<PizzaShapeType>('none');

    return (
        <div>
            <FormSelect 
                label="Pizza Shape"
                options={PizzaShape}
                value={shape}
                onChange={(val) => setShape(val)} />
        </div>
    )
}