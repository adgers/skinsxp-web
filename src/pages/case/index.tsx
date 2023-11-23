import { getBoxListUsingGET } from '@/services/front/kaixiangxiangguan';
import { numberSplitCeil } from '@/utils';
import { history, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Case from './case';
import Giveaways from './giveaways';
import './index.less';

export default function Home() {
  const [discountBox, setDiscountBox] = useState<API.BoxThemeListVo[]>([]);
  const search = location.search;
  // const [styles, setStyles] = useState({});

  const { data: boxList = [] } = useRequest(
    () =>
      getBoxListUsingGET({
        boxType: 1,
        moduleId: 5,
      }),
    {
      cacheKey: 'boxList',
    },
  );
  // const handleMouseMove = (e: MouseEvent) => {
  //   const width = e?.target?.offsetWidth;
  //   const height = e?.target?.offsetHeight;

  //   const id = e?.target?.offsetParent?.id;
  //   console.log(id);

  //   const x = e?.nativeEvent?.offsetX;
  //   const y = e?.nativeEvent?.offsetY;
  //   const percentX = numberFixed((x - width / 2) / (width / 2), 6);
  //   const percentY = numberFixed((y - height / 2) / (height / 2), 6);
  //   // document
  //   //   .getElementById(id)
  //   //   ?.setAttribute(
  //   //     'style',
  //   //     `transform: scale(1.02) rotateX(${percentX * 10}deg) rotateY(${
  //   //       percentY * 10
  //   //     }deg);`,
  //   //   );
  //   setStyles({
  //     [id]: {
  //       transform: `scale(1.02) rotateX(${percentX * 10}deg) rotateY(${
  //         percentY * 10
  //       }deg)`,
  //     },
  //   });

  //   if (x < 0 || x > width || y < 0 || y > height) {
  //     // document.getElementById(id)?.setAttribute('style', `transform:;`);
  //     setStyles({
  //       [id]: {
  //         transform: '',
  //       },
  //     });
  //   }
  // };
  useEffect(() => {
    if (boxList?.length > 0) {
      setDiscountBox(boxList.slice(0, 1));
    }
  }, [boxList]);
  return (
    <>
      {/* <Banner /> . */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 translate-y-[-40px]">
        {discountBox[0]?.boxList?.map((v, idx) => (
          <div
            className="w-full h-full relative cursor-pointer case-wrap aspect-[1/1.4] rounded-md overflow-hidden transition-all duration-200 will-change-transform hover:-translate-y-0.5"
            onClick={() => {
              history.push({
                pathname: `/case/${v?.id}`,
                search: search,
              });
            }}
            key={idx}
            // onMouseMove={debounce(handleMouseMove, 16)}
            // id={`magicBox_${idx}`}
            // style={styles[`magicBox_${idx}`]}
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
              <div className="w-full h-full absolute top-0 left-0 z-50"></div>
              {/* </div> */}
            </LazyLoad>
          </div>
        ))}
      </div>
      <Giveaways />
      <Case boxList={boxList} />
    </>
  );
}
