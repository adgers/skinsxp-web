import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import { getPageUsingGET } from '@/services/front/duizhanxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useRequest } from '@umijs/max';
import { Pagination, Spin } from 'antd';
import { useState } from 'react';
import BoxDetail from './boxDetail';

export default function EndRooms({
  show,
  mode,
  pageSize = 12,
}: {
  show: boolean;
  mode: number;
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const [boxDetailShow, setBoxDetailShow] = useState(false);
  const [caseId, setCaseId] = useState(0);
  const [caseName, setCaseName] = useState('');

  const { data: endBattles, loading } = useRequest(
    () => show && getPageUsingGET({ pageSize, page, state: 2, mode }),
    {
      refreshDeps: [show, page, mode],
      cacheKey: 'endBattle',
    },
  );

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
    >
      <div className="flex-1 items-center flex flex-col w-full relative min-h-[300px]">
        {endBattles?.pageData?.length === 0 && <Empty />}
        <div className="w-full flex flex-col gap-2">
          {endBattles?.pageData?.map((t) => (
            <RoomCard
              key={t.battleCode}
              data={t}
              onSelect={() => {
                history.push({
                  pathname: `/battle/${t.battleCode}`,
                  search: location.search || '',
                });
              }}
              onBoxSelect={(item) => {
                setCaseId(item.caseId);
                setCaseName(item.boxName);
                setBoxDetailShow(true);
              }}
            />
          ))}
        </div>
        {!!endBattles?.totalRows && endBattles?.totalRows > pageSize && (
          <div className="flex justify-center items-center mt-8">
            <Pagination
              current={page}
              total={endBattles.totalRows}
              pageSize={12}
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
