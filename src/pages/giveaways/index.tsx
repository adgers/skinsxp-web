import Empty from '@/components/empty';
import RollCard from '@/components/rollCard';
import { pageUsingGET } from '@/services/front/ROLLfangxiangguan';
import { FormattedMessage, useRequest } from '@umijs/max';
import { Pagination, Skeleton } from 'antd';
import { useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import './index.less';

export default function RollList() {
  const [roomState, setRoomState] = useState(1);
  const [roomType, setRoomType] = useState(1);

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data, loading } = useRequest(
    () => pageUsingGET({ state: roomState, page, pageSize, type: roomType }),
    {
      refreshDeps: [page, roomState, roomType],
      cacheKey: 'rollList',
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
      <div className="flex flex-col w-full overflow-hidden">
        <div className="my-2 sm:my-4 flex w-full justify-center sm:justify-start border-b border-light relative h-[68px] font-semibold">
          <div className="flex items-center">
            {roomTypes.map((t) => {
              const selected = t.value === roomType;
              return (
                <div
                  className={`cursor-pointer px-4 text-base uppercase leading-none h-full inline-flex gap-1 items-center transition-colors duration-200 hover:text-green border-b ${
                    selected
                      ? 'border-green text-green'
                      : 'text-white border-transparent'
                  }`}
                  key={t.value}
                  onClick={() => {
                    // setFilter(t.key);
                    setRoomType(t.value);
                  }}
                >
                  {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center mb-2 sm:mb-4 sm:justify-start">
        {roomStates.map((item, i) => (
          <Button
            className={`flex items-center gap-2 whitespace-nowrap p-2 text-sm font-bold uppercase bg-transparent duration-200 border-none hover:bg-transparent hover:text-white 
            text-white ${roomState === item.value ? '' : 'text-opacity-50'}`}
            key={i}
            onClick={() => setRoomState(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {!loading && data?.pageData?.length === 0 && <Empty />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {loading
          ? Array.from({ length: 5 }).map((item, i) => (
              <Skeleton
                loading={loading}
                active
                paragraph={false}
                key={i}
                title={{
                  style: {
                    height: '320px',
                  },
                }}
                className="rounded-none overflow-hidden"
              ></Skeleton>
            ))
          : data?.pageData?.map((item, i) => <RollCard key={i} data={item} />)}
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
