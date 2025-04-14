import { IconFont } from '@/components/icons';
import { listHostGiveawayUsingGET } from '@/services/front/ROLLfangxiangguan';
import { FormattedMessage, Link, useRequest } from '@umijs/max';
import GiveawayItem from './giveawayItem';
import './index.less';

export default function Giveaways() {
  const { data: giveawayList } = useRequest(() => listHostGiveawayUsingGET(), {
    cacheKey: 'giveawayList',
  });

  return (
    <div className="w-full relative mx-auto max-w-screen-xxl overflow-hidden md:px-5">
      <div className="relative flex h-full">
        <div className="w-full overflow-hidden">
          <div className="flex w-full snap-x snap-mandatory overflow-x-auto hide-scrollbar opacity-100 gap-4">
            {giveawayList?.map((item, index) => {
              return <GiveawayItem index={index} item={item} key={index} />;
            })}
          </div>
        </div>
        <div className="flex h-40 sm:h-44 w-8 flex-shrink-0 flex-col items-center justify-center bg-black text-center text-xs font-semibold leading-tight md:w-60 md:ml-4  xl:text-sm">

          <IconFont type="icon-giveaway2" className="text-gray text-[36px] hidden md:block" />
          <div className="hidden md:flex mt-3 gap-1">
            <span className=" uppercase text-white ">
              <FormattedMessage id="text_normal_new" />

            </span>
            <span className="uppercase text-green">
              <FormattedMessage id="roll_room_title" />

            </span>
          </div>
          <span className="inline-block -rotate-90 transform text-white md:hidden whitespace-nowrap">
            <FormattedMessage id="roll_room_title" />

          </span>
          <Link
            className="btn btn-green btn-sm mt-4 !hidden h-7 bg-purple px-2 text-[10px] text-white  md:!flex xl:px-3"
            to="/giveaways"
          >
            <span className="uppercase">
              <FormattedMessage id={'roll_ljcy'} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
