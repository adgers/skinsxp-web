import Empty from '@/components/empty';
import RoomCard from '@/components/roomCard';
import {
  getCurrentPageUsingGET,
  joinBattleUsingPOST,
} from '@/services/front/duizhanxiangguan';
import { isLogin } from '@/utils';
import { LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage, history, useModel, useRequest } from '@umijs/max';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import BoxDetail from './boxDetail';

export default function CurrentRooms({
  show,
  mode,
}: {
  show: boolean;
  mode: number;
}) {
  const { battleRoomCreate, battleState } = useModel('socket');
  const [rooms, setRooms] = useState<API.BattleVo[]>();
  const [pageSize, setPageSize] = useState(12);

  const [boxDetailShow, setBoxDetailShow] = useState(false);
  const [caseId, setCaseId] = useState(0);
  const [caseName, setCaseName] = useState('');

  const {
    data: currentBattles,
    refresh,
    loading,
  } = useRequest(
    () =>
      show &&
      getCurrentPageUsingGET({
        pageSize,
        mode,
      }),
    {
      refreshDeps: [show, pageSize, mode],
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

  const onJoin = async (pos: number, battleCode: string) => {
    const ret = await joinBattleUsingPOST({
      battleCode: battleCode,
      pos,
    });
    if (ret.status === 0) {
      history.push({
        pathname: `/battle/${battleCode}`,
        search: location.search || '',
      });
    }
  };

  return (
    <Spin
      spinning={loading && rooms?.length === 0}
      indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
    >
      <div className="items-center flex flex-col w-full relative min-h-[300px]">
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
              onBoxSelect={(item) => {
                setCaseId(item.caseId);
                setCaseName(item.boxName);
                setBoxDetailShow(true);
              }}
              onJoin={(pos) => {
                if (isLogin()) {
                  onJoin(pos + 1, t.battleCode as string);
                }
              }}
            />
          ))}
        </div>
        {rooms &&
          !!currentBattles?.totalRows &&
          rooms?.length < currentBattles?.totalRows && (
            <div className="flex items-center mt-4">
              <Button
                className="btn btn-sm"
                loading={loading}
                onClick={loadMore}
              >
                <FormattedMessage id="my_package_ckgd" />
              </Button>
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
