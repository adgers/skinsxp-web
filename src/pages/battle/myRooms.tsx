import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import { getMyPageUsingGET } from '@/services/front/duizhanxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useModel, useRequest } from '@umijs/max';
import { Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';
import BoxDetail from './boxDetail';

export default function MyRooms({
  show,
  pageSize = 12,
  mode,
}: {
  show: boolean;
  mode: number;
  pageSize?: number;
}) {
  const { battleState } = useModel('socket');
  const [rooms, setRooms] = useState<API.BattleVo[]>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [boxDetailShow, setBoxDetailShow] = useState(false);
  const [caseId, setCaseId] = useState(0);
  const [caseName, setCaseName] = useState('');

  const { data: myBattles, loading } = useRequest(
    () =>
      show &&
      getMyPageUsingGET({
        pageSize,
        page,
        mode,
      }),
    {
      refreshDeps: [show, page, mode],
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
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
    >
      <div className="flex-1 min-h-[500px] items-center flex flex-col w-full relative">
        {rooms?.length === 0 && <Empty />}
        <div className="w-full flex flex-col gap-2">
          {rooms?.map((t) => (
            <RoomCard
              key={t.battleCode}
              data={t}
              onSelect={() => {
                history.push({
                  pathname: `/battle/${t.battleCode}`,
                  search: location.search || '',
                });
              }}
              showTag
              onBoxSelect={(item) => {
                setCaseId(item.caseId);
                setCaseName(item.boxName);
                setBoxDetailShow(true);
              }}
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
        <BoxDetail
          caseId={caseId}
          caseName={caseName}
          show={boxDetailShow}
          onClose={() => {
            setBoxDetailShow(false);
          }}
        />
      </div>
    </Spin>
  );
}
