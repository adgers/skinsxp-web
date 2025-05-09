import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { parseName } from '@/utils';
import { IconFont } from '../icons';
import './index.less';

interface TopCardProps {
  data?: API.RecentDropVo;
  loading?: boolean;
}

export default React.memo(function TopCard({ data, loading }: TopCardProps) {
  if (loading) {
    const random = Math.floor(Math.random() * 4);
    return (
      <div className={`weapon-card-top weapon-card-grade-${random} `}>
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
          <Skeleton
            width={70}
            height={30}
            baseColor="rgba(0, 0, 0, 0.15)"
            highlightColor="rgba(0, 0, 0, 0.2)"
          />
          <Skeleton
            width={140}
            height={15}
            baseColor="rgba(0, 0, 0, 0.15)"
            highlightColor="rgba(0, 0, 0, 0.2)"
          />
        </div>
      </div>
    );
  }

  const getTopIcon = () => {
    let topIcon = <IconFont type="icon-cases1" />;

    if (data?.sourceType === 22) {
      topIcon = <IconFont type="icon-zhuimeng" />;
    } else if (data?.sourceType === 23) {
      topIcon = <IconFont type="icon-battle" />;
    }
    return topIcon;
  };

  return (
    <div
      className={`weapon-card-top weapon-card-grade-${data?.grade} ${data?.sourceType === 21 ? 'card-flip' : ''}`}
    >
      <div className="front">
        <div className="img-wrapper">
          <img src={data?.giftImage} />
          {/* <div className="absolute top-1 right-1 transform scale-75 text-xs sm:scale-100 text-white">
            {getTopIcon()}
          </div> */}
        </div>
        <div className="item-footer flex flex-row gap-1 justify-between">
          <div className="item-title">
            <div className="truncate text-white/[0.5] text-xs">
              {data?.giftName && parseName(data?.giftName || '')?.[0]}
            </div>
            <div className=" truncate text-white text-xs">
              {data?.giftName && parseName(data?.giftName)?.[1] && (
                <span className="text-white/50">
                  ({parseName(data?.giftName)?.[1]})
                </span>
              )}
              {data?.giftName && parseName(data?.giftName)?.[2]}
            </div>
          </div>
          <div className="w-[24px] h-[24px] rounded-full flex-shrink-0 relative">
            <div className="w-[12px] absolute right-[0] top-[-6px]">
              <img src={require('@/assets/winner-icon.png')} />
            </div>
            <img
              src={data?.headPic}
              className="w-full h-full rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>
      {data?.sourceType === 21 && (
        <div className="back">
          <div className="box-img-wrapper">
            <img src={data?.sourceImage} />
          </div>
        </div>
      )}
    </div>
  );
});
