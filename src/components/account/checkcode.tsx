import {
  smsCodeUsingPOST,
  userSmsCodeUsingPOST,
} from '@/services/common/tongyongxiangguan';
import { SafetyOutlined } from '@ant-design/icons';
import { useCountDown } from 'ahooks';
import { Input } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import NCCheck from './nc';

export default function CheckCode({
  phone,
  onChange,
  id,
  isSelf,
}: {
  phone?: string;
  onChange?: (e: any) => void;
  id: string;
  isSelf?: boolean;
}) {
  const [targetDate, setTargetDate] = useState<number>();
  const [ncData, setNcData] = useState<any>({});

  const restNc = () => {
    //@ts-ignore
    window?.['_nc_check']?.reset();
    setNcData({});
  };

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      restNc();
    },
  });

  const sendUserMsg = async () => {
    if (!ncData.csessionid) {
      toast.error('请先完成滑动验证');
      return;
    }
    const ret = await userSmsCodeUsingPOST({ ...ncData });
    restNc();
    if (ret.status === 0) {
      setTargetDate(Date.now() + 60000);
      toast.success('验证码已发送，请注意查收');
    }
  };

  const sendMsg = async () => {
    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (countdown !== 0) {
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号');
      return;
    }
    if (!ncData.csessionid) {
      toast.error('请先完成滑动验证');
      return;
    }
    const ret = await smsCodeUsingPOST({ phone: phone, ...ncData });

    if (ret.status === 0) {
      setTargetDate(Date.now() + 60000);
      toast.success('验证码已发送，请注意查收');
    }
  };

  return (
    <div>
      <Input
        placeholder="请输入验证码"
        maxLength={6}
        onChange={onChange}
        prefix={<SafetyOutlined />}
        addonAfter={
          <div
            onClick={isSelf ? sendUserMsg : sendMsg}
            className="text-base-content cursor-pointer"
          >
            {countdown === 0
              ? '发送验证码'
              : `${Math.round(countdown / 1000)}秒后重发`}
          </div>
        }
      />
      <div className="mt-4">
        <NCCheck
          onSuccess={(data) => {
            setNcData(data);
          }}
          id={id}
        />
      </div>
    </div>
  );
}
