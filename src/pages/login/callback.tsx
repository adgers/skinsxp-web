import { steamSignUpUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function LoginCallback() {
  const { getUser } = useModel('user');

  const steamLogin = async () => {
    const urlParams = new URL(window.location.href).searchParams;
    let query = location.href.split('?')[1];

    const queryStr = urlParams.get('queryStr') || '{}';
    const queryStrObj = JSON.parse(queryStr);

    query += '&' + new URLSearchParams(queryStrObj).toString();

    const ret = await steamSignUpUsingGET({
      query: query,
    });
    if (ret.status === 0) {
      if (ret.data?.token) {
        localStorage.setItem('token', ret.data.token);
      }
      if (ret.data?.register) {
        if (['3', '7']?.includes(ret.data?.promotionChannelId)) {
          // fb 推广用户 注册成功
          window?.fbq('track', 'Lead');
        }
        if (['2'].includes(ret.data?.promotionChannelId)) {
          // fb 推广用户 注册成功
          window?.gtag('event', 'signup');
        }
      }

      getUser();
      history.push(queryStrObj.redirectUrl || '/');
    } else {
      history.push('/login');
    }
  };
  useEffect(() => {
    steamLogin();
  }, []);

  return (
    <div className="w-full min-h-[500px] flex justify-center items-center">
      <div className="uppercase text-green font-semibold flex gap-2">
        <LoadingOutlined />
      </div>
    </div>
  );
}
