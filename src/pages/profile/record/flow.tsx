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
      <div className="custom-tab w-full flex  mb-4 gap-8 text-white justify-center border-b border-[#45444B]">
        {roomStates.map((item, index) => {

          return (
            <div
              className={`tab-item  h-full ${
                roomState === item.value ? 'text-green border-b-[1px] border-green' : 'text-white '
              }`}
              key={index}
              onClick={() => setRoomState(item.value)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    
      {roomState === 'recharge' && <RechargeRecord />}
      {roomState === 'balance' && <BalanceRecord />}
    </div>
  );
}
