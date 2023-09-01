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
    <div className="flex justify-center h-10 sm:h-[60px] relative">
      <div
        className="absolute left-0 top-0 z-10 h-full border border-solid transition-all duration-500 will-change-transform border-green w-1/5"
        style={{
          transform: `translateX(${(select - 1) * 100}%)`,
        }}
      ></div>
      {arr.map((item, index) => {
        return (
          <div
            className={`w-full h-full font-num inline-flex justify-center items-center text-base cursor-pointer border border-light text-white `}
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
