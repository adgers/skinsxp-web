import bgImg from '@/assets/loginTipBg.png';
import { FormattedMessage, useModel } from '@umijs/max';

import { Button, Modal } from 'react-daisyui';

export default function LoginTip() {
  const { loginTipShow, hideLoginTip, showSteamLogin } = useModel('user');

  return (
    <Modal
      open={loginTipShow}
      className="w-[300px] h-[316px] sm:w-[445px] sm:h-[470px] border-none p-0 overflow-hidden rounded-md"
    >
      <Modal.Body
        className="flex h-full flex-col items-center px-8 py-6 sm:py-10 bg-no-repeat bg-contain"
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
              <FormattedMessage id="loginTip_gift" />{' '}
            </div>

            <div className=" mt-1 text-white text-xl font-semibold text-center">
              <FormattedMessage id="loginTip_bonus" />
            </div>
          </div>
          {/* <div className="absolute top-[120px] sm:top-[170px] w-[50px] sm:w-[75px] left-0 sm:left-[10px] font-semibold text-right sm:text-xl">
            <FormattedMessage id="loginTip_up" />
          </div>
          <div
            className="absolute top-[90px] sm:top-[140px] right-0 sm:right-[10px] w-[100px] sm:w-[160px] font-bold text-center"
            style={{
              backgroundImage:
                'linear-gradient(270deg, #FFB1B6 0%, #FFEEF4 43.4%, #FFC8DE 93.42%)',
              WebkitBackgroundClip: 'text',
              overflow: 'visible',
              color: 'transparent',
            }}
          >
            <FormattedMessage id="roll_room_title" />
          </div> */}

          <Button
            className="btn btn-purple absolute w-full m-auto bottom-0 max-w-xs"
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
