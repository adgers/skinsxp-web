import { findpwdUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, useModel } from '@umijs/max';
import { Input, InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import CheckCode from './checkcode';

export default function FindPwd() {
  const { findPwdShow, hideFindPwd, showLogin } = useModel('user');
  const [loading, setLoading] = useState<boolean>(false);
  const [smsCode, setSmsCode] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const idRef = useRef<InputRef>(null);
  const pwdRef = useRef<InputRef>(null);

  const onSubmit = async () => {
    const phone = idRef.current?.input?.value;
    const password = pwdRef.current?.input?.value;

    if (!phone) {
      toast.error('请输入手机号');
      return;
    }

    if (!password) {
      toast.error('请输入密码');
      return;
    }

    if (!smsCode) {
      toast.error('请输入验证码');
      return;
    }

    const passwordRegex = /^(?=.{8})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/;
    if (!passwordRegex.test(password)) {
      toast.error('密码格式错误，密码必须包含大小写字母和数字');
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    const ret = await findpwdUsingPOST({
      id: phone,
      verifyCode: smsCode,
      password,
    });
    setLoading(false);

    if (ret?.data) {
      toast.success('修改成功');
      hideFindPwd();
      showLogin();
    }
  };

  useEffect(() => {
    //@ts-ignore
    window?.['_nc_check']?.reset();
  }, [findPwdShow]);

  return (
    <Modal open={findPwdShow} className="max-w-md">
      <Modal.Header className="flex flex-col items-center mb-2">
        <div>找回密码</div>
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideFindPwd}
      >
        ✕
      </Button>
      <Modal.Body className="flex flex-col gap-4">
        <Input
          placeholder="请输入手机号"
          prefix={<UserOutlined />}
          maxLength={11}
          ref={idRef}
          onChange={(e) => setPhone(e.target.value)}
          allowClear
        />

        <CheckCode
          onChange={(e) => setSmsCode(e.target.value)}
          phone={phone}
          id="pwd"
        />
        <Input.Password
          placeholder="请输入密码"
          ref={pwdRef}
          prefix={<LockOutlined />}
          autoComplete="off"
          allowClear
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
