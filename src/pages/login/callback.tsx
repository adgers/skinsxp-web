import { steamSignUpUsingGET } from '@/services/front/qiantaishouquanxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function LoginCallback() {
  const { getUser } = useModel('user');
  const steamLogin = async () => {
    const ret = await steamSignUpUsingGET({
      query: location.href.split('?')[1],
    });
    if (ret.status === 0) {
      if (ret.data?.token) {
        localStorage.setItem('token', ret.data.token);
      }

      getUser();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
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
