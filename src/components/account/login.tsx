import { loginUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Input, InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function Login() {
  const { loginShow, hideLogin, showRegister, showFindPwd, showSmsLogin } =
    useModel('user');
  const [loading, setLoading] = useState<boolean>(false);

  const idRef = useRef<InputRef>(null);
  const pwdRef = useRef<InputRef>(null);
  // const checkRef = useRef<HTMLInputElement>(null);

  const onPwdLogin = async () => {
    const id = idRef.current?.input?.value;
    const password = pwdRef.current?.input?.value;
    // const checked = checkRef.current?.checked;

    if (!id) {
      toast.error('please input username');
      return;
    }
    if (!password) {
      toast.error('please input password');
      return;
    }
    // if (!checked) {
    //   toast.error('请阅读并同意协议');
    //   return;
    // }

    if (loading) {
      return;
    }

    setLoading(true);
    const ret = await loginUsingPOST({ id, password, type: 0 });
    setLoading(false);

    if (ret?.data) {
      toast.success('Success');
      localStorage.setItem('token', ret?.data);
      hideLogin();
      location.reload();
    }
  };

  return (
    <Modal open={loginShow} className="max-w-md">
      <Modal.Header className="flex flex-col items-center mb-2">
        <div>Login</div>
        {/* <div className="modal-sub-title">
          <div className="text-base">Login with password</div>
        </div> */}
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideLogin}
      >
        ✕
      </Button>
      <Modal.Body className="flex flex-col gap-4">
        <Input
          placeholder="Please input username"
          prefix={<UserOutlined />}
          maxLength={11}
          ref={idRef}
          allowClear
          autoComplete="username"
          size="large"
        />

        <Input.Password
          placeholder="Please input password"
          ref={pwdRef}
          prefix={<LockOutlined />}
          allowClear
          autoComplete="current-password"
          size="large"
        />
        {/* <div className="flex justify-between">
          <div className="flex text-sm">
            还没有账号？
            <span
              className="text-sm hover:text-primary cursor-pointer text-primary"
              onClick={showRegister}
            >
              去注册
            </span>
          </div>
          <span
            className="label-text-alt text-sm hover:text-primary cursor-pointer"
            onClick={showFindPwd}
          >
            忘记密码？
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox color="primary" size="xs" ref={checkRef} />
          <div className="text-sm">
            我已满18周岁并接受《用户协议》和《隐私政策》
          </div>
        </div> */}
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className={`btn-primary w-full `}
          onClick={() => {
            onPwdLogin();
          }}
          loading={loading}
        >
          Login
        </Button>
      </Modal.Actions>
      {/* <div className="flex justify-center mt-3">
        <span
          className="text-sm hover:text-primary cursor-pointer"
          onClick={showSmsLogin}
        >
          验证码登录
        </span>
      </div> */}
    </Modal>
  );
}
