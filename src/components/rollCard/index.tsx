import { parseName } from '@/utils';
import { FormattedMessage, history } from '@umijs/max';
import { useCountDown } from 'ahooks';
import React from 'react';
import { Avatar, Countdown } from 'react-daisyui';
import { IconFont } from '../icons';
import './index.less';

export default React.memo(function RollCard({
  data,
}: {
  data: API.RollRoomPageVo;
}) {
  const topImg = data?.giftVos?.[0]?.giftImage;
  const gifts = data?.giftVos?.slice(1);
  const isEnd = data?.state === 2;

  const [countdown, formattedRes] = useCountDown({
    leftTime: Number(data?.leftTime) || 0,
  });

  const { days, hours, minutes, seconds } = formattedRes;
  const name = data?.giftVos?.[0]?.giftName;

  return (
    <div
      className={`roll-card cursor-pointer ${isEnd ? 'end' : ''}`}
      style={
        data?.roomType === 1
          ? {
              background:
                'var(--d-6, radial-gradient(341.21% 100.00% at 50.00% 100.00%, #5A2E94 0%, #282828 81.85%))',
            }
          : {
              background:
                'var(--d-7, radial-gradient(341.21% 100.00% at 50.00% 100.00%, #204A29 0%, #1E1D22 84.25%))',
            }
      }
    >
       {data?.accumulatedAmount === 0 && (
        <div className="absolute -right-1 -top-1 z-30 w-12">
          <img
            src={require('@/assets/free-rool.png')}
            className="w-full object-cover"
          />
        </div>
      )}
      <div
        className="roll-card-banner blur-md"
        style={{
          backgroundImage: `url(${topImg})`,
        }}
      ></div>
      <div className="roll-card-top">
        <div className="flex justify-between items-center mt-2 sm:mt-4">
          <div className="flex-1 overflow-hidden pl-3 flex gap-2 items-center">
            {data?.banner && (
              <Avatar src={data?.banner} size={25} shape="square" />
            )}
            <span className="uppercase text-sm font-normal truncate">
              {data?.title}
            </span>
          </div>
          <div className="text-sm text-white pr-3">
            <IconFont type="icon-online" className="text-green mr-1 text-sm" />
            {data?.userCount}
          </div>
        </div>

        <div className="roll-card-top-img">
          <img src={topImg} />
        </div>
      </div>
      <div className="mx-5 pb-2 border-b border-light mt-[28px]">
        <div className="h-[24px]">
          <span className="truncate text-white/[0.5] text-xs min-h-[15px]">
            {name && parseName(name)?.[0]}
          </span>
        </div>

        <div className=" truncate text-white text-sm">
          {name && parseName(name)?.[1] && (
            <span className="text-white/50">
              ({name && parseName(name)?.[1]})
            </span>
          )}
          {name && parseName(name)?.[2]}
        </div>
      </div>
      <div className="mx-5 my-2 flex justify-between items-center text-sm capitalize">
        <div>
          <FormattedMessage id="room_giveaways_prizes" />: {data?.giftCount}
        </div>
        <div>
          <FormattedMessage id="battle_room_total" />:{' '}
          <span className="text-green font-semibold">${data?.poolValue}</span>
        </div>
      </div>
      <div className="w-full absolute bottom-0 left-0">
        <div
          className={`mx-2  sm:mx-5 ${
            data?.roomType === 1 ? 'btn-purple' : 'btn-green'
          }`}
          onClick={() => {
            history.push({
              pathname: `/giveaways/${data?.id}`,
              search: location.search || '',
            });
          }}
        >
          <FormattedMessage id="giveaways_ckxq" />
        </div>
        <div className="roll-card-bottom">
          <div className="flex-1 justify-center text-center">
            {isEnd ? (
              <FormattedMessage id="roll_yjs" />
            ) : (
              data?.openTime && (
                <div className="font-mono flex justify-center items-center gap-1">
                  <IconFont type="icon-history" className="text-sm" />
                  {days > 0 && (
                    <>
                      <div className="flex items-center text-xs">
                        <Countdown value={days} />
                        <span className="text-xs">d</span>
                      </div>
                      <div className="mx-0.5 text-center text-sm font-normal text-white">
                        :
                      </div>
                    </>
                  )}
                  <div className="flex items-center text-xs font">
                    <Countdown value={hours} />
                    <span className="text-xs">h</span>
                  </div>
                  <div className="mx-0.5 text-center text-xs font-normal text-white">
                    :
                  </div>
                  <div className="flex items-center text-xs">
                    <Countdown value={minutes} />
                    <span className="text-xs">m</span>
                  </div>
                  <div className="mx-0.5 text-center text-xs font-normal text-white">
                    :
                  </div>
                  <div className="flex items-center text-xs">
                    <Countdown value={seconds} />
                    <span className="text-xs">s</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
