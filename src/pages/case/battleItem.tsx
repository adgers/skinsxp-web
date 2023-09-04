import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { FormattedMessage, history } from '@umijs/max';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

interface BattleItemProps {
  index: number;
  data: API.BattleVo;
}
export default function BattleItem(props: BattleItemProps) {
  const { data } = props;

  const [swiperIns, setSwiperIns] = useState<SwiperClass | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div
      className={`relative cursor-pointer z-10 flex items-start flex-col h-[226px]  min-w-[90%] snap-start overflow-hidden sm:min-w-[50%] md:min-w-[33.333333%] xl:min-w-[20%] justify-between battle-item battle-item-grade-${data?.mode}`}
      onClick={() => {
        history.push(`/battle/${data?.battleCode}`);
      }}
    >
      <div className="flex items-center  mt-2.5 ml-4 gap-2 uppercase text-xs">
        <div
          className={`rounded-full text-white flex items-center flex-shrink-0 justify-center font-bold w-[34px] h-[34px] border-[2px] border-opacity-40 ${
            data?.round === 0 ? 'border-green ' : 'border-red'
          }`}
        >
          {data?.boxList?.length}
        </div>
        <span className="font-semibold uppercase">
          <FormattedMessage id="room_battle_round" />
        </span>
      </div>

      <Swiper
        className="w-full h-full flex items-center relative"
        // ref={swiperRef}
        onSwiper={(swiper) => {
          !swiperIns && setSwiperIns(swiper);
        }}
      >
        {data?.boxList?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative z-10 flex-1 overflow-hidden flex flex-col items-start justify-between pb-2 pl-3 pr-2 h-full w-full">
              <div className="h-full w-full flex-1 overflow-hidden bg-[] bg-no-repeat bg-opacity-[0.3]  bg-center relative">
                <img
                  src={item?.boxImage}
                  className=" h-full  m-auto z-[11]"
                  alt=""
                />
                <img
                  src={require('@/assets/iv.png')}
                  className="absolute z-1 top-[50%] left-[50%] opacity-30  translate-x-[-50%] translate-y-[-50%]"
                  alt=""
                />
              </div>
              <div className="flex justify-between overflow-hidden gap-4 w-full items-center">
                <div className="flex-1 truncate overflow-hidden text-xs">
                  {item?.boxName}
                </div>
                <div className="text-xs text-white/50">
                  <span className="text-white text-sm font-bold">
                    {index + 1}
                  </span>{' '}
                  / {data?.boxList?.length}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {data?.boxList && data?.boxList?.length > 1 && (
          <div className="absolute w-full h-8 flex items-center justify-between px-8 z-20">
            <div
              onClick={(e) => {
                if (currentIdx === 0) {
                  return;
                }
                e.stopPropagation();

                swiperIns?.slidePrev();
                setCurrentIdx(currentIdx - 1);
              }}
              className={`${
                currentIdx === 0
                  ? 'text-white/[50] cursor-not-allowed opacity-20'
                  : 'text-white cursor-pointer'
              }`}
            >
              <LeftOutlined />
            </div>
            <div
              onClick={(e) => {
                if (currentIdx === data?.boxList?.length - 1) {
                  return;
                }
                e.stopPropagation();
                swiperIns?.slideNext();
                setCurrentIdx(currentIdx + 1);
              }}
              className={`${
                currentIdx === data?.boxList?.length - 1
                  ? 'text-white/[50] cursor-not-allowed opacity-20'
                  : 'text-white cursor-pointer'
              }`}
            >
              <RightOutlined />
            </div>
          </div>
        )}
      </Swiper>
      <div
        className="relative z-10 w-full flex items-center justify-between overflow-hidden rounded-none px-2 py-2.5"
        style={{
          background: 'rgba(23, 23, 23, 0.60)',
          backdropFilter: 'blur(1px)',
        }}
      >
        <div className="relative z-10 flex flex-col">
          <span className="text-[8px] font-semibold uppercase text-white/60">
            <FormattedMessage id="room_battle_cost" />
          </span>
          <span className="text-white text-xs font-num">
            ${data?.totalPrice}
          </span>
        </div>
        <div className="flex gap-2">
          {data?.customerList?.map((item, index) => {
            if (item?.nickname !== '')
              return (
                <div key={index} className="w-8 h-8 rounded-full ">
                  <img
                    src={item?.headPic}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
              );
            return (
              <div
                key={index}
                className="flex w-8 h-8 rounded-full items-center justify-center bg-light bg-opacity-70"
              >
                <PlusOutlined className="font-bold text-lg text-white" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
