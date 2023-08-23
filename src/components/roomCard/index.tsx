import loseImg from '@/assets/lose.png';
import winImg from '@/assets/win.png';
import { numberFixed } from '@/utils';
import { useIntl, useModel } from '@umijs/max';
import { memo } from 'react';
import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import { IconFont } from '../icons';

const RoomCard = memo(
  ({
    data,
    onSelect,
    showTag = false,
  }: {
    data: API.BattleVo;
    onSelect: (id: number) => void;
    showTag?: boolean;
  }) => {
    const {
      state = 0,
      mode = 0,
      countCustomer = 0,
      totalPrice = 0,
      boxList = [],
      customerList = [],
      id,
      winners,
    } = data;

    const intl = useIntl();

    const battleStatus = [
      intl.formatMessage({ id: 'arena_battel_waiting' }),
      intl.formatMessage({ id: 'arena_battel_ing' }),
      intl.formatMessage({ id: 'arena_battel_over' }),
    ];

    const battleMode = [
      intl.formatMessage({ id: 'room_mode_oh' }),
      intl.formatMessage({ id: 'room_mode_fq' }),
    ];

    const stateName = battleStatus[state];
    const modeName = battleMode[mode];

    let list = customerList;
    //如果人数不足，补充空位
    if (customerList.length < countCustomer) {
      list = customerList.concat(
        Array(countCustomer - customerList.length).fill({
          nickname: '',
          headPic: '',
        }),
      );
    }

    //最多取boxList前6个
    const boxs = boxList?.slice(0, 6);

    const { userInfo } = useModel('user');
    const isWin =
      winners?.findIndex((item) => item.winnerId === userInfo?.id) !== -1;

    return (
      <div
        className={`battle-room animate__animated animate__zoomIn battle-state-${state} battle-mode-${mode}`}
        onClick={() => id && onSelect(id)}
      >
        {showTag && winners && winners.length > 0 && state === 2 && (
          <div className="absolute right-2 top-14 h-20 w-20">
            {isWin ? <img src={winImg} /> : <img src={loseImg} />}
          </div>
        )}
        <div className="flex px-2 sm:px-3 py-3 justify-between text-xs sm:text-sm bg-base-100 bg-opacity-30">
          <div className="flex text-base-content gap-2 items-center">
            <span className={`w-2 h-2 rounded-full animat-status`}></span>
            <span className="text-base-content text-opacity-60">
              {stateName}
            </span>
          </div>
          <div className="text-base-content flex gap-1 sm:gap-2 flex-wrap sm:flex-nowrap justify-center">
            <span className="animate-pulse">{modeName}</span>
            <span>{boxList.length} 回合</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center relative room-bg">
          {state === 1 && <div className="process"></div>}
          <div className="flex gap-1 items-center font-num text-base-content text-lg mt-3 sm:mt-5">
            <IconFont type="icon-coin" />
            {numberFixed(totalPrice)}
          </div>
          <div className="items-center justify-center flex flex-wrap gap-3 sm:gap-4 mt-4 mb-5 sm:mt-6 sm:mb-7 h-[92px] w-[92px] sm:h-[112px] sm:w-[112px]">
            {list?.map((t, i) => {
              if (t?.nickname !== '') {
                return (
                  <div
                    className="tooltip h-10 sm:h-12"
                    data-tip={t.nickname}
                    key={i}
                  >
                    <div className="avatar">
                      <div className="w-10 sm:w-12 rounded relative">
                        <img src={t.headPic} />
                        <img
                          src={t.headGround}
                          className="absolute left-0 top-0 w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className="flex w-10 h-10 sm:w-12 sm:h-12 rounded items-center justify-center breathe add-room-bg"
                >
                  <PlusOutlined className="font-bold text-lg" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex bg-black bg-opacity-20 px-4 py-1.5 justify-center gap-3 items-center">
          {boxs.map((t, i) => (
            <img
              src={t.boxImage}
              key={i}
              className="w-8 h-8"
              title={t.boxName}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default RoomCard;
