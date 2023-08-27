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
      icon: <IconFont type="icon-zhandou" />,
    },
    {
      name: <FormattedMessage id="arena_dzls" />,
      key: 'end',
      icon: <IconFont type="icon-zhandou" />,
    },
    {
      name: <FormattedMessage id="arena_wcyd" />,
      key: 'my',
      icon: <IconFont type="icon-zhandou" />,
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
                  className={`cursor-pointer px-4 text-base uppercase leading-none h-full inline-flex gap-1 items-center transition-colors duration-200 hover:text-green border-b ${
                    selected
                      ? 'border-green text-green'
                      : 'text-white border-transparent'
                  }`}
                  key={t.key}
                  onClick={() => {
                    setFilter(t.key);
                  }}
                >
                  {t.icon}
                  {t.name}
                </div>
              );
            })}
          </div>

          <div className="hidden sm:block absolute right-0 bottom-5">
            <Link className="btn-purple" to={`/battle/create`}>
              <IconFont type="icon-zhandou" />
              <FormattedMessage id="arena_cjfy" />
            </Link>
          </div>
        </div>

        <Link className="sm:hidden btn-purple mb-4" to={`/battle/create`}>
          <IconFont type="icon-zhandou" />
          <FormattedMessage id="arena_cjfy" />
        </Link>
        <div className="flex w-full items-center justify-end mb-4">
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

      <div className="w-[330px] flex-shrink-0" ref={rankRef}>
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
            <div className="font-num mt-2">{topOneYesterday?.rewardPoint}</div>
          </div>
        </div>
        <div className="battle-ranks mt-3 sm:mt-5 bg-base-content rounded-md">
          <div className="custom-tab flex w-full justify-center gap-6 mt-2">
            <div
              className={`tab-item text-sm ${
                recordTab === 0 ? 'tab-active text-[#FFD284]' : ''
              }`}
              onClick={() => setRecordTab(0)}
            >
              <span className="tab-item-c">
                <FormattedMessage id="today_rank" />
              </span>
            </div>
            <div
              className={`tab-item text-sm ${
                recordTab === 1 ? 'tab-active text-[#FFD284]' : ''
              }`}
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
                <div className="text-center text-opacity-50 text-sm">
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
                        <span className="transform scale-75 font-num font-semibold">
                          {i + 1}
                        </span>
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
    </div>
  );
}
