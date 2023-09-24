import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import { FormattedMessage, useRequest } from '@umijs/max';
import GiveawayItem from './giveawayItem';

export default function Giveaways() {
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET(), {
    cacheKey: 'giveawayList',
  });

  return (
    <div className="w-full relative mx-auto max-w-screen-xxl overflow-hidden md:px-5">
      <div className="relative flex h-full">
        <div className="flex h-28 sm:h-36 w-8 flex-shrink-0 flex-col items-center justify-center bg-black text-center text-xs font-semibold leading-tight md:w-32 md:rounded-tl-xl xl:text-sm">
          <span className="hidden uppercase text-[#FFDDA6] md:block">
            <FormattedMessage id="text_normal_new" />
          </span>
          <span className="hidden uppercase text-white md:inline-block">
            <FormattedMessage id="roll_room_title" />
          </span>
          <span className="inline-block -rotate-90 transform text-white md:hidden whitespace-nowrap">
            <FormattedMessage id="roll_room_title" />
          </span>
          <a
            className="btn btn-sm mt-4 hidden h-7 bg-purple px-2 text-[10px] text-white  md:flex xl:px-3"
            href="/giveaways"
          >
            <span className="uppercase">
              <FormattedMessage id={'roll_ljcy'} />
            </span>
          </a>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-full snap-x snap-mandatory overflow-x-auto xl:grid xl:snap-none xl:grid-cols-4 opacity-100 gap-1">
            {giveawayList?.map((item, index) => {
              return <GiveawayItem index={index} item={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
