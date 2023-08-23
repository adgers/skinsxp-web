import { changePasswordUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
import { FormattedMessage } from '@umijs/max';
import { Input, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function ResetPwd({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const oldpwdRef = useRef<InputRef>(null);
  const newpwdRef = useRef<InputRef>(null);
  const confirmPwdRef = useRef<InputRef>(null);

  const onSubmit = async () => {
    const oldPassword = oldpwdRef.current?.input?.value;
    const newPassword = newpwdRef.current?.input?.value;
    const confirmPassword = confirmPwdRef.current?.input?.value;

    if (!oldPassword) {
      toast.error('请输入当前密码');
      return;
    }
    if (!newPassword) {
      toast.error('请输入新密码');
      return;
    }
    if (!confirmPassword) {
      toast.error('请输入新密码');
      return;
    }
    if (!/^(?=.{8})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/g.test(newPassword)) {
      toast.error('密码格式错误，密码必须包含大小写字母和数字');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('输入的密码不一致');
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const ret = await changePasswordUsingPOST({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (ret?.data) {
        toast.success('修改成功');
      }
    } catch (error) {
      toast.error('修改失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} className="max-w-md">
      <Modal.Header className="flex items-center mb-2">
        修改密码
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
        <Input.Password
          placeholder="请输入当前密码"
          type="password"
          ref={oldpwdRef}
        />
        <Input.Password
          placeholder="请输入您的新密码"
          type="password"
          ref={newpwdRef}
        />
        <Input.Password
          placeholder="请确认新密码"
          className="input-sm"
          ref={confirmPwdRef}
          type="password"
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
