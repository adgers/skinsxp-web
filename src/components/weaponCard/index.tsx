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
        <div className="text-xs truncate text-white/[0.5] ">{name && parseName(name)?.[0]}</div>
        {mini ? null : (
          <div>
            <span className="truncate text-white text-base">
              {name && parseName(name)?.[1]}
            </span>
          </div>
        )}
      </div>

      <div className="absolute left-0 top-0 text-base text-white pt-[9px] pl-[11px]">
        <span className="font-num" >${price && numberFixed(Number(price))}</span>
      </div>
    </div>
  );
});
