import { IconFont } from '@/components/icons';
import { FormattedMessage, Link, useModel } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import CurrentRooms from './currentRooms';
import EndRooms from './endRooms';
import './index.less';
import MyRooms from './myRooms';

export default function BattlePage() {
  const filters = [
    {
      name: <FormattedMessage id="arena_gftj" />,
      key: 'in',
      // icon: <IconFont type="icon-battle" />,
    },
    {
      name: <FormattedMessage id="arena_dzls" />,
      key: 'end',
      // icon: <IconFont type="icon-battle" />,
    },
    {
      name: <FormattedMessage id="arena_wcyd" />,
      key: 'my',
      // icon: <IconFont type="icon-battle" />,
    },
  ];

  const modfilters = [
    {
      name: 'all',
      key: -1,
    },
    {
      name: <FormattedMessage id="room_mode_oh" />,
      key: 0,
    },
    {
      name: <FormattedMessage id="room_mode_fq" />,
      key: 1,
    },
  ];

  const [filter, setFilter] = useState<string>('in');
  const [modFilter, setModFilter] = useState<number>(-1);

  const [recordTab, setRecordTab] = useState(0);
  const [rank, setRank] = useState<API.BattleRankVo[]>([]);
  const rankRef = useRef<HTMLDivElement>(null);
  const { battleRank } = useModel('socket');

  const { topOneYesterday, todayRank, myReward, yesterdayRank } =
    battleRank || {};

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
    <div className="flex mt-2 sm:mt-4 gap-2 sm:gap-5 flex-col lg:flex-row w-full p-3">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="my-4 flex w-full justify-center sm:justify-start border-b border-light relative h-[68px]">
          <div className="flex items-center">
            {filters.map((t) => {
              const selected = t.key === filter;
              return (
                <div
                  className={`cursor-pointer font-semibold px-4 text-base uppercase leading-none h-full inline-flex gap-1 items-center transition-colors duration-200 hover:text-green border-b ${
                    selected
                      ? 'border-green text-green'
                      : 'text-white border-transparent'
                  }`}
                  key={t.key}
                  onClick={() => {
                    setFilter(t.key);
                  }}
                >
                  {t.name}
                </div>
              );
            })}
          </div>

          <div className="hidden sm:block absolute right-0 bottom-5">
            <Link className="btn-purple" to={`/battle/create`}>
              <IconFont type="icon-battle" className="text-lg" />
              Create case battle
            </Link>
          </div>
        </div>

        <Link className="sm:hidden btn-purple mb-4" to={`/battle/create`}>
          <IconFont type="icon-battle" className="text-lg" />
          Create case battle
        </Link>
        <div className="flex w-full items-center justify-center sm:justify-end mb-4">
          {modfilters.map((t) => {
            const selected = t.key === modFilter;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setModFilter(t.key);
                }}
                className={`flex items-center gap-2 whitespace-nowrap p-2 text-sm uppercase transition-colors duration-200 hover:text-white 
                 ${selected ? 'text-white' : 'text-white text-opacity-50'}`}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        <div className="h-14 hidden lg:flex gap-2 items-center bg-black text-center mb-2 p-4">
          <div className="w-24 text-xs font-semibold uppercase text-white text-opacity-50">
            Rounds
          </div>
          <div className="text-xs font-semibold uppercase text-white text-opacity-50 flex-1">
            Cases
          </div>
          <div className="w-28 text-xs font-semibold uppercase text-white text-opacity-50">
            Value
          </div>
          <div className="w-48 text-xs font-semibold uppercase text-white text-opacity-50">
            Players
          </div>
          <div className="w-72 text-xs font-semibold uppercase text-white text-opacity-50">
            Status
          </div>
        </div>

        {filter === 'in' && (
          <CurrentRooms show={filter === 'in'} mode={modFilter} />
        )}
        {filter === 'my' && <MyRooms show={filter === 'my'} mode={modFilter} />}
        {filter === 'end' && (
          <EndRooms show={filter === 'end'} mode={modFilter} />
        )}
      </div>

      <div className="w-[280px] flex-shrink-0" ref={rankRef}>
        <div className="battle-rank-point relative rounded-md">
          <div className="top-[70px] flex items-center flex-col w-full absolute z-10">
            <div className="relative w-[80px] h-[80px]">
              <img src={topOneYesterday?.headPic} className="rounded-full" />
            </div>
            <div className="mt-2">{topOneYesterday?.nickname}</div>
            <div className="font-num mt-2 text-green">
              {topOneYesterday?.rewardPoint}
            </div>
            <div className="bg-black h-9 mt-6 uppercase text-xs flex justify-between w-full items-center px-2">
              <div>
                <IconFont type="icon-ranking" className="text-purple mr-2" />
                <FormattedMessage id="arena_my_reward_point" />
              </div>
              <span className="font-num text-purple">
                {myReward?.rewardPoint || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="battle-ranks mt-3 sm:mt-5 bg-black">
          <div className="grid grid-cols-2 w-full  mt-2">
            <div
              className={`h-9 text-sm  ${
                recordTab === 0 ? 'btn-green !rounded-none' : 'btn-light '
              }`}
              onClick={() => setRecordTab(0)}
            >
              <FormattedMessage id="today_rank" />
            </div>
            <div
              className={`h-9 text-sm  ${
                recordTab === 1 ? 'btn-green !rounded-none' : 'btn-light '
              }`}
              onClick={() => setRecordTab(1)}
            >
              <FormattedMessage id="yesterday_rank" />
            </div>
          </div>

          <div className="flex flex-col mt-1">
            <div className="flex h-full flex-col min-h-[400px]">
              {rank?.length === 0 && (
                <div className="text-center text-opacity-50 text-sm">
                  No data
                </div>
              )}
              {rank?.length > 0 &&
                rank.map((user, i: number) => {
                  return (
                    <div
                      className={`flex w-full items-center gap-3 text-sm ${
                        i < 3 ? `bgm-rank${i + 1} bgm-rank` : 'bgm-rank'
                      }`}
                      key={i}
                    >
                      <div className="font-num font-semibold text-white rank-num w-8 h-8 flex items-center justify-center ">
                        {i + 1}
                      </div>
                      <div className="relative">
                        <img
                          src={user.headPic}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="w-28 truncate" title={user.nickname}>
                        {user.nickname}
                      </div>
                      <div className="text-xs text-green font-num "></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
