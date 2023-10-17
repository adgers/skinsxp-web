import { useIntl, useLocation,history } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';
import BalanceRecord from './balance';
import RechargeRecord from './recharge';
import TakeRecord from './take';

export default function FlowRecord() {
  const [roomState, setRoomState] = useState('recharge');
  const intl = useIntl();
  const location = useLocation();

  const roomStates = useMemo(
    () => [
      {
        label: intl.formatMessage({ id: 'recharge_record' }),
        value: 'recharge',
      },
      { label: intl.formatMessage({ id: 'balance_record' }), value: 'balance' },
      { label: intl.formatMessage({ id: 'take_record' }), value: 'take' },
    ],
    [],
  );

  useEffect(() => {
    const flag = location.hash;
    if (flag === '#take') {
      setRoomState('take');
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="custom-tab w-full flex  mb-4 gap-8 text-white justify-center border-b border-[#45444B] h-[68px]">
        {roomStates.map((item, index) => {
          return (
            <div
              className={`tab-item flex items-center cursor-pointer h-full ${
                roomState === item.value
                  ? 'text-green border-b-[1px] border-green'
                  : 'text-white '
              }`}
              key={index}
              onClick={() => {
                setRoomState(item.value)
                history.push(`${location.pathname}#${item.value}`)
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>

      {roomState === 'recharge' && <RechargeRecord />}
      {roomState === 'balance' && <BalanceRecord />}
      {roomState === 'take' && <TakeRecord />}
    </div>
  );
}
