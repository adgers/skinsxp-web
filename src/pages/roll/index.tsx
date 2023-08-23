import Empty from '@/components/empty';
import RollCard from '@/components/rollCard';
import { pageUsingGET } from '@/services/front/ROLLfangxiangguan';
import { FormattedMessage, Link, useRequest } from '@umijs/max';
import { Pagination, Skeleton } from 'antd';
import { useMemo, useState } from 'react';
import './index.less';

export default function RollList() {
  const [roomState, setRoomState] = useState(1);
  const [roomType, setRoomType] = useState(1);

  const pageSize = 9;
  const [page, setPage] = useState(1);
  const { data, loading } = useRequest(
    () => pageUsingGET({ state: roomState, page, pageSize, type: roomType }),
    {
      refreshDeps: [page, roomState, roomType],
    },
  );

  const roomTypes = useMemo(() => {
    return [
      { label: <FormattedMessage id="roll_room_gftj" />, value: 1 },
      { label: <FormattedMessage id="roll_room_zbfl" />, value: 2 },
      { label: <FormattedMessage id="roll_room_wcyd" />, value: 0 },
    ];
  }, []);

  const roomStates = useMemo(() => {
    return [
      { label: <FormattedMessage id="roll_recommand_jxz" />, value: 1 },
      { label: <FormattedMessage id="roll_recommand_yjs" />, value: 2 },
    ];
  }, []);

  return (
    <div className="max-w-[1400px] m-auto px-3">
      <div className="flex flex-col items-center">
        <div className="custom-tab w-full sm:w-[700px] flex justify-evenly">
          {roomTypes.map((item, i) => (
            <div
              className={`tab-item ${
                roomType === item.value ? 'tab-active' : ''
              }`}
              key={i}
              onClick={() => setRoomType(item.value)}
            >
              <span className="tab-item-c">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="join my-4 sm:my-6 text-sm">
          {roomStates.map((item, i) => (
            <div
              className={`join-item text-center border border-transparent cursor-pointer rounded-md px-4 py-1 outline-none ${
                roomState === item.value
                  ? 'bg-primary text-black'
                  : 'border-white'
              }`}
              key={i}
              onClick={() => setRoomState(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      {!loading && data?.pageData?.length === 0 && <Empty />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 1 }).map((item, i) => (
              <Skeleton
                loading={loading}
                active
                paragraph={false}
                key={i}
                title={{
                  style: {
                    height: '220px',
                  },
                }}
                className="rounded-xl overflow-hidden"
              ></Skeleton>
            ))
          : data?.pageData?.map((item, i) => (
              <Link to={`/roll/${item.id}`} key={i}>
                <RollCard key={i} data={item} />
              </Link>
            ))}
      </div>
      {!loading && !!data?.totalRows && data?.totalRows > pageSize && (
        <div className="flex justify-center items-center mt-4">
          <Pagination
            current={page}
            total={data?.totalRows}
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
