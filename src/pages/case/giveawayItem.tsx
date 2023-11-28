import { IconFont } from '@/components/icons';
import { parseName } from '@/utils';
import { FormattedMessage, history } from '@umijs/max';
import { useCountDown } from 'ahooks';
import { Countdown } from 'react-daisyui';

interface GiveawayItemProps {
  index: number;
  item: API.RollRoomPageVo;
}
export default function GiveawayItem(props: GiveawayItemProps) {
  const { index, item } = props;
  const [countdown, formattedRes] = useCountDown({
    leftTime: Number(item?.leftTime) || 0,
  });
  const { days, hours, minutes, seconds } = formattedRes;
  const name = item?.giftVos?.[0]?.giftName;
  return (
    <div
      className={`relative cursor-pointer grid h-40 sm:h-44 min-w-[80%] snap-start overflow-x-visible sm:min-w-[50%] md:min-w-[300px] xl:min-w-[334px] giveaways-grade giveaways-grade-${index}`}
      key={`giveaways-${index}`}
      onClick={() =>
        history.push({
          pathname: `/giveaways/${item?.id}`,
          search: location.search,
        })
      }
    >
      {item?.accumulatedAmount === 0 && (
        <div className="absolute -right-1 -top-1 z-30 w-16 h-12">
          <img
            src={require('@/assets/free-rool.png')}
            className="w-full object-cover"
          />
        </div>
      )}
      <div className="relative overflow-hidden giveaways-grade-item w-full flex flex-col">
        <div className="flex justify-between top-color text-black/70">
          <div className="py-0.5 px-2 bg-[#E1E1E126] italic rounded-br font-bold text-white text-xs">
            {item?.title}
          </div>
        </div>
        <div className="relative flex flex-1 h-full w-full overflow-hidden">
          <div className="flex w-[45%] flex-col">
            <div className="flex min-h-0 flex-shrink">
              <div className="h-full  min-h-0 w-4/5 ml-[16px]">
                <img
                  src={item?.giftVos?.[0]?.giftImage}
                  className="aspect-[98.5/74] h-full min-h-0 w-full object-contain"
                  alt=""
                />
              </div>
            </div>
            <span className="ml-4 mb-1 sm:mb-3 truncate text-xs font-semibold text-white">
              ${item?.poolValue}
            </span>
          </div>
          <div className="flex w-[55%] flex-col pr-2.5 justify-between">
            <div className="flex flex-col mt-1 sm:mt-2 sm:gap-1">
              <span className="truncate text-xs font-semibold text-white text-opacity-70">
                {name && parseName(name)?.[0]}
              </span>
              <span className="truncate text-xs font-semibold leading-none text-white">
                {name && parseName(name)?.[1] && (
                  <span className="text-white/50">
                    ({parseName(name)?.[1]})
                  </span>
                )}
                {name && parseName(name)?.[2]}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs mb-1 sm:mb-3 ">
              <IconFont type="icon-online" className="icon-color text-xs" />
              {item?.userCount}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black flex items-center justify-between p-1.5 sm:p-3 pr-1.5 z-[1]">
        <div className="flex items-center flex-shrink-0 justify-start w-auto p-1.5">
          {days > 0 && (
            <>
              <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
                <Countdown
                  value={days}
                  className="days-value text-xs font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform text-xs scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_days" />
                </span>
              </div>
              <div className="mx-0.5 text-center text-xs font-semibold  text-white">
                :
              </div>
            </>
          )}
          <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
            <Countdown
              value={hours}
              className="days-value text-xs font-semibold tabular-nums leading-none text-white"
            />
            <span className="transform text-xs scale-75  font-medium leading-none text-white text-opacity-70">
              <FormattedMessage id="text_time_hour" />
            </span>
          </div>
          <div className="mx-0.5 text-center text-xs font-semibold text-white">
            :
          </div>

          <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
            <Countdown
              value={minutes}
              className="days-value text-xs font-semibold tabular-nums leading-none text-white"
            />
            <span className="transform text-xs scale-75 font-medium leading-none text-white text-opacity-70">
              <FormattedMessage id="text_time_min" />
            </span>
          </div>
          <div className="mx-0.5 text-center text-xs font-semibold text-white">
            :
          </div>
          <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
            <Countdown
              value={seconds}
              className="days-value text-xs font-semibold tabular-nums leading-none text-white"
            />
            <span className="transform text-xs scale-75 font-medium leading-none text-white text-opacity-70">
              <FormattedMessage id="text_time_sec" />
            </span>
          </div>
        </div>
        <div className="btn !h-[30px] !min-h-0 text-xs btn-color !rounded">
          <FormattedMessage id="roll_ljcy" />
        </div>
      </div>
    </div>
  );
}
