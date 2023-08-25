import { sysNoticeUsingGET } from '@/services/common/tongyongxiangguan';
import { useRequest } from '@umijs/max';
import Marquee from 'react-fast-marquee';

export default function Placard() {
  const { data = [] } = useRequest(() => sysNoticeUsingGET({ topN: 10 }));
  return (
    <>
      {data?.length > 0 && (
        <div className="h-8bg-dark bg-opacity-50 flex justify-center z-20">
          <div className="max-w-8xl px-3 sm:px-0 w-full m-auto text-white text-sm relative">
            <Marquee speed={40} pauseOnHover={true}>
              {data?.map((t,i) => (
                <div className="cursor-pointer mr-40" key={i}>{t.content}</div>
              ))}
            </Marquee>
            <div className="placard-icon absolute right-3 sm:right-0 top-0 z-20"></div>
          </div>
        </div>
      )}
    </>
  );
}
