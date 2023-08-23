import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import { getCurrentPageUsingGET } from '@/services/front/duizhanxiangguan';
import { history, useModel, useRequest } from '@umijs/max';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';

export default function CurrentRooms({ show }: { show: boolean }) {
  const { battleRoomCreate, battleState } = useModel('socket');
  const [rooms, setRooms] = useState<API.BattleVo[]>();
  const [pageSize, setPageSize] = useState(12);

  const {
    data: currentBattles,
    refresh,
    loading,
  } = useRequest(
    () =>
      show &&
      getCurrentPageUsingGET({
        pageSize,
      }),
    {
      refreshDeps: [show, pageSize],
      cacheKey: 'currentBattle',
    },
  );

  const loadMore = () => {
    setPageSize((prev) => prev + 12);
  };

  useEffect(() => {
    if (currentBattles?.pageData) {
      setRooms(currentBattles.pageData);
    }
  }, [currentBattles]);

  useEffect(() => {
    if (battleRoomCreate) {
      setRooms((prevRooms) => [battleRoomCreate, ...(prevRooms || [])]);
    }
  }, [battleRoomCreate]);

  useEffect(() => {
    if (!battleState || !show) {
      return;
    }

    if (battleState?.state === 2) {
      refresh();
    } else {
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
      {rooms && rooms?.length > 0 && (
        <div className="flex items-center mt-4">
          <Button className="btn btn-sm" loading={loading} onClick={loadMore}>
            load more
          </Button>
        </div>
      )}
    </div>
  );
}
