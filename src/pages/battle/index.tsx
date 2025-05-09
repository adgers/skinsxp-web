import { IconFont } from '@/components/icons';
import { isLogin } from '@/utils';
import { FormattedMessage, Link, useModel } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import Giveaways from '../case/giveaways';
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
    <>
      <div className="mt-4">
        <Giveaways />
      </div>
      <div className="flex sm:mt-4 gap-2 sm:gap-5 flex-col items-center lg:flex-row lg:items-start w-full px-3">
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

            {isLogin() && (
              <div className="hidden sm:block absolute right-0 bottom-5">
                <Link className="btn-purple" to={`/battle/create`}>
                  <IconFont type="icon-battle" className="text-lg" />
                  <FormattedMessage id="create_case_battle" />
                </Link>
              </div>
            )}
          </div>

          {isLogin() && (
            <Link className="sm:hidden btn-purple mb-2" to={`/battle/create`}>
              <IconFont type="icon-battle" className="text-lg" />
              <FormattedMessage id="create_case_battle" />
            </Link>
          )}
          <div className="flex w-full items-center justify-center sm:justify-end mb-2 sm:mb-4">
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

          <div className="h-14 hidden lg:flex gap-2 items-center bg-black text-center mb-2 p-4 rounded">
            <div className="w-24 text-xs font-semibold uppercase text-white text-opacity-50">
              {/* Rounds */}
              <FormattedMessage id="battle_title_rounds" />
            </div>
            <div className="text-xs font-semibold uppercase text-white text-opacity-50 flex-1">
              {/* Cases */}
              <FormattedMessage id="battle_box" />
            </div>
            <div className="w-28 text-xs font-semibold uppercase text-white text-opacity-50">
              <FormattedMessage id="battle_title_value" />
            </div>
            <div className="w-48 text-xs font-semibold uppercase text-white text-opacity-50">
              {/* Players */}
              <FormattedMessage id="battle_box" />
            </div>
            <div className="w-72 text-xs font-semibold uppercase text-white text-opacity-50">
              {/* Status */}
              <FormattedMessage id="pay_state" />
            </div>
          </div>

          {filter === 'in' && (
            <CurrentRooms show={filter === 'in'} mode={modFilter} />
          )}
          {filter === 'my' && (
            <MyRooms show={filter === 'my'} mode={modFilter} />
          )}
          {filter === 'end' && (
            <EndRooms show={filter === 'end'} mode={modFilter} />
          )}
        </div>

        {/* <div className="w-[280px] flex-shrink-0 m-0-auto" ref={rankRef}>
        <div className="battle-rank-point relative rounded-md">
          <div className="absolute left-[25px] top-[80px]">
            <div className="relative w-[80px] h-[80px] rounded-[4px] ">
              <img src={topOneYesterday?.headPic} className="rounded-[4px]" />
            </div>
            <div className="mt-1 max-w-full truncate text-[#FFDFA7] font-semibold font-num">
              {topOneYesterday?.nickname}
            </div>
            <div className="font-num text-2xl text-white">
              {topOneYesterday?.rewardPoint}
            </div>
          </div>
          <div className="bottom-0 flex items-center w-full absolute z-10">
            <div className="bg-black/50 h-9 mt-4 uppercase text-xs flex justify-between w-full items-center px-2">
              <div>
                <IconFont type="icon-ranking" className="text-white mr-2" />
                <FormattedMessage id="arena_my_reward_point" />
              </div>
              <span className="font-num text-white">
                {myReward?.rewardPoint || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="battle-ranks mt-3 sm:mt-4 bg-black">
          <div className="grid grid-cols-2 w-full">
            <div
              className={`h-9  ${
                recordTab === 0
                  ? 'btn-green !rounded-none'
                  : 'btn-light !rounded-none'
              }`}
              onClick={() => setRecordTab(0)}
            >
              <FormattedMessage id="today_rank" />
            </div>
            <div
              className={`h-9 ${
                recordTab === 1
                  ? 'btn-green !rounded-none'
                  : 'btn-light !rounded-none'
              }`}
              onClick={() => setRecordTab(1)}
            >
              <FormattedMessage id="yesterday_rank" />
            </div>
          </div>

          <div className="flex flex-col mt-1">
            <div className="flex h-full flex-col min-h-[400px]">
              {rank?.length === 0 && (
                <div className="text-center text-opacity-50 text-sm mt-4 uppercase">
                  <FormattedMessage id="empty_page_main_txt" />
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
                      <div className="text-xs text-green font-num">
                        {user.rewardPoint}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}
