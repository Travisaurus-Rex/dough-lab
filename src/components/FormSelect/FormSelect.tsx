import { useEffect, useRef, useState } from 'react';

interface FormSelectProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

export function FormSelect<T extends string>({ label, options, value, onChange }: FormSelectProps<T>)  {
    const [showOptions, setShowOptions] = useState(false);

    function updateValue(val: T) {
        onChange(val);
        setShowOptions(false);
    }

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!ref.current?.contains(e.target as Node)) {
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref}>
            <div>{label}</div>
            <div className="border border-black rounded-sm cursor-pointer px-3 py-2 hover:bg-gray-200" 
                onClick={() => setShowOptions(val => !val)}>
                { value }
            </div>
            {showOptions && 
                <div className="border border-black rounded-b-lg overflow-hidden">
                    {options.map(val => (
                        <div key={val} className="cursor-pointer px-3 py-2 hover:bg-blue-300" onClick={() => updateValue(val)}>{val}</div>
                    ))}
                </div>
            }
        </div>
    )
}