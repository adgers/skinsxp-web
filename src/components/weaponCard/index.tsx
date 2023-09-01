import winnerIcon from '@/assets/winner-icon.png';
import { ItemState } from '@/pages/profile/bag';
import { numberFixed, parseName } from '@/utils';
import { history } from '@umijs/max';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { IconFont } from '../icons';
import './index.less';

export default React.memo(function WeaponCard({
  loading,
  data,
  mini = false,
  showRoll = true,
  fromProfile = false,
  isGiveawayWinList = false,
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
  showRoll?: boolean;
  fromProfile?: boolean;
  isGiveawayWinList?: boolean;
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
  const rollCode = data?.rollCode || 0;

  return (
    <div
      className={`weapon-card relative weapon-card-grade-${grade} group-hover:border-none
      `}
    >
      <div className="img-wrapper">
        <img src={img} />
      </div>
      {!isGiveawayWinList ? (
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
      ) : (
        <div className="item-footer flex gap-1 items-center">
          <div className="flex-1 overflow-hidden">
            <div>
              <span className="truncate text-white/[0.5] text-xs">
                {name && parseName(name)?.[1]}
              </span>
            </div>
            <div className=" truncate text-white text-sm">
              {name && parseName(name)?.[0]}
            </div>
          </div>
          <div className="rounded-full w-[40px] relative">
            <div className="w-[17px] absolute right-0 top-[-10px]">
              <img src={winnerIcon} alt="" />
            </div>
            <img
              src={data?.winnerInfo?.headPic || data?.headPic}
              alt=""
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
      )}

      <div className="absolute left-0 top-0 text-sm text-white pt-[8px] px-[10px] w-full flex justify-between items-center">
        <span className="font-num">${price && numberFixed(Number(price))}</span>
        {fromProfile && (
          <span
            className={`uppercase ${
              data?.state === ItemState.ACTIVE ? 'text-green font-bold' : ''
            } ${data?.state === ItemState.SOLD ? 'text-red/100 font-bold' : ''} 
            ${
              data?.state === ItemState.RETRIEVED
                ? 'text-white/60 font-bold'
                : ''
            }`}
          >
            {data?.stateStr}
          </span>
        )}
        {probability > 0 &&
          rollCode === 0 && ( // 有概率才显示
            <div className="text-white/[0.5] text-xs font-num flex items-center gap-2 z-30">
              {numberFixed(probability * 100, 2)}%
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.10] text-center font-bold transition-colors duration-200 lowercase"
                onClick={() => setShowChance(!showChance)}
              >
                {showChance ? 'x' : 'i'}
              </div>
            </div>
          )}
        {rollCode > 0 && showRoll && (
          <div
            className="flex flex-row gap-1 cursor-pointer z-30"
            onClick={() =>
              history.push(`/provably-fair/verify/${data?.verifyId}`)
            }
          >
            <div className="text-xs">Roll</div>
            <div className="text-white/[0.5] text-xs font-num">{rollCode}</div>
            <IconFont type="icon-shield" className="text-green" />
          </div>
        )}
      </div>

      {showChance && (
        <div className="z-20 absolute left-0 top-0 flex items-center justify-center h-full w-full bg-black bg-opacity-70 transition duration-300 backdrop-blur-1">
          <div className="flex flex-col items-center gap-1">
            <div className="uppercase text-white text-center font-semibold text-sm">
              Range Odds
            </div>
            <div className="text-white/[0.5] text-sm">
              {data?.rollCodeLow} - {data?.rollCodeHigh}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
