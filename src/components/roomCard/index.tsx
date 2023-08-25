import { useIntl } from '@umijs/max';
import { memo, useEffect, useState } from 'react';
import './index.less';

import { PlusOutlined } from '@ant-design/icons';
import { IconFont } from '../icons';

interface IBattleBox {
  boxName: string;
  boxImage: string;
  count: number;
}

const RoomCard = memo(
  ({
    data,
    onSelect,
  }: {
    data: API.BattleVo;
    onSelect: () => void;
    showTag?: boolean;
  }) => {
    const {
      state = 0,
      mode = 0,
      countCustomer = 0,
      totalPrice = 0,
      boxList = [],
      customerList = [],
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

    const [boxListArr, setBoxListArr] = useState<IBattleBox[]>([]);
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

    const initBoxList = () => {
      // 处理boxlist合并相同项，并计数
      const boxListMap = new Map();
      boxList.forEach((item) => {
        if (boxListMap.has(item.boxName)) {
          boxListMap.set(item.boxName, boxListMap.get(item.boxName) + 1);
        } else {
          boxListMap.set(item.boxName, 1);
        }
      });
      const arr: IBattleBox[] = [];
      boxListMap.forEach((value, key) => {
        arr.push({
          boxName: key,
          boxImage: boxList.find((item) => item.boxName === key)?.boxImage,
          count: value,
        });
      });
      return arr;
    };

    useEffect(() => {
      setBoxListArr(initBoxList());
    }, []);

    return (
      <div
        className={`relative flex flex-col md:flex md:flex-row gap-4 bg-black bg-opacity-75 animate__animated animate__zoomInUp rounded p-4 battle-mode-${mode} battle-state-${state}`}
      >
        <div className="flex w-full overflow-hidden">
          <div className="w-16 md:w-24 flex items-center justify-center">
            <div
              className={`relative rounded-full ring-2 md:text-2xl w-10 h-10 md:w-14 md:h-14 flex items-center justify-center font-semibold text-white ${
                mode === 1 ? 'ring-red' : 'ring-green'
              }`}
            >
              {boxList.length}
              {state !== 2 && (
                <div
                  className={`animate-circleChange absolute h-full w-full rounded-full left-0 top-0 border ${
                    mode === 1 ? 'border-red' : 'border-green'
                  }`}
                ></div>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-x-auto hide-scrollbar flex flex-nowrap gap-x-2">
            {boxListArr.map((item, index) => (
              <div
                className="relative flex h-full w-[64px] md:w-[84px] flex-shrink-0 flex-col items-center overflow-hidden"
                key={index}
              >
                <img
                  src={item.boxImage}
                  className="h-full w-full object-cover"
                />
                <p className="absolute left-0 bottom-0 w-full p-1 text-center font-semibold text-white truncate bg-black bg-opacity-70 text-[8px]">
                  {item.boxName}
                </p>
                <div className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-bl-md bg-black text-white text-xs font-semibold">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-shrink-0 gap-2 md:gap-0">
          <div className="md:w-28 flex items-center justify-center">
            <span className="text-green">$ {totalPrice}</span>
          </div>
          <div className="md:w-48 flex items-center justify-center">
            <div className="flex gap-2 md:grid md:grid-cols-2">
              {list?.map((t, i) => {
                if (t?.nickname !== '') {
                  return (
                    <div
                      className="w-8 h-8 rounded-full overflow-hidden"
                      key={i}
                    >
                      <img src={t.headPic} />
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className="flex w-8 h-8 rounded-full items-center justify-center bg-light bg-opacity-70"
                  >
                    <PlusOutlined className="font-bold text-lg text-white" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="w-full md:w-80 flex flex-shrink-0 items-center justify-center  text-white font-semibold"
          onClick={onSelect}
        >
          {state === 0 &&
            (mode === 0 ? (
              <div className="btn border border-green w-full bg-[#18331F] rounded gap-1">
                <IconFont type="icon-zhandou" />
                {modeName}
              </div>
            ) : (
              <div className="btn border border-red w-full bg-[#630F14] rounded gap-1">
                <IconFont type="icon-zhandou" />
                {modeName}
              </div>
            ))}

          {(state === 1 || state === 2) && (
            <div className="btn border border-light w-full text-white uppercase rounded">
              watch
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default RoomCard;
