import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import { useRequest } from '@umijs/max';
import GiveawayItem from './giveawayItem';

export default function Giveaways() {
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET());
  console.log('giveawayList', giveawayList);

  return (
    <div className="w-full relative mx-auto max-w-screen-xxl overflow-hidden md:px-5">
      <div className="relative flex h-full">
        <div className="flex h-36 w-8 flex-shrink-0 flex-col items-center justify-center bg-navy-700/60 text-center text-xs font-semibold leading-tight md:w-32 md:rounded-tl-xl xl:text-sm">
          <span className="hidden uppercase text-[#FFDDA6] md:block">NEW</span>
          <span className="hidden uppercase text-white md:inline-block">
            Giveaways
          </span>
          <span className="inline-block -rotate-90 transform text-white md:hidden">
            Giveaways
          </span>
          <a
            className="btn btn-sm mt-4 hidden h-7 bg-purple px-2 text-[10px] text-white  md:flex xl:px-3"
            href="/battle"
          >
            <span className="uppercase">Join now</span>
          </a>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-full snap-x snap-mandatory overflow-x-auto xl:grid xl:snap-none xl:grid-cols-5 opacity-100">
            {giveawayList?.map((item, index) => {
              return <GiveawayItem index={index} item={item} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
