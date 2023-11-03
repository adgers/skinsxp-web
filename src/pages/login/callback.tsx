import { steamSignUpUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function LoginCallback() {
  const { getUser, hideLoginTip, showRegTip, setRegNum } = useModel('user');

  const steamLogin = async () => {
    const urlParams = new URL(window.location.href).searchParams;
    let query = location.href.split('?')[1];

    const queryStr = urlParams.get('params') || '{}';
    const queryStrObj = JSON.parse(queryStr);

    query += '&' + new URLSearchParams(queryStrObj).toString();
    hideLoginTip();
    const ret = await steamSignUpUsingGET({
      query: query,
    });
    if (ret.status === 0) {
      if (ret.data?.token) {
        localStorage.setItem('token', ret.data.token);
      }
      if (ret.data?.register) {
        window.fbq('trackSingleCustom', '1024868335308144', 'register_success');
        window?.gtag('event', 'conversion', {
          // lanhan
          send_to: 'AW-11366618499/WyYOCOeNlewYEIOrg6wq',
        });
        window?.gtag('event', 'conversion', {
          send_to: 'AW-11379374504/qjkoCPWU7u0YEKjzjbIq',
        });
        window?.gtag('event', 'conversion', {
          send_to: 'AW-11379263638/nQhtCK3-9_AYEJaRh7Iq',
        });
        /* 后续由后台配置平台列表 */
        if (['7', '21']?.includes(ret.data?.promotionChannelId)) {
          // fb 推广用户 注册成功
          window?.fbq('track', 'Lead');
        }
        if (['2'].includes(ret.data?.promotionChannelId)) {
          // gg 推广用户 注册成功
          window?.gtag('event', 'signup_mg');

          /* send to aw */
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11334119378/Kco9CIyyluUYENLfw5wq',
          });
        }
        if (ret.data?.promotionChannelId === '11') {
          // taidong
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11345409756/C-brCIeQy-UYENzt9KEq',
          });
        }
        if (ret.data?.promotionChannelId === '31') {
          // adtiger tt
          window?.ttq?.track('CompleteRegistration');
        }
        if (ret.data?.promotionChannelId === '24') {
          // tiger_2
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11366921880/B4TyCMG24ewYEJjtlawq',
          });
        }
        if (ret.data?.promotionChannelId === '26') {
          // 木瓜 gg2
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11394247259/MztXCNrAifIYENvUmbkq',
          });
        }
        if (ret.data?.promotionChannelId === '33') {
          // 代投-蓝瀚-gg1
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11396650696/Ie9VCM-VifMYEMitrLoq',
          });
        }
        if (ret.data?.promotionChannelId === '34') {
          // 代投-蓝瀚-gg2
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11397467093/qT-ACJinivMYENWX3roq',
          });
        }
        setRegNum(ret?.data?.result || 0);
        showRegTip();
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
