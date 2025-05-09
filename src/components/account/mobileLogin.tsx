import { smsLoginUsingPOST } from '@/services/front/qiantaishouquanxiangguan';
import { UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Input,InputRef } from 'antd';
import { useEffect,useRef,useState } from 'react';
import { Button,Checkbox,Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import CheckCode from './checkcode';

export default function MobileLogin() {
  const { smsLoginShow, hideSmsLogin, showRegister, showLogin } =
    useModel('user');
  const [loading, setLoading] = useState<boolean>(false);
  const [smsCode, setSmsCode] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const idRef = useRef<InputRef>(null);
  const checkRef = useRef<HTMLInputElement>(null);

  const onPwdLogin = async () => {
    const phone = idRef.current?.input?.value;
    const checked = checkRef.current?.checked;

    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (!checked) {
      toast.error('请阅读并同意协议');
      return;
    }
    if (!smsCode) {
      toast.error('请输入验证码');
      return;
    }

    if (loading) {
      return;
    }
    setLoading(true);
    const ret = await smsLoginUsingPOST({
      id: phone,
      code: smsCode,
    });
    setLoading(false);
    if (ret?.data) {
      toast.success('登录成功');
      localStorage.setItem('token', ret?.data);
      hideSmsLogin();
      location.reload();
    }
  };

  useEffect(() => {
    //@ts-ignore
    window?.['_nc_check']?.reset();
  }, [smsLoginShow]);

  return (
    <Modal open={smsLoginShow} className="max-w-md">
      <Modal.Header className="flex flex-col items-center mb-2">
        <div>欢迎</div>
        <div className="modal-sub-title">
          <div className="text-base">短信登录</div>
        </div>
      </Modal.Header>
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideSmsLogin}
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
          size='large'
        />

        <CheckCode
          onChange={(e) => setSmsCode(e.target.value)}
          phone={phone}
          id="mobile"
        />
        <div className="flex text-sm">
          还没有账号？
          <span
            className="text-sm hover:text-primary cursor-pointer text-primary"
            onClick={showRegister}
          >
            去注册
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox color="primary" size="xs" ref={checkRef} />
          <div className="text-sm">
            我已满18周岁并接受《用户协议》和《隐私政策》
          </div>
        </div>
      </Modal.Body>
      <Modal.Actions className="flex flex-col mt-4">
        <Button
          className="btn-primary w-full"
          onClick={onPwdLogin}
          loading={loading}
        >
          登录
        </Button>
      </Modal.Actions>
      <div className="flex justify-center mt-3">
        <span
          className="text-sm hover:text-primary cursor-pointer"
          onClick={showLogin}
        >
          密码登录
        </span>
      </div>
    </Modal>
  );
}
