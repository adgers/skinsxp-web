import { numberSplitCeil } from '@/utils';
import { history } from '@umijs/max';
import { useRef } from 'react';
import LazyLoad from 'react-lazyload';
import { animated, useSpring } from 'react-spring';

import './index.less';

export default function TopCase({ v }: { v: any }) {
  const ref = useRef();
  const trans1 = (x, y) => {
    if (x === 0 && y === 0) return 'none';

    const rotateX = ((20 / ref.current?.offsetHeight) * y - 10).toFixed(2);
    const rotateY = (10 - (20 / ref.current?.offsetWidth) * x).toFixed(2);
    return `scale(${
      rotateX || rotateY ? '1.02' : '1'
    }) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
  };

  const trans2 = (x, y) => {
    const bgPosX = ((x / ref.current?.offsetWidth) * 100).toFixed(2);
    const bgPosY = ((y / ref.current?.offsetHeight) * 100).toFixed(2);
    return `radial-gradient(farthest-corner circle at ${bgPosX}% ${bgPosY}%, #ffc8ff 5%,transparent 60%)`;
  };
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { duration: 150 },
  }));

  const onMouseMove = (e) => {
    const mousePosX = e.nativeEvent.offsetX;
    const mousePosY = e.nativeEvent.offsetY;

    set({ xy: [mousePosX, mousePosY] });
  };

  const onMouseLeave = () => {
    set({ xy: [0, 0] });
  };
  return (
    <div className="[perspective:800px]">
      <animated.div
        className="w-full h-full relative cursor-pointer case-wrap aspect-[1/1.4] rounded-md overflow-hidden group"
        onClick={() => {
          history.push({
            pathname: `/case/${v?.id}`,
          });
        }}
        ref={ref}
        onMouseLeave={onMouseLeave}
        style={{
          transform: props.xy.to(trans1),
        }}
      >
        <LazyLoad offset={200}>
          <img
            src={v?.boxImage}
            alt={v.boxName}
            className="w-full h-full object-contain rounded-md"
          />
          {/* <div className="w-full h-full absolute top-0 left-0"> */}
          {/* <div className="absolute top-[1.5] left-[1.75] text-green">New !</div> */}
          {Number(v?.discount) < 100 && (
            <div className="absolute top-[25px] left-[25px]  text-green px-1.5 rounded bg-[#123F0D]">
              -{100 - Number(v?.discount)}%
            </div>
          )}
          <div className="absolute top-[20px] right-0 flex flex-col items-center bg-black/[0.8] rounded-l text-white px-2 py-0.5 font-num sm:text-xl">
            {Number(v?.discount) < 100 && (
              <span className="text-gray text-sm font-normal line-through">
                $
                {numberSplitCeil(
                  (Number(v?.openPrice) * 100) / Number(v?.discount),
                )}
              </span>
            )}
            ${v?.openPrice}
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm py-3 px-2">
            <div className="w-full text-white truncate text-center">
              {v?.boxName}
            </div>
          </div>
          {/* </div> */}
        </LazyLoad>
        <animated.div
          className="hidden group-hover:block mix-blend-overlay absolute w-full h-full top-0 left-0"
          style={{
            backgroundImage: props.xy.to(trans2),
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        ></animated.div>
      </animated.div>
    </div>
  );
}
