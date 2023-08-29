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
    let topIcon = <IconFont type="icon-home" />;

    if (data?.sourceType === 22) {
      topIcon = <IconFont type="icon-zhuimeng" />;
    } else if (data?.sourceType === 23) {
      topIcon = <IconFont type="icon-zhandou" />;
    }
    return topIcon;
  };

  const name = parseName(data?.giftName || '');

  return (
    <div
      className={`weapon-card-top card-flip weapon-card-grade-${data?.grade}`}
    >
      <div className="front">
        <div className="img-wrapper">
          <img src={data?.giftImage} />
          <div className="absolute top-1 right-1 transform scale-75 text-xs sm:scale-100 text-white">
            {getTopIcon()}
          </div>
        </div>
        <div className="item-footer">
          <div className="item-title">{name}</div>
        </div>
      </div>
      <div className="back">
        {data?.sourceType === 21 ? (
          <>
            <div className="box-img-wrapper">
              <img src={data?.sourceImage} />
            </div>
            <div className="item-footer">
              <div className="avatar relative rounded">
                <img src={data?.headPic} />
              </div>
              <div className="text-white text-xs mt-2">{data?.nickname}</div>
            </div>
          </>
        ) : (
          <div className="item-footer items-center flex flex-col gap-1 justify-center">
            <div className="avatar relative rounded">
              <img src={data?.headPic} />
            </div>
            <div className="text-white text-xs mt-2">{data?.nickname}</div>
          </div>
        )}
      </div>
    </div>
  );
});
