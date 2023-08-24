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
    <div className="flex justify-center h-10 sm:h-[60px]">
      {arr.map((item, index) => {
        const isSelect = select === item;
        return (
          <div
            className={`w-full h-full font-num inline-flex justify-center items-center text-base cursor-pointer border ${
              isSelect
                ? 'text-green border-green'
                : 'border-light text-white'
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
