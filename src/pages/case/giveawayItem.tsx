import kingSvg from '@/assets/king.svg';
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
      className={`relative cursor-pointer grid h-28 sm:h-36 min-w-[80%] snap-start overflow-hidden sm:min-w-[50%] md:min-w-[33.333333%] xl:min-w-[20%] giveaways-grade giveaways-grade-${index}`}
      key={`giveaways-${index}`}
      onClick={() =>
        history.push({
          pathname: `/giveaways/${item?.id}`,
          search: location.search,
        })
      }
    >
      <div className="relative col-start-1 row-start-1 grid overflow-hidden pl-2.5 pt-2.5 giveaways-grade-item w-full">
        <div className="flex h-4 sm:h-6">
          <div className="flex items-center">
            <div
              className={`h-4 w-4 border-r-[50%] rounded-full flex justify-center items-center giveaways-icon`}
            >
              <img src={kingSvg} alt="" className="w-[8px] h-[8px]" />
            </div>
            <p className="ml-2 text-xs font-semibold text-white text-opacity-70">
              {item?.title}
            </p>
          </div>
          <div className="ml-auto flex items-center rounded-none py-1.5 pl-1.5 pr-2 text-xs font-semibold tabular-nums text-white bg-white/[.15] rounded-l">
            <IconFont type="icon-online" className="mr-1 text-[10px]" />
            {item?.userCount}
          </div>
        </div>
        <div className="relative flex min-h-0 flex-shrink w-full overflow-hidden">
          <div className="flex w-[45%] flex-col">
            <div className="flex min-h-0 flex-shrink">
              <div className="grid-stack -mx-2 grid h-full max-h-[74px] min-h-0 w-4/5 ml-[16px]">
                <img
                  src={item?.giftVos?.[0]?.giftImage}
                  className="aspect-[98.5/74] h-full min-h-0 w-full object-contain"
                  alt=""
                />
              </div>
            </div>
            <span className="mb-2 mt-auto truncate text-xs font-semibold text-white">
              ${item?.poolValue}
            </span>
          </div>
          <a className="flex w-[55%] flex-col pr-2.5 justify-start">
            <div className="flex flex-col">
              <span className="truncate text-xs font-semibold text-white text-opacity-70">
                {name && parseName(name)?.[0]}
              </span>
              <span className="truncate text-xs font-semibold leading-none text-white">
                {/* {item?.giftVos?.[0]?.giftName?.split('|')?.[1]?.trim()} */}
                {name && parseName(name)?.[1] && (
                  <span className="text-white/50">
                    ({parseName(name)?.[1]})
                  </span>
                )}
                {name && parseName(name)?.[2]}
              </span>
            </div>
            <div className="mb-1 sm:mb-2 mt-auto flex items-center justify-center p-1.5 w-full bg-black/[0.25] rounded">
              {days > 0 && (
                <>
                  <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
                    <Countdown
                      value={days}
                      className="days-value text-xs font-semibold tabular-nums leading-none text-white"
                    />
                    <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
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
                <span className="transform scale-75  font-medium leading-none text-white text-opacity-70">
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
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
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
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_sec" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
