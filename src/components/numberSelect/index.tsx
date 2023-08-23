import { useEffect, useState } from 'react';

const NumberSelect = ({
  count,
  onChange,
  value,
  disabled,
}: {
  count: number;
  value?: number;
  disabled?: boolean;
  onChange: (i: number) => void;
}) => {
  const arr = Array.from({ length: count }, (v, i) => i + 1);
  const [select, setSelect] = useState<number>(1);

  useEffect(() => {
    setSelect(value || 1);
  }, [value]);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {arr.map((item, index) => {
        const isSelect = select === item;
        return (
          <div
            className={`w-16 h-8 sm:h-12 font-num inline-flex justify-center items-center rounded text-base cursor-pointer border ${
              isSelect
                ? 'text-secondary border-secondary'
                : 'border-accent border-opacity-20'
            }`}
            key={index}
            onClick={() => {
              if (disabled) return;
              setSelect(item);
              onChange(item);
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default NumberSelect;
