import { IconFont } from '@/components/icons';
import TopCard from '@/components/weaponCard/topCard';
import { Link, useModel } from '@umijs/max';

export default function OpenHistory() {
  const { recentBox, setIsTop, isTop } = useModel('socket');

  return (
    <div className="w-full open-history bg-dark overflow-hidden flex">
      <div className="flex flex-col self-stretch overflow-hidden flex-shrink-0 mx-1">
        <div
          className={`flex flex-1 flex-col items-center justify-center px-2 md:px-0 gap-1 bg-neutral cursor-pointer ${
            isTop ? 'text-green' : 'bg-opacity-50 text-gray'
          }`}
          onClick={() => {
            setIsTop(true);
          }}
        >
          <IconFont type="icon-a-bestdrop" className='text-xs md:text-base'/>
          <span className="whitespace-nowrap text-center text-xs transform scale-75 font-semibold uppercase leading-none hidden md:block">
            best drop
          </span>
        </div>
        <div
          className={`flex flex-1 flex-col items-center justify-center px-2 md:px-0 gap-1 bg-neutral cursor-pointer ${
            !isTop ? 'text-green' : 'bg-opacity-50'
          }`}
          onClick={() => {
            setIsTop(false);
          }}
        >
          <IconFont type="icon-a-alldrop" className='text-xs md:text-base'/>
          <span className="whitespace-nowrap text-center text-xs transform scale-75 font-semibold uppercase leading-none hidden md:block">
            all drop
          </span>
        </div>
      </div>
      <div className="flex gap-[5px]">
        {recentBox.length > 0
          ? recentBox?.map((item) => (
              <Link
                className="will-change-transform top-wrapper"
                key={item.id}
                to={`/case/${item.boxId}`}
              >
                <TopCard data={item} />
              </Link>
            ))
          : Array.from({ length: 20 }).map((_, i) => (
              <div className="flex-shrink-0" key={i}>
                <TopCard loading />
              </div>
            ))}
      </div>
    </div>
  );
}
