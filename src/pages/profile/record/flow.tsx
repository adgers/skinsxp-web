import { useIntl } from '@umijs/max';
import { useMemo, useState } from 'react';
import BalanceRecord from './balance';
import RechargeRecord from './recharge';

export default function FlowRecord() {
  const [roomState, setRoomState] = useState('recharge');
  const intl = useIntl();
  const roomStates = useMemo(
    () => [
      {
        label: intl.formatMessage({ id: 'recharge_record' }),
        value: 'recharge',
      },
      { label: intl.formatMessage({ id: 'balance_record' }), value: 'balance' },
    ],
    [],
  );

  return (
    <div className="flex flex-col items-center">
      <div className="join my-3 text-sm">
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
      {roomState === 'recharge' && <RechargeRecord />}
      {roomState === 'balance' && <BalanceRecord />}
    </div>
  );
}
