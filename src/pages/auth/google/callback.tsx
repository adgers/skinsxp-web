import { doGoogleLogin } from '@/services/common/tongyongxiangguan';
import { useLocation, useNavigate } from '@umijs/max';
import { useEffect } from 'react';

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // 1. 获取 URL 中的 code 参数
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const auth_code = params.get('auth_code');
      const state = params.get('state');
      const authorization_code = params.get('authorization_code');
      const oauth_token = params.get('oauth_token');
      const oauth_verifier = params.get('oauth_verifier');

      console.log('Google 回调 URL:', window.location.href);
      console.log('code:', code);
      console.log('auth_code:', auth_code);
      console.log('state:', state);
      console.log('authorization_code:', authorization_code);
      console.log('oauth_token:', oauth_token);
      console.log('oauth_verifier:', oauth_verifier);

      if (!code) {
        console.error('未获取到授权码');
        // message.error('授权失败');
        navigate('/case');
        return;
      }

      try {
        // 2. 将授权码发送到后端
        console.log('开始发送授权码到后端...');
        // const response = await fetch('https://183.221.3.151:9999/auth/google/callback', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ code }),
        // });
        const data = doGoogleLogin({
          code,
          state,
        });

        console.log('后端返回数据:', data);

        // if (data.success) {
        //   // 3. 保存用户信息和 token
        //   localStorage.setItem('token', data.token);
        //   localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        //   message.success('登录成功');
        //   navigate('/');
        // } else {
        //   message.error(data.message || '登录失败');
        //   navigate('/login');
        // }
      } catch (error) {
        // console.error('处理授权码时出错:', error);
        // message.error('登录失败');
        // navigate('/login');
      }
    };

    // 立即执行回调处理
    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">正在处理登录...</p>
      </div>
    </div>
  );
}
