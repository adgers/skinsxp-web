import { IconFont } from '@/components/icons';
import {
  boxGiftListUsingGET,
  boxPageUsingGET,
} from '@/services/front/kaixiangxiangguan';
import { FormattedMessage, Link, useModel, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import BoxDetail from './boxDetail';
import CreateRoom from './createRoom';
import CurrentRooms from './currentRooms';
import EndRooms from './endRooms';
import './index.less';
import MyRooms from './myRooms';

export default function BattlePage() {
  const filters = [
    {
      name: <FormattedMessage id="arena_gftj" />,
      key: 'in',
    },
    {
      name: <FormattedMessage id="arena_wcyd" />,
      key: 'my',
    },
    {
      name: <FormattedMessage id="arena_dzls" />,
      key: 'end',
    },
  ];

  const [filter, setFilter] = useState<string>('in');
  const [boxDetail, setBoxDetail] = useState<{
    boxName: string;
    boxGiftVo: any;
    gradeGiftProb: any;
  }>();
  const [boxDetailShow, setBoxDetailShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);
  const [recordTab, setRecordTab] = useState(0);
  const [rank, setRank] = useState<API.BattleRankVo[]>([]);
  const rankRef = useRef<HTMLDivElement>(null);
  const { battleRank } = useModel('socket');

  const battleBoxs = useRequest(
    () =>
      boxPageUsingGET({
        boxType: 1,
        moduleId: -1,
        page: 1,
        pageSize: 1000,
        visibleRoom: true,
      }),
    {
      cacheKey: 'battleBoxs',
    },
  );

  const { topOneYesterday, todayRank, myReward, yesterdayRank } =
    battleRank || {};

  const showBoxDetail = async (box: any) => {
    const ret = await boxGiftListUsingGET({ boxId: box.id });
    if (ret.status === 0) {
      setBoxDetail({
        boxName: box.boxName,
        boxGiftVo: ret?.data?.boxGiftVo,
        gradeGiftProb: ret.data?.gradeGiftProb,
      });
      setBoxDetailShow(true);
    }
  };

  const onCreateRoom = async () => {
    if (!battleBoxs?.data?.pageData) {
      await battleBoxs.refresh();
    }

    setCreateShow(true);
  };

  useEffect(() => {
    if (battleRank) {
      if (recordTab === 0) {
        setRank(todayRank || []);
      } else {
        setRank(yesterdayRank || []);
      }
    }
  }, [battleRank, recordTab]);

  return (
    <div className="px-3">
      <div className="flex flex-col gap-2 sm:gap-4 bg-base-100">
        {battleBoxs?.data?.pageData && (
          <div className="flex gap-1 sm:gap-2 snap-x snap-mandatory overflow-x-auto hide-scrollbar">
            {battleBoxs.data.pageData.map((t) => (
              <div
                className="flex flex-col items-center gap-1 px-2 py-1 sm:py-2 cursor-pointer"
                key={t.id}
                onClick={() => showBoxDetail(t)}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center">
                  <img src={t.boxImage} className="w-full h-full" />
                </div>
                <div className="flex font-num items-center gap-1">
                  <IconFont type="icon-coin" className="text-sm" />
                  {t.openPrice}
                </div>
                <div className="tooltip" data-tip={t.boxName}>
                  <div className="text-xs truncate text-white text-opacity-80 w-20 text-center">
                    {t.boxName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <BoxDetail
          boxInfo={boxDetail}
          show={boxDetailShow}
          onClose={() => {
            setBoxDetailShow(false);
          }}
        />
      </div>
      <div className="my-3 flex lg:items-center relative flex-col">
        <CreateRoom
          show={createShow}
          onClose={() => setCreateShow(false)}
          battleBoxs={battleBoxs?.data?.pageData}
        />
        <div className="gap-4 items-center lg:absolute right-0 top-2 flex w-full sm:w-auto px-3 lg:px-0 justify-between flex-row-reverse lg:flex-row">
          <Link
            className="link text-sm link-secondary uppercase"
            to="/user/docs"
            target="_blank"
          >
            <FormattedMessage id="arena_yxgz" />
          </Link>
          <div className="flex gap-2">
            <div className="btn-primary-fill !btn-sm" onClick={onCreateRoom}>
              <FormattedMessage id="arena_cjfy" />
              <IconFont type="icon-zhandou" className="text-primary" />
            </div>
            <div
              className="btn-secondary-fill !btn-sm sm:hidden"
              onClick={() =>
                rankRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }
            >
              <FormattedMessage id="arena_phb" />
              <IconFont type="icon-battle" />
            </div>
          </div>
        </div>
        <div className="custom-tab w-full flex lg:w-[700px] justify-evenly">
          {filters.map((t) => {
            const selected = t.key === filter;
            return (
              <div
                className={`tab-item ${selected ? 'tab-active' : ''}`}
                key={t.key}
                onClick={() => {
                  setFilter(t.key);
                }}
              >
                <span className="tab-item-c">{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex mt-2 sm:mt-4 gap-2 sm:gap-5 flex-col-reverse lg:flex-row items-center sm:items-start">
        <div className="w-[330px]" ref={rankRef}>
          <div className="battle-rank-point relative rounded-md">
            <div className="battle-rank-ring animate-spin-slow"></div>
            <div className="top-[150px] flex items-center flex-col w-full absolute z-10">
              <div className="relative w-[96px] h-[96px] rounded">
                <img src={topOneYesterday?.headPic} />
                <img
                  src={topOneYesterday?.headGround}
                  className="absolute left-0 top-0 w-full h-full"
                />
              </div>
              <div className="mt-2">{topOneYesterday?.nickname}</div>
              <div className="font-num mt-2">
                {topOneYesterday?.rewardPoint}
              </div>
            </div>
          </div>
          <div className="battle-ranks mt-3 sm:mt-5 bg-base-content rounded-md">
            <div className="custom-tab flex w-full justify-center gap-6 mt-2">
              <div
                className={`tab-item text-sm ${recordTab === 0 ? 'tab-active text-[#FFD284]' : ''}`}
                onClick={() => setRecordTab(0)}
              >
                <span className="tab-item-c">
                  <FormattedMessage id="today_rank" />
                </span>
              </div>
              <div
                className={`tab-item text-sm ${recordTab === 1 ? 'tab-active text-[#FFD284]' : ''}`}
                onClick={() => setRecordTab(1)}
              >
                <span className="tab-item-c">
                  <FormattedMessage id="yesterday_rank" />
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex h-full flex-col min-h-[400px]">
                {rank?.length === 0 && (
                  <div className="text-center text-base-content text-opacity-50 text-sm">
                    No data
                  </div>
                )}
                {rank?.length > 0 &&
                  rank.map((user, i: number) => {
                    return (
                      <div
                        className={`flex w-full items-center gap-2 text-sm ${
                          i < 3 ? `bgm-rank${i + 1} bgm-rank` : 'bgm-rank'
                        }`}
                        key={i}
                      >
                        <div className="bgm-star">
                          <span className='transform scale-75 font-num font-semibold'>{i + 1}</span>
                        </div>
                        <div className="relative">
                          <img src={user.headPic} className="w-8 h-8 rounded" />
                          <img
                            src={user.headGround}
                            className="absolute left-0 top-0 w-full h-full"
                          />
                        </div>

                        <div className="w-24 truncate" title={user.nickname}>
                          {user.nickname}
                        </div>
                        <div className="text-xs">
                          <span className="text-base-content text-opacity-50 uppercase">
                            <FormattedMessage id="arena_battle_score" />：
                          </span>
                          <span className="font-num">{user.rewardPoint}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="my-rank">
                <FormattedMessage id="arena_my_reward_point" />：
                <span className="font-num align-baseline">
                  {myReward?.rewardPoint || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        {filter === 'in' && <CurrentRooms show={filter === 'in'} />}
        {filter === 'my' && <MyRooms show={filter === 'my'} />}
        {filter === 'end' && <EndRooms show={filter === 'end'} />}
      </div>
    </div>
  );
}
