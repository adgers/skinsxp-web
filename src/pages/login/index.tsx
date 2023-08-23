import loginBg from '@/assets/login-bg.png';
import { IconFont } from '@/components/icons';
import { getSteamLoginUrl } from '@/utils';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'react-daisyui';

export default function LoginPage() {
  return (
    <div className="z-10 flex flex-col items-center justify-center py-16">
      <img src={loginBg} alt="" className="w-3/4 sm:w-1/3" />
      <h2 className="mt-4 font-bold leading-none uppercase text-secondary">
        <FormattedMessage id="not_login_title" />
      </h2>
      <p className="mt-4 text-sm font-light leading-tight text-center">
        <FormattedMessage id="not_login_subtitle" />
      </p>
      <Button
        className="mt-5 btn btn-primary w-52"
        onClick={() => (location.href = getSteamLoginUrl())}
      >
        <IconFont type="icon-steam1" className="text-xl" />
        <FormattedMessage id="register_ljdl" />
      </Button>
    </div>
  );
}
