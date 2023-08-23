import { signUpUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
import { GiftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Input, InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import CheckCode from './checkcode';

export default function Register() {
  const { registerShow, hideRegister, showLogin } = useModel('user');
  const [smsCode, setSmsCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const idRef = useRef<InputRef>(null);
  const pwdRef = useRef<InputRef>(null);
  const promoteRef = useRef<InputRef>(null);
  const checkRef = useRef<HTMLInputElement>(null);

  const onRegister = async () => {
    const phone = idRef.current?.input?.value;
    const password = pwdRef.current?.input?.value;
    const promoteCode = promoteRef.current?.input?.value;
    const checked = checkRef.current?.checked;

    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (!password) {
      toast.error('请输入密码');
      return;
    }
    if (!/^(?=.{8})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/.test(password)) {
      toast.error('密码格式错误，密码必须包含大小写字母和数字');
      return;
    }
    if (!smsCode) {
      toast.error('请输入验证码');
      return;
    }
    if (!checked) {
      toast.error('请阅读并同意协议');
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    const ret = await signUpUsingPOST({
      id: phone,
      password,
      promoteCode,
      type: 0,
      verifyCode: smsCode,
    });
    setLoading(false);

    if (ret.status === 0) {
      if (ret?.data?.token) {
        localStorage.setItem('token', ret.data.token);
      }
      toast.success('注册成功');
      hideRegister();
      location.reload();
    }
  };

  useEffect(() => {
    //@ts-ignore
    window?.['_nc_check']?.reset();
  }, [registerShow]);

  return (
    <Modal open={registerShow} className="max-w-md">
      <Modal.Header className="flex flex-col items-center mb-2">
        <div>欢迎来到 MUSKINS</div>
        <div className="modal-sub-title">
          <div className="text-base">注册</div>
        </div>
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideRegister}
      >
        ✕
      </Button>
      <Modal.Body className="flex flex-col gap-4">
        <Input
          placeholder="请输入手机号"
          prefix={<UserOutlined />}
          maxLength={11}
          ref={idRef}
          allowClear
          onChange={(e) => setPhone(e.target.value)}
        />

        <CheckCode
          onChange={(e) => setSmsCode(e.target.value)}
          phone={phone}
          id="register"
        />

        <Input.Password
          placeholder="请输入密码"
          ref={pwdRef}
          prefix={<LockOutlined />}
          autoComplete="off"
          allowClear
        />

        <Input
          placeholder="请输入邀请码（选填)"
          prefix={<GiftOutlined />}
          ref={promoteRef}
          allowClear
        />

        <div className="flex gap-2 items-center mt-2">
          <Checkbox color="primary" size="xs" ref={checkRef} />
          <div className="text-sm">
            我已满18周岁并接受《用户协议》和《隐私政策》
          </div>
        </div>
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className="btn-primary w-full btn-sm"
          onClick={onRegister}
          loading={loading}
        >
          注册
        </Button>
      </Modal.Actions>
      <div className="flex text-sm mt-3">
        已有账号？
        <span
          className="hover:text-primary cursor-pointer text-primary"
          onClick={showLogin}
        >
          立即登录
        </span>
      </div>
    </Modal>
  );
}
