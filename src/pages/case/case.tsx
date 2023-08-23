import BoxCard from '@/components/boxCard';
import { getBoxListUsingGET } from '@/services/front/kaixiangxiangguan';
import { useRequest } from '@umijs/max';

export default function Case() {
  const { data: boxList } = useRequest(() =>
    getBoxListUsingGET({
      boxType: 1,
      moduleId: 5,
    }),
  );
  return (
    <>
      {boxList?.map((t, i) => (
        <div className="mb-8" key={i}>
          <div className="box-title">
            <span className="text-center text-base sm:text-2xl uppercase font-semibold">
              {t.themeName}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {t.boxList?.map((t) => (
              <BoxCard data={t} key={t.id} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
