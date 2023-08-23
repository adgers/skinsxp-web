import { updateTradeUrlUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { EditFilled } from '@ant-design/icons';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useRef } from 'react';
import { Input } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function Info() {
  const { userInfo, getUser } = useModel('user');
  const steamRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const saveTradeUrl = async () => {
    const tradeUrl = steamRef.current?.value;
    if (!tradeUrl) {
      return;
    }
    if (
      /https:\/\/steamcommunity.com\/tradeoffer\/new\/\?partner=[a-zA-Z0-9_-]{1,20}&token=[a-zA-Z0-9_-]{1,20}$/.test(
        tradeUrl,
      ) === false
    ) {
      toast.error(intl.formatMessage({ id: 'trade_link_qsrzqdjylj' }));
      return;
    }
    const ret = await updateTradeUrlUsingPOST({
      tradeUrl,
    });
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      getUser();
    }
  };

  return (
    <div className="bg-neutral p-4 md:p-6 rounded min-h-[400px]">
      <h3 className="font-sembold mb-3 text-base">
        <FormattedMessage id="trade_link_title" />
      </h3>
      <div className="mb-3 text-xs font-semibold uppercase text-base-content text-opacity-50">
        <a
          href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
          target="_blank"
          rel="noreferrer"
          className="link text-secondary mr-1"
        >
          <FormattedMessage id="trade_link_hqjylj" />
        </a>
      </div>
      <div className="flex gap-2">
        <Input
          defaultValue={userInfo?.tradeUrl}
          disabled={!!userInfo?.tradeUrl}
          placeholder={intl.formatMessage({ id: 'trade_link_qsrndjylj' })}
          className="w-full max-w-xl font"
          ref={steamRef}
        />
        {!userInfo?.tradeUrl && (
          <button
            className="btn btn-outline btn-secondary"
            onClick={saveTradeUrl}
            type="button"
          >
            <EditFilled />
            <FormattedMessage id="trade_link_confirm" />
          </button>
        )}
      </div>

      {/* <h3 className="font-sembold my-3 text-base uppercase">Email SETTINGS</h3>
      <div className="mb-3 text-xs font-semibold uppercase text-base-content text-opacity-50">
        HERE YOU CAN CHANGE YOUR EMAIL ADDRESS
      </div>
      <div className="flex gap-2">
        <Input
          value={userInfo?.tradeUrl}
          disabled
          placeholder="请设置您的Steam交易链接"
          className="w-full max-w-xl"
        />
        <button className="btn btn-outline btn-secondary">
          <EditFilled />
          编辑
        </button>
      </div> */}

      {/* <h3 className="font-sembold my-3 text-base uppercase">PHONE SETTINGS</h3>
      <div className="mb-3 text-xs font-semibold uppercase text-base-content text-opacity-50">
        HERE YOU CAN CHANGE YOUR PHONE NUMNBER
      </div>
      <div className="flex gap-2">
        <Input
          value={userInfo?.tradeUrl}
          disabled
          placeholder="请设置您的Steam交易链接"
          className="w-full max-w-xl"
        />
        <button className="btn btn-outline btn-secondary">
          <EditFilled />
          编辑
        </button>
      </div> */}
    </div>
  );
}
