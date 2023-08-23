import { modifyTradeUrlUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { UserOutlined } from '@ant-design/icons';
import { Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import CheckCode from './checkcode';
import { FormattedMessage } from '@umijs/max';

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
  const nameRef = useRef<InputRef>(null);
  const tradeUrlRef = useRef<InputRef>(null);

  const onSubmit = async () => {
    const tradeUrl = tradeUrlRef.current?.input?.value;

    if (!tradeUrl) {
      toast.error('请输入您的Steam交易链接');
      return;
    }

    if (!smsCode) {
      toast.error('请输入验证码');
      return;
    }

    const steamRegex =
      /https:\/\/steamcommunity.com\/tradeoffer\/new\/\?partner=[a-zA-Z0-9_-]{1,20}&token=[a-zA-Z0-9_-]{1,20}$/;
    if (!steamRegex.test(tradeUrl)) {
      toast.error('Steam交易链接格式错误');
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    const ret = await modifyTradeUrlUsingPOST({
      tradeUrl,
      smsCode,
    });
    setLoading(false);

    if (ret.status === 0) {
      toast.success('修改成功');
      onSuccess();
    }
  };

  return (
    <Modal open={open} className="max-w-md">
      <Modal.Header className="flex items-center mb-2">
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
          prefix={<UserOutlined />}
          ref={nameRef}
          allowClear
        />
        <CheckCode
          onChange={(e) => setSmsCode(e.target.value)}
          id="verify"
          isSelf
        />
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className="btn-primary w-full btn-sm"
          onClick={onSubmit}
          loading={loading}
        >
           <FormattedMessage id="confirm" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
