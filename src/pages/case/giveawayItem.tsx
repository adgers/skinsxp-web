import kingSvg from '@/assets/king.svg';
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
  return (
    <div
      className={`relative grid h-36 min-w-[90%] snap-start overflow-hidden sm:min-w-[50%] md:min-w-[33.333333%] xl:min-w-[20%] giveaways-grade giveaways-grade-${index}`}
      key={`giveaways-${index}`}
    >
      <div className="relative col-start-1 row-start-1 grid overflow-hidden border-b border-current pl-2.5 pt-2.5">
        <div className="flex h-6">
          <div className="flex items-center">
            <div className="h-4 w-4 border-r-[50%] bg-[#FFEE51] rounded-full flex justify-center items-center">
              <img src={kingSvg} alt="" className="w-[8px] h-[8px]" />
            </div>
            <p className="ml-2 text-xs font-bold text-white text-opacity-70">
              {item?.title}
            </p>
          </div>
          <div className="ml-auto flex items-center rounded-l-md py-1.5 pl-1.5 pr-2 text-xs font-bold tabular-nums text-white bg-white/[.15]">
            {item?.userCount}
          </div>
        </div>
        <div className="relative flex min-h-0 flex-shrink">
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
              ${item?.accumulatedAmount}
            </span>
          </div>
          <a className="flex w-[55%] flex-col pr-2.5 justify-start" href="/">
            <div className="flex flex-col">
              <span className="truncate text-xs font-bold text-white text-opacity-70">
                {item?.giftVos?.[0]?.giftName?.split('|')?.[0]?.trim()}
              </span>
              <span className="truncate text-xs font-bold leading-none text-white">
                {item?.giftVos?.[0]?.giftName?.split('|')?.[1]?.trim()}
              </span>
            </div>
            <div className="mb-2 mt-auto flex items-center justify-center p-2 w-full xl:w-min bg-black/[0.25]">
              {days > 0 && (
                <>
                  <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
                    <Countdown
                      value={days}
                      className="days-value text-xs font-bold tabular-nums leading-none text-white"
                    />
                    <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                      days
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
                  className="days-value text-xs font-bold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75  font-medium leading-none text-white text-opacity-70">
                  hr.
                </span>
              </div>
              <div className="mx-0.5 text-center text-xs font-semibold text-white">
                :
              </div>

              <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
                <Countdown
                  value={minutes}
                  className="days-value text-xs font-bold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  min.
                </span>
              </div>
              <div className="mx-0.5 text-center text-xs font-semibold text-white">
                :
              </div>
              <div className="flex w-6 flex-shrink-0 flex-col items-center justify-center text-center">
                <Countdown
                  value={seconds}
                  className="days-value text-xs font-bold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  sec.
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
