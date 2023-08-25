import { numberFixed, parseName } from '@/utils';
import './index.less';

import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default React.memo(function WeaponCard({
  loading,
  data,
  mini = false,
  fromProfile = false,
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
  fromProfile?: boolean;
}) {
  const [showChance, setShowChance] = useState<boolean>(false);

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
  const probability = data?.realProbability || 0;

  return (
    <div
      className={`weapon-card relative weapon-card-grade-${grade} ${
        data?.state === 0 ? 'group-hover:border-none' : ''
      }`}
    >
      <div className="img-wrapper">
        <img src={img} />
      </div>
      <div className="item-footer flex flex-col gap-1">
        {mini ? null : (
          <div>
            <span className="truncate text-white/[0.5] text-xs">
              {name && parseName(name)?.[1]}
            </span>
          </div>
        )}
        <div className=" truncate text-white text-sm">
          {name && parseName(name)?.[0]}
        </div>
      </div>

      <div className="absolute left-0 top-0 text-sm text-white pt-[9px] pl-[11px]">
        <span className="font-num">
          $ {price && numberFixed(Number(price))}
        </span>
      </div>
      {probability > 0 && ( // 有概率才显示
        <div className="absolute right-0 top-0 flex flex-col items-end text-right z-30 text-white/[0.5] text-sm font-semibold uppercase leading-none pt-[9px] pr-[11px] gap-2">
          <div className="text-white/[0.5] text-xs font-num flex items-center gap-2">
            {numberFixed(probability * 100, 2)}%
            <div
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.10] text-center font-bold transition-colors duration-200 css-1t6ze00"
              onClick={() => setShowChance(!showChance)}
            >
              {showChance ? 'x' : 'i'}
            </div>
          </div>
        </div>
      )}
      {showChance && (
        <div className="z-20 absolute left-0 top-0 flex items-center justify-center h-full w-full rounded bg-[rgb(17,17,20)] bg-opacity-70 transition duration-300 sm:rounded-lg backdrop-blur-1">
          <div className="flex flex-col items-center gap-1">
            <div className="uppercase text-white text-center font-semibold text-sm">
              Range Odds
            </div>
            <div className="text-white/[0.5] text-sm">99950 - 99973</div>
          </div>
        </div>
      )}
      {/* </div>  */}
    </div>
  );
});
