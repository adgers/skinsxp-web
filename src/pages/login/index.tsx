import { IconFont } from '@/components/icons';
import { getSteamLoginUrl } from '@/utils';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'react-daisyui';
import loginBg from '@/assets/login-bg.png';

export default function LoginPage() {
  return (
    <div className="z-10 flex flex-col justify-center items-center mt-20">
     <img src={loginBg} alt="" className="w-1/3 sm:w-1/4" />
      <h2 className="mt-5 text-[1.6vw] leading-none text-green font-bold">
        <FormattedMessage id="not_login_title" />
      </h2>
      <p className="mt-4 text-sm leading-tight text-gray font-light text-center">
        <FormattedMessage id="not_login_subtitle" />
      </p>
      <Button
        className="mt-5 btn btn-primary w-52"
        onClick={() => (location.href = getSteamLoginUrl())}
      >
        <IconFont type="icon-steam" className="text-xl" />
        <FormattedMessage id="register_ljdl" />
      </Button>
    </div>
  );
}
