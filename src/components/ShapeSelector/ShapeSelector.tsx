import { useState } from 'react';
import { PizzaShape, type PizzaShape as PizzaShapeType } from '../../models/PizzaShape';

export function ShapeSelector() {
    const [shape, setShape] = useState<PizzaShapeType>('none');

    return (
        <>
        <label>Pan Shape:</label>
        <select value={shape} onChange={e => setShape(e.target.value as PizzaShapeType)}>
            {PizzaShape.map((value: PizzaShape) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
      </>
    )
}