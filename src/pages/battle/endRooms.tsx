import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import { getPageUsingGET } from '@/services/front/duizhanxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useModel, useRequest } from '@umijs/max';
import { Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';

export default function EndRooms({
  show,
  mode,
  pageSize = 12,
}: {
  show: boolean;
  mode: number;
  pageSize?: number;
}) {
  const { battleState } = useModel('socket');
  const [rooms, setRooms] = useState<API.BattleVo[]>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const {
    data: endBattles,
    refresh,
    loading,
  } = useRequest(
    () => show && getPageUsingGET({ pageSize, page, state: 2, mode }),
    {
      refreshDeps: [show, page, mode],
      cacheKey: 'endBattle',
    },
  );

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
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
    >
      <div className="flex-1 items-center flex flex-col w-full relative min-h-[300px]" >
        {rooms?.length === 0 && <Empty />}
        <div className="w-full flex flex-col gap-2">
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
    </Spin>
  );
}
