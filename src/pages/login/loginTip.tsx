import bgImg from '@/assets/loginTipBg.png';
import { FormattedMessage, useModel } from '@umijs/max';

import { Button, Modal } from 'react-daisyui';

export default function LoginTip() {
  const { loginTipShow, hideLoginTip, showSteamLogin } = useModel('user');

  return (
    <Modal
      open={loginTipShow}
      className="w-[300px] h-[340px] border-none p-0 overflow-hidden rounded-md"
    >
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={() => hideLoginTip()}
      >
        ✕
      </Button>
      <Modal.Body
        className="flex h-full flex-col items-center px-8 py-6 bg-no-repeat  bg-cover "
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="w-full h-full relative flex flex-col items-center uppercase">
          <div className="flex flex-col items-center text-[30px] font-bold leading-none">
            <div
              className=""
              style={{
                backgroundImage:
                  'linear-gradient(270deg, #CB90FF 0%, #FAF3FF 93.42%)',
                WebkitBackgroundClip: 'text',
                overflow: 'visible',
                color: 'transparent',
              }}
            >
              <FormattedMessage id="loginTip_sign" />{' '}
            </div>
            <div className="flex justify-center mt-2">
              <div
                style={{
                  backgroundImage:
                    'linear-gradient(270deg, #CB90FF 0%, #FAF3FF 93.42%)',
                  WebkitBackgroundClip: 'text',
                  overflow: 'visible',
                  color: 'transparent',
                }}
                className="mr-1"
              >
                <FormattedMessage id="loginTip_get" />
              </div>
              <div
                style={{
                  backgroundImage:
                    'linear-gradient(0deg, #FEF38C 17.5%, #F09402 50.81%, #FEF37E 77.92%)',
                  WebkitBackgroundClip: 'text',
                  overflow: 'visible',
                  color: 'transparent',
                }}
              >
                <FormattedMessage id="loginTip_jl" />
              </div>
            </div>
          </div>
          <div className="absolute top-[128px] w-[50px] left-0 font-semibold text-right">
            <FormattedMessage id="loginTip_up" />
          </div>
          <div
            className="absolute top-[114px] right-0 w-[100px] font-bold text-center"
            style={{
              backgroundImage:
                'linear-gradient(270deg, #FFB1B6 0%, #FFEEF4 43.4%, #FFC8DE 93.42%)',
              WebkitBackgroundClip: 'text',
              overflow: 'visible',
              color: 'transparent',
            }}
          >
            <FormattedMessage id="roll_room_title" />
          </div>

          <Button
            className="btn btn-purple  absolute m-auto bottom-0 w-[50%] md:w-[60%] "
            onClick={() => {
              hideLoginTip();
              showSteamLogin();
            }}
          >
            <FormattedMessage id="sign_in" />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
