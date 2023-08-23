import { verifyUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
import { UserOutlined } from '@ant-design/icons';
import { Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import CheckCode from './checkcode';

export default function UserVerify({
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
  const idCardRef = useRef<InputRef>(null);

  const onSubmit = async () => {
    const realName = nameRef.current?.input?.value;
    const idCard = idCardRef.current?.input?.value;

    if (!realName) {
      toast.error('请输入您的姓名');
      return;
    }

    if (!idCard) {
      toast.error('请输入您的身份证号');
      return;
    }

    if (!smsCode) {
      toast.error('请输入验证码');
      return;
    }

    const idCardRegex =
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
    if (!idCardRegex.test(idCard)) {
      toast.error('身份证号格式错误');
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    const ret = await verifyUsingPOST({
      realName,
      idCard,
      smsCode,
    });
    setLoading(false);

    if (ret.status === 0) {
      toast.success('认证成功');
      onSuccess();
    }
  };

  return (
    <Modal open={open} className="max-w-md">
      <Modal.Header className="flex items-center mb-2">实名认证</Modal.Header>
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
          placeholder="请输入您的姓名"
          prefix={<UserOutlined />}
          ref={nameRef}
          allowClear
        />
        <Input
          placeholder="请输入您的身份证号"
          prefix={<UserOutlined />}
          ref={idCardRef}
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
          确定
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
