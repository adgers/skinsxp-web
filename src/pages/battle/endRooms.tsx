import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import { getPageUsingGET } from '@/services/front/duizhanxiangguan';
import { history, useModel, useRequest } from '@umijs/max';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

export default function EndRooms({
  show,
  pageSize = 12,
}: {
  show: boolean;
  pageSize?: number;
}) {
  const { battleState } = useModel('socket');
  const [rooms, setRooms] = useState<API.BattleVo[]>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const {
    data: endBattles,
    refresh,
  } = useRequest(() => show && getPageUsingGET({ pageSize, page, state: 2 }), {
    refreshDeps: [show, page],
    cacheKey: 'endBattle',
  });

  useEffect(() => {
    if (!show) {
      return;
    }

    if (endBattles && endBattles?.pageData) {
      setRooms(endBattles.pageData);
      setTotal(endBattles.totalRows || 0);
    }
    if (battleState) {
      if (battleState.state === 2) {
        refresh();
      }
    }
  }, [endBattles, battleState, show]);

  return (
    <div className="flex-1 min-h-[500px] items-center flex flex-col w-full relative">
      {rooms?.length === 0 && <Empty />}
      {/* {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
          <LotterLoading />
        </div>
      )} */}
      <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {rooms?.map((t) => (
          <RoomCard
            key={t.battleCode}
            data={t}
            onSelect={() => {
              history.push(`/battle/${t.battleCode}`);
            }}
          />
        ))}
      </div>
      {total > pageSize && (
        <div className="flex justify-center items-center mt-8">
          <Pagination
            current={page}
            total={total}
            pageSize={12}
            showSizeChanger={false}
            onChange={(page: number) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
}
