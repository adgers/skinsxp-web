import { updateTradeUrlUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { FormattedMessage, useIntl } from '@umijs/max';
import { useRef, useState } from 'react';
import { Button, Modal,Input } from 'react-daisyui';
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
  const [smsCode, setSmsCode] = useState<string>();

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
    const ret = await updateTradeUrlUsingPOST({
      tradeUrl,
    });
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      onSuccess()
    }
  };

  return (
    <Modal open={open} className="max-w-md">
      <Modal.Header className="flex items-center mb-4">
        Steam交易链接
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
          placeholder="请输入您的Steam交易链接"
          ref={tradeUrlRef}

        />
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className="btn-primary w-full"
          onClick={onSubmit}
          loading={loading}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
