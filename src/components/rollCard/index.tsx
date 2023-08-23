import { FormattedMessage } from '@umijs/max';
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

  return (
    <div className={`roll-card cursor-pointer ${isEnd ? 'end' : ''}`}>
      <div
        className="roll-card-banner blur-md"
        style={{
          backgroundImage: `url(${topImg})`,
        }}
      ></div>
      <div className="roll-card-top">
        <div className="flex justify-between items-center mt-2 sm:mt-4">
          <div className="pl-3 flex gap-2 items-center">
            {data?.banner && (
              <Avatar src={data?.banner} size={36} shape="square" />
            )}
            <span className="uppercase font-semibold">{data?.title}</span>
          </div>
          <div className="user-count">
            <span className="text-neutral text-sm">
              {data?.userCount}人参与
            </span>
          </div>
        </div>
        <div className="roll-card-info">
          <div className="flex gap-1">
            {gifts?.map((item, i) => (
              <div className="roll-card-info-item" key={i}>
                <img src={item.giftImage} />
              </div>
            ))}
          </div>
          <div className="text-base flex gap-1">
            <IconFont type="icon-coin" className="text-primary" />
            {data?.poolValue}
          </div>
        </div>
        <div className="roll-card-top-img">
          <img src={topImg} />
        </div>
      </div>
      <div className="roll-card-bottom">
        <div className="animate-pulse btn-icon"></div>
        <div className="flex-1 justify-center text-center">
          {isEnd ? (
            <FormattedMessage id="roll_yjs" />
          ) : (
            data?.openTime && (
              <div className="font-mono grid grid-flow-col justify-center items-center auto-cols-max gap-4">
                {days > 0 && (
                  <div className="flex flex-col items-center">
                    <Countdown value={days} />
                    <span className="text-xs">days</span>
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <Countdown value={hours} />
                  <span className="text-xs">hours</span>
                </div>

                <div className="flex flex-col items-center">
                  <Countdown value={minutes} />
                  <span className="text-xs">min</span>
                </div>
                <div className="flex flex-col items-center">
                  <Countdown value={seconds} />
                  <span className="text-xs">sec</span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="animate-pulse btn-icon-right"></div>
      </div>
    </div>
  );
});
