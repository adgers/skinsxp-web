import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import { getMyPageUsingGET } from '@/services/front/duizhanxiangguan';
import { history, useModel, useRequest } from '@umijs/max';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

export default function MyRooms({
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

  const { data: myBattles } = useRequest(
    () =>
      show &&
      getMyPageUsingGET({
        pageSize,
        page,
      }),
    {
      refreshDeps: [show, page],
      cacheKey: 'myBattle',
    },
  );

  useEffect(() => {
    if (myBattles && myBattles.pageData) {
      setRooms(myBattles.pageData);
      setTotal(myBattles.totalRows || 0);
    }
  }, [myBattles]);

  useEffect(() => {
    if (battleState && show) {
      setRooms((prevRooms) =>
        prevRooms?.map((t) => {
          if (t.battleCode === battleState.battleCode) {
            return {
              ...t,
              state: battleState.state,
              customerList: battleState.customerList,
            };
          }
          return t;
        }),
      );
    }
  }, [battleState, show]);

  return (
    <div className="flex-1 min-h-[500px]  items-center flex flex-col w-full relative">
      {rooms?.length === 0 && <Empty />}
      <div className="w-full flex flex-col gap-2">
        {rooms?.map((t) => (
          <RoomCard
            key={t.battleCode}
            data={t}
            onSelect={() => {
              history.push(`/battle/${t.battleCode}`);
            }}
            showTag
          />
        ))}
      </div>
      {total > pageSize && (
        <div className="flex justify-center items-center mt-8">
          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
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
