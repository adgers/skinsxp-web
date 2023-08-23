import { numberFixed, parseName } from '@/utils';
import { IconFont } from '../icons';
import './index.less';

import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default React.memo(function WeaponCard({
  loading,
  data,
  mini = false,
}: {
  loading?: boolean;
  data?: API.RollRoomGiftVo &
    API.RecentBoxGiftVo &
    API.BoxGiftListVo &
    API.BoxGiftVo &
    API.BattleBoxRecordVo &
    API.UpgradePageVo &
    API.RollRoomGiftVo;
  mini?: boolean;
}) {
  if (loading) {
    const random = Math.floor(Math.random() * 4);
    return (
      <div className={`weapon-card weapon-card-grade-${random} `}>
        <div className="flex w-full h-full justify-center items-center">
          <Skeleton
            width={70}
            height={30}
            baseColor="rgba(0, 0, 0, 0.15)"
            highlightColor="rgba(0, 0, 0, 0.2)"
          />
        </div>
      </div>
    );
  }

  const name = data?.giftName || data?.voucherName || data?.winVoucherName;
  const price =
    data?.recoveryPrice || data?.giftPrice || data?.winRecoveryPrice;
  const img = data?.giftImage || data?.winVoucherImg;
  const grade = data?.grade ?? data?.giftGrade;

  return (
    <div className={`weapon-card weapon-card-grade-${grade}`}>
      <div className="img-wrapper">
        <img src={img} />
      </div>
      <div className="item-footer flex flex-col gap-1">
        <div className="text-xs truncate">{name && parseName(name)?.[0]}</div>
        {mini ? (
          <div className="text-xs flex justify-center">
            <IconFont type="icon-daimond" className="mr-1" />
            <span className="font-num">
              {price && numberFixed(Number(price))}
            </span>
          </div>
        ) : (
          <div className="text-xs flex justify-between">
            <span className="text-base-content text-opacity-50 truncate">
              {name && parseName(name)?.[1]}
            </span>
            <span className='flex'>
              <IconFont type="icon-daimond" className="mr-1 " />
              <span className="font-num">
                {price && numberFixed(Number(price))}
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="item-prop flex flex-col gap-1 text-xs text-base-content text-opacity-50 text-right">
        {data?.rollCodeHigh && data?.rollCodeLow && (
          <div className="flex gap-1">
            <IconFont type="icon-rollpoint" />
            {data.rollCodeLow}-{data.rollCodeHigh}
          </div>
        )}
        {data?.realProbability && (
          <div>{numberFixed(data.realProbability * 100)}%</div>
        )}
      </div>
    </div>
  );
});
