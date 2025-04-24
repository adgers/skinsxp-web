import { steamSignUpUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import { doGoogleLogin } from '@/services/common/tongyongxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function LoginCallback() {
  const { getUser, hideLoginTip, showRegTip, setRegNum } = useModel('user');

  const steamLogin = async () => {
    console.log("steam 回调")
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
        window.fbq('trackSingleCustom', '328518876380399', 'register_success');
        
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
        // if (['7', '21', '12']?.includes(ret.data?.promotionChannelId)) {
        //   // fb 推广用户 注册成功
        //   // window?.fbq('track', 'Lead');
        //   window.fbq(
        //     'trackSingleCustom',
        //     '328518876380399',
        //     'register_success',
        //   );
        // }
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
        if (ret.data?.promotionChannelId === '23') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11379374504/qjkoCPWU7u0YEKjzjbIq',
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

  const googleLogin = async () => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const auth_code = params.get('auth_code');
    const state = params.get('state');
    const authorization_code = params.get('authorization_code');
    // const oauth_token = params.get('oauth_token');
    // const oauth_verifier = params.get('oauth_verifier');

    // 确保至少有 code 或其他必要参数
    if (!code && !auth_code && !authorization_code) {
      history.push('/login');
      return;
    }

    hideLoginTip();
    const ret = await doGoogleLogin({
      code: code || auth_code || authorization_code,
      state,
    });

    if (ret.status === 0) {
      console.log(ret);
      if (ret.data?.token) {
        localStorage.setItem('token', ret.data.token);
      }
      if (ret.data?.register) {
        window.fbq('trackSingleCustom', '1024868335308144', 'register_success');
        window.fbq('trackSingleCustom', '328518876380399', 'register_success');

        window?.gtag('event', 'conversion', {
          send_to: 'AW-11366618499/WyYOCOeNlewYEIOrg6wq',
        });
        window?.gtag('event', 'conversion', {
          send_to: 'AW-11379374504/qjkoCPWU7u0YEKjzjbIq',
        });
        window?.gtag('event', 'conversion', {
          send_to: 'AW-11379263638/nQhtCK3-9_AYEJaRh7Iq',
        });

        if (['2'].includes(ret.data?.promotionChannelId)) {
          window?.gtag('event', 'signup_mg');
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11334119378/Kco9CIyyluUYENLfw5wq',
          });
        }
        if (ret.data?.promotionChannelId === '11') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11345409756/C-brCIeQy-UYENzt9KEq',
          });
        }
        if (ret.data?.promotionChannelId === '31') {
          window?.ttq?.track('CompleteRegistration');
        }
        if (ret.data?.promotionChannelId === '24') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11366921880/B4TyCMG24ewYEJjtlawq',
          });
        }
        if (ret.data?.promotionChannelId === '26') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11394247259/MztXCNrAifIYENvUmbkq',
          });
        }
        if (ret.data?.promotionChannelId === '33') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11396650696/Ie9VCM-VifMYEMitrLoq',
          });
        }
        if (ret.data?.promotionChannelId === '34') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11397467093/qT-ACJinivMYENWX3roq',
          });
        }
        if (ret.data?.promotionChannelId === '23') {
          window?.gtag('event', 'conversion', {
            send_to: 'AW-11379374504/qjkoCPWU7u0YEKjzjbIq',
          });
        }
        setRegNum(ret?.data?.result || 0);
        showRegTip();
      }

      getUser();
      const queryStr = params.get('params') || '{}';
      const queryStrObj = JSON.parse(queryStr);
      history.push(queryStrObj.callbackUrl || '/');
    } else {
      history.push('/login');
    }
  };

  // useEffect(() => {
  //   steamLogin();
  // }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const auth_code = params.get('auth_code');
    const authorization_code = params.get('authorization_code');

    // 如果有 Google 登录相关参数，调用 Google 登录
    if (code || auth_code || authorization_code) {
      googleLogin();
    } else {
      // 否则执行 Steam 登录
      steamLogin();
    }
  }, []);

  return (
    <div className="w-full min-h-[500px] flex justify-center items-center">
      <div className="uppercase text-green font-semibold flex gap-2">
        <LoadingOutlined />
      </div>
    </div>
  );
}
