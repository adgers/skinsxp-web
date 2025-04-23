import loginBg from '@/assets/login-bg.png';
import { IconFont } from '@/components/icons';
import { FormattedMessage, useModel } from '@umijs/max';
import { Button } from 'react-daisyui';

export default function LoginPage() {
  const { showSteamLogin } = useModel('user');
  return (
    <div className="z-10 flex flex-col justify-center items-center mt-20">
      <img src={loginBg} alt="" className="w-1/3 sm:w-1/3" />
      <h2 className="mt-5 text-[1.6vw] leading-none text-green font-semibold">
        <FormattedMessage id="not_login_subtitle" />
      </h2>


      {/* <Button
        className="mt-5 w-52 btn  text-black gap-1 rounded uppercase"
        onClick={() => showSteamLogin()}
        style={{
          background: 'linear-gradient(270deg, #0BFF59 0%, #B4FC3B 100%)',
        }}
      >
        <IconFont type="icon-steam" className="text-xl" />
        <FormattedMessage id="register_ljdl" />
      </Button> */}
    </div>
  );
}
