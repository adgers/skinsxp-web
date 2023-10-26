import { IconFont } from '@/components/icons';
import TopCard from '@/components/weaponCard/topCard';
import { FormattedMessage, Link, useModel } from '@umijs/max';

export default function OpenHistory() {
  const { recentBox, topDropBox, setIsTop, isTop, siteStat } =
    useModel('socket');

  return (
    <div className="w-full open-history bg-dark overflow-hidden flex">
      <div className="flex md:flex-col px-1 md:px-4 items-center justify-center gap-2 md:gap-1">
        <IconFont
          type="icon-a-xinhao11"
          className="text-green text-[16px] md:text-[24px]"
        />
        <div className=" whitespace-nowrap">
          <span className="text-gray text-xs md:text-sm uppercase">
            <FormattedMessage id="site_online" />
          </span>
          <div className="flex md:justify-center items-center gap-1">
            <div className="rounded-full w-[6px] h-[6px] bg-green animate-pulse"></div>{' '}
            {siteStat?.activeSession}
          </div>
        </div>
      </div>
      <div className="flex flex-col self-stretch overflow-hidden flex-shrink-0 mx-1">
        <div
          className={`flex flex-1 flex-col items-center justify-center px-2 md:px-0 gap-1 bg-black cursor-pointer ${
            isTop ? 'text-green' : 'bg-opacity-50 text-gray'
          }`}
          onClick={() => {
            setIsTop(true);
          }}
        >
          <IconFont type="icon-a-bestdrop1" className="text-xs md:text-base" />
          <span className="whitespace-nowrap text-center text-xs transform scale-75 font-semibold uppercase leading-none hidden md:block">
            <FormattedMessage id="best_drop" />
          </span>
        </div>
        <div
          className={`flex flex-1 flex-col items-center justify-center px-2 md:px-0 gap-1 bg-black cursor-pointer ${
            !isTop ? 'text-green' : 'bg-opacity-50'
          }`}
          onClick={() => {
            setIsTop(false);
          }}
        >
          <IconFont type="icon-a-alldrop1" className="text-xs md:text-base" />
          <span className="whitespace-nowrap text-center text-xs transform scale-75 font-semibold uppercase leading-none hidden md:block">
            <FormattedMessage id="all_drop" />
          </span>
        </div>
      </div>
      {isTop ? (
        <div className="flex gap-[5px]">
          {topDropBox.length > 0
            ? topDropBox?.map((item) => {
                let url = `/case/${item.sourceId}`;
                if (item.sourceType === 22) {
                  url = `/upgrade`;
                } else if (item.sourceType === 23) {
                  url = `/battle/${item.sourceName}`;
                }
                return (
                  <Link
                    className="will-change-transform top-wrapper"
                    key={item.id}
                    to={url}
                  >
                    <TopCard data={item} />
                  </Link>
                );
              })
            : Array.from({ length: 20 }).map((_, i) => (
                <div className="flex-shrink-0" key={i}>
                  <TopCard loading />
                </div>
              ))}
        </div>
      ) : (
        <div className="flex gap-[5px]">
          {recentBox.length > 0
            ? recentBox?.map((item) => {
                let url = `/case/${item.sourceId}`;
                if (item.sourceType === 22) {
                  url = `/upgrade`;
                } else if (item.sourceType === 23) {
                  url = `/battle/${item.sourceName}`;
                }
                return (
                  <Link
                    className="will-change-transform top-wrapper"
                    key={item.id}
                    to={url}
                  >
                    <TopCard data={item} />
                  </Link>
                );
              })
            : Array.from({ length: 20 }).map((_, i) => (
                <div className="flex-shrink-0" key={i}>
                  <TopCard loading />
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
