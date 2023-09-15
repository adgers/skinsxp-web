import { updateTradeUrlUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function ModifySteamLink({
  open,
  onSuccess,
  onClose,
}: {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { userInfo } = useModel('user');

  const tradeUrlRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const onSubmit = async () => {
    const tradeUrl = tradeUrlRef.current?.value;
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
    setLoading(true);
    const ret = await updateTradeUrlUsingPOST({
      tradeUrl,
    });
    setLoading(false);
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      onSuccess();
    }
  };

  return (
    <Modal open={open} className="max-w-md">
      <Modal.Header className="flex items-center mb-4 uppercase">
        <FormattedMessage id="trade_link_title" />
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Body className="flex flex-col gap-4">
        <Input
          placeholder={intl.formatMessage({ id: 'trade_link_qsrndjylj' })}
          ref={tradeUrlRef}
          defaultValue={userInfo?.tradeUrl || ''}
        />
        <a
          href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
          target="_blank"
          rel="noreferrer"
          className="text-xs link link-white uppercase"
        >
          <FormattedMessage id="trade_link_hqjylj" />
        </a>
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className="btn-green w-full"
          onClick={onSubmit}
          loading={loading}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
