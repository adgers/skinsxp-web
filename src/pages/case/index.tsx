import { getBoxListUsingGET } from '@/services/front/kaixiangxiangguan';
import { useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import Case from './case';
import Giveaways from './giveaways';
import './index.less';
import TopCase from './topCase';

export default function Home() {
  const [discountBox, setDiscountBox] = useState<API.BoxThemeListVo[]>([]);
  const search = location.search;
  // const [styles, setStyles] = useState({});

  const { data: boxList = [] } = useRequest(
    () =>
      getBoxListUsingGET({
        boxType: 1,
        moduleId: 5,
      }),
    {
      cacheKey: 'boxList',
    },
  );
  useEffect(() => {
    if (boxList?.length > 0) {
       // 推荐箱子
      setDiscountBox(boxList.slice(0, 1));
    }
  }, [boxList]);
  return (
    <>
       {/*<Banner /> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 translate-y-[-40px]">
        {discountBox[0]?.boxList?.map((v, idx) => (
          <TopCase v={v} key={idx} />
        ))}
      </div>
      <Giveaways />
      <Case boxList={boxList} />
    </>
  );
}
