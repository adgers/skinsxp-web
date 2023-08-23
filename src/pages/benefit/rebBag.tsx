import { receiveCycleRedPacketUsingPOST } from '@/services/front/hongbaoxiangguan';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useCountDown } from 'ahooks';
import { Countdown } from 'react-daisyui';
import { toast } from 'react-toastify';
import './index.less';

export default function RedBag({ data }: { data: API.CycleRedPacketVo }) {
  const { getUser } = useModel('user');
  const [countdown, formattedRes] = useCountDown({
    leftTime: Number(data.leftTime) || 0,
  });

  const { days, hours, minutes, seconds } = formattedRes;
  const isDisabled = data.num && data.num === 0 || data.receiveStatus === true;
  const intl = useIntl();

  const onReceive = async () => {
    if (isDisabled) return;
    const ret = await receiveCycleRedPacketUsingPOST({
      redPacketId: Number(data.id),
    });
    if (ret.status === 0) {
      toast.success(
        intl.formatMessage({
          id: 'wc_cdkey_redeemed_success',
        }),
      );
      getUser();
    }
  };
  return (
    <div className={`redbag-box ${isDisabled && 'disabled'}`}>
      <div className="redbag-box-left flex-shrink-0">
        <div className="left-top flex-col">
          <div className="uppercase text-sm">
            <FormattedMessage id="wc_rewards_claim_rewards" />
          </div>
          <div className="flex gap-1 font-num">{data.accumulatedAmount}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm w-full">
        <div className="uppercase">{data.title}</div>
        <div className="flex justify-between text-secondary">
          <span className="font-mono">
            <Countdown value={days} />:
            <Countdown value={hours} />:
            <Countdown value={minutes} />:
            <Countdown value={seconds} />
          </span>
          <span className="uppercase font-num">
            <FormattedMessage id="wc_rewards_total" /> {data.num}
          </span>
        </div>
        <div className="leading-4">{data.subtitle}</div>
        <div className="redbag-btn mt-2" onClick={onReceive}>
          <FormattedMessage id="wc_rewards_claim_rewards" />
        </div>
      </div>
    </div>
  );
}
