import { FormattedMessage } from '@umijs/max';
import { useMemo, useState } from 'react';
import BattleRecord from './battle';
import DreamRecord from './dream';
import OpenBoxRecord from './openBox';

export default function GameRecord() {
  const [roomState, setRoomState] = useState('box');
  const roomStates = useMemo(
    () => [
      { label: <FormattedMessage id="open_box_open" />, value: 'box' },
      { label: <FormattedMessage id="arena" />, value: 'battle' },
      { label: <FormattedMessage id="main_tab_dream" />, value: 'dream' },
    ],
    [],
  );

  return (
    <div className="flex flex-col items-center">
      <div className="join my-3 text-sm">
        {roomStates.map((item, i) => (
          <div
            className={`join-item text-center border border-transparent cursor-pointer rounded-md px-4 py-1 outline-none uppercase ${
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
      {roomState === 'box' && <OpenBoxRecord />}
      {roomState === 'battle' && <BattleRecord />}
      {roomState === 'dream' && <DreamRecord />}
    </div>
  );
}
