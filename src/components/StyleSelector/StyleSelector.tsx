import { useState } from 'react';
import { PizzaStyle, type PizzaStyle as PizzaStyleType } from '../../models/PizzaStyle';
import { FormSelect } from '../FormSelect/FormSelect';

export function StyleSelector() {
    const [style, setStyle] = useState<PizzaStyleType>('NONE');

    return (
        <div>
            <FormSelect 
                label="Pizza Style"
                options={PizzaStyle}
                value={style}
                onChange={(val) => setStyle(val)} />
        </div>
    )
}