import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './index.less';

interface TopCardProps {
  data?: API.RecentOpenBoxGiftVo;
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

  const name = data?.giftName || data?.voucherName || data?.winVoucherName;

  return (
    <div
      className={`weapon-card-top card-flip weapon-card-grade-${data?.grade}`}
    >
      <div className="front">
        <div className="img-wrapper">
          <img src={data?.giftImage} />
        </div>
        <div className="item-footer text-white">
          <div className="item-title">{data?.boxName?.split('|')?.[0].trim()}</div>
          <div className="item-nick">{data?.boxName?.split('|')?.[1].trim()}</div>
        </div>
      </div>
      <div className="back">
        <div className="box-img-wrapper">
          <img src={data?.boxImage} />
        </div>
        <div className="item-footer">
          <div className="avatar relative rounded">
            <img src={data?.headPic} />
            <img
              src={data?.headGround}
              className="absolute left-0 top-0 w-full h-full"
            />
          </div>
          <div className="item-title">{data?.nickname}</div>
        </div>
      </div>
    </div>
  );
});
