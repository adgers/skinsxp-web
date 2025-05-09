import winnerIcon from '@/assets/winner-icon.png';
import { ItemState, ItemUseState } from '@/pages/profile/bag';
import { numberFixed, parseName } from '@/utils';
import { FormattedMessage, history } from '@umijs/max';
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
  isShopList = false,
}: {
  loading?: boolean;
  data?: API.RollRoomGiftVo &
    API.RecentBoxGiftVo &
    API.BoxGiftListVo &
    API.BoxGiftVo &
    API.BattleBoxRecordVo &
    API.UpgradePageVo &
    API.RollRoomGiftVo &
    API.MyVoucherVo;
  mini?: boolean;
  showRoll?: boolean;
  fromProfile?: boolean;
  isGiveawayWinList?: boolean;
  isShopList?: boolean;
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
      className={`weapon-card relative rounded weapon-card-grade-${grade} group-hover:border-none
      `}
    >
      <div className="img-wrapper">
        <img src={img} />
      </div>
      {!isGiveawayWinList ? (
        <div className="item-footer flex flex-col gap-[2px]">
          <div className="truncate text-white/[0.5] text-xs">
            {name && parseName(name)?.[0]}
          </div>
          <div className="truncate text-white text-xs">
            {name && parseName(name)?.[1] && (
              <span className="text-white/50 text-xs">
                ({parseName(name)?.[1]})
              </span>
            )}
            {name && parseName(name)?.[2]}
          </div>
        </div>
      ) : (
        <div className="item-footer flex gap-[2px] items-center">
          <div className="flex-1 overflow-hidden">
            <div className="truncate text-white/[0.5] text-xs">
              {name && parseName(name)?.[0]}
            </div>
            <div className="truncate text-white text-xs">
              {name && parseName(name)?.[1] && (
                <span className="text-white/50 text-xs">
                  ({parseName(name)?.[1]})
                </span>
              )}
              {name && parseName(name)?.[2]}
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

      <div className="absolute left-0 top-0 text-xs sm:text-sm text-white p-[5px] sm:pt-[8px] sm:px-[10px] w-full flex justify-between items-center">
        <span className="font-num text-xs">
          {isShopList ? (
            <IconFont type="icon-coin" className="mr-1 text-purple" />
          ) : (
            'R$'
          )}
          {price && numberFixed(Number(price))}
        </span>
        {fromProfile && data?.state === ItemState.USED && (
          <span
            className={`uppercase ${
              data?.targetType === ItemUseState.SOLD
                ? 'text-red/100 font-semibold'
                : ''
            } 
            ${
              data?.targetType === ItemUseState.RETRIEVED
                ? 'text-primary font-semibold'
                : ''
            }`}
          >
            {data?.stateStr}
          </span>
        )}
        {probability > 0 &&
          rollCode === 0 && ( // 有概率才显示
            <div className="text-white/[0.5] text-xs font-num flex items-center gap-2 z-30">
              {numberFixed(probability * 100, 3)}%
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.10] text-center font-semibold transition-colors duration-200 lowercase"
                onClick={() => setShowChance(!showChance)}
              >
                {showChance ? 'x' : 'i'}
              </div>
            </div>
          )}
        {rollCode > 0 && showRoll && (
          <div
            className="flex flex-row gap-1 cursor-pointer z-30"
            // onClick={() =>
            //   history.push({
            //     pathname: `/provably-fair/verify/${data?.verifyId}`,
            //     search: location.search || '',
            //   })
            // }
          >
            <div className="text-xs uppercase font-semibold text-white/[0.5]">
              <FormattedMessage id="rollcode" />
            </div>
            <div className="text-white/[0.5] text-xs font-num">{rollCode}</div>
            {/* <IconFont type="icon-shield" className="text-green" /> */}
          </div>
        )}
      </div>

      {showChance && (
        <div className="z-20 absolute left-0 top-0 flex items-center justify-center h-full w-full bg-black bg-opacity-70 transition duration-300 backdrop-blur-1">
          <div className="flex flex-col items-center gap-1">
            <div className="uppercase text-white text-center font-semibold text-sm">
              <FormattedMessage id="rollcode_range" />
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
