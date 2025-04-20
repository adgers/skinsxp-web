import bgImg from '@/assets/regTip.png';
import { numberFixed } from '@/utils';
import { FormattedMessage, Link, useModel } from '@umijs/max';

import { Modal } from 'react-daisyui';

export default function RegTip() {
  const { regTipShow, hideRegTip, regNum } = useModel('user');

  return (
    <Modal
      open={regTipShow}
      className="w-[300px] h-[355px] sm:w-[445px] sm:h-[525px] border-none p-0 overflow-hidden rounded-md"
    >
      <Modal.Body
        className="flex h-full flex-col items-center px-8 py-6 sm:py-10 bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="w-full h-full relative flex flex-col items-center uppercase">
          <div className="w-full max-w-xs top-[45px] sm:top-[70px] text-center relative font-semibold text-xs sm:text-base">
            <FormattedMessage id="rewards_you" />
          </div>

          <div className="left-[70px] sm:left-[100px] top-[85px] sm:top-[120px] relative flex gap-1 items-center">
            <span className="text-green text-2xl sm:text-3xl font-semibold">R$</span>
            <span className="text-2xl sm:text-3xl font-num">{numberFixed(regNum)}</span>
          </div>

          <Link
            to="/"
            className="btn btn-purple absolute w-full m-auto bottom-0 max-w-[200px] sm:max-w-xs"
            onClick={hideRegTip}
          >
            <FormattedMessage id="got_it" />
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
