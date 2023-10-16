import { bindInviterUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { receiveUsingPOST } from '@/services/front/hongbaoxiangguan';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import './index.less';

export default function Benefit() {
  const { benefitShow, hideBenefit, getUser } = useModel('user');
  const [tab, setTab] = useState(1);

  const intl = useIntl();
  const cdKeyCodeRef = useRef<HTMLInputElement>(null);
  const promoCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (benefitShow && tab === 0) {
      promoCodeRef.current?.focus();
    }
    if (benefitShow && tab === 1) {
      cdKeyCodeRef.current?.focus();
    }
  }, [benefitShow, tab]);

  const onGetBenefit = async () => {
    const val = cdKeyCodeRef?.current?.value;
    if (!val) {
      return;
    }
    const ret = await receiveUsingPOST({
      code: val,
    });
    if (ret.status === 0) {
      toast.success(
        intl.formatMessage({
          id: 'wc_cdkey_redeemed_success',
        }),
      );
      getUser();
    }
  };

  // const onBindPromoCode = async () => {
  //   const code = promoCodeRef?.current?.value;
  //   if (!code) return;

  //   if (/^[0-9a-zA-Z]{6,15}$/g.test(code) === false) {
  //     toast.error(intl.formatMessage({ id: 'promoteCode_error' }));
  //     return;
  //   }

  //   const ret = await bindInviterUsingPOST({
  //     invitationCode: code,
  //   });
  //   if (ret.status === 0) {
  //     toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
  //     getUser();
  //   }
  // };

  return (
    <Modal
      open={benefitShow}
      className="w-full max-w-2xl max-h-full overflow-hidden rounded-md border-none"
    >
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={hideBenefit}
      >
        ✕
      </Button>
      {/* <Modal.Header className="mt-2 mb-2 text-center text-sm sm:text-lg">
        <div className="flex w-full justify-center gap-6 h-14 items-center rounded-t-xl">
          <div
            className={`w-full h-full cursor-pointer flex items-center justify-center rounded ${
              tab === 0 ? 'bg-purple/[0.3] text-white' : 'bg-[#23232D] hover:'
            }`}
            onClick={() => setTab(0)}
          >
            <span className="uppercase font-semibold">
              <FormattedMessage id="benefit_promote_code" />
            </span>
          </div>
          <div
            className={`w-full h-full tab-item flex items-center justify-center rounded`}
            onClick={() => setTab(1)}
          >
            <span className="uppercase font-semibold">
              <FormattedMessage id="wc_cdkey_title" />
            </span>
          </div>
        </div>
      </Modal.Header> */}
      <Modal.Body className="w-full flex flex-col items-center mt-5">
        {/* {tab === 0 && (
          <>
            <div className="flex h-fit w-full items-center gap-4 px-2 py-2 sm:py-0  bg-[url('@/assets/promo-bg.png')] bg-no-repeat bg-cover sm:pl-28 sm:pr-8 text-sm sm:text-md whitespace-pre-wrap font-semibold">
              <div className="h-fit w-full grow sm:-mr-20 sm:-ml-16">
                <p className="text-[16px] mb-2">
                  {
                    intl
                      .formatMessage({ id: 'benefit_promo_explain' })
                      .split('\\n')[0]
                  }
                </p>
                <p>
                  {
                    intl
                      .formatMessage({ id: 'benefit_promo_explain' })
                      .split('\\n')[1]?.trim()
                  }
                </p>
              </div>
              <div className="w-48 relative z-10  aspect-square sm:block">
                <img src={require('@/assets/promo-img.png')} alt="" />
              </div>
            </div>
            <div className="w-full mt-5 flex">
              <input
                type="text"
                className=" w-full bg-black rounded pl-4 focus:outline-none"
                ref={promoCodeRef}
                defaultValue={userInfo?.inviterPromotionCode}
                placeholder={intl.formatMessage({ id: 'register_qsryqm' })}
              />

              <div
                className="btn btn-purple uppercase px-10"
                onClick={() => {
                  onBindPromoCode();
                }}
              >
                <FormattedMessage id="text_btn_apply" />
              </div>
            </div>
          </>
        )} */}
        {/* {tab === 1 && (
          <> */}
        <div className="flex h-fit w-full items-center gap-4 px-2 py-2 sm:py-0  bg-[url('@/assets/golden-code-bg.png')] bg-no-repeat bg-cover sm:pl-28 sm:pr-8 text-sm sm:text-md whitespace-pre-wrap font-semibold">
          <div className="h-fit w-full grow sm:-mr-20 sm:-ml-16">
            <p className="text-[16px] mb-2">
              {intl.formatMessage({ id: 'wc_cdkey_explain' }).split('\\n')[0]}
            </p>
            <p>
              {intl
                .formatMessage({ id: 'wc_cdkey_explain' })
                .split('\\n')[1]
                ?.trim()}
            </p>
          </div>
          <div className="w-48 relative z-10  aspect-square sm:block">
            <img src={require('@/assets/golden-code-box.png')} alt="" />
          </div>
        </div>
        <div className="w-full mt-5 flex rounded-xl">
          <input
            type="text"
            className=" w-full bg-black rounded pl-4 focus:outline-none"
            maxLength={12}
            ref={cdKeyCodeRef}
            placeholder={intl.formatMessage({ id: 'wc_cdkey_placeholder' })}
          />

          <div
            className="btn btn-yellow uppercase px-10"
            onClick={onGetBenefit}
          >
            <FormattedMessage id="text_btn_apply" />
          </div>
        </div>
        {/* </> */}
        {/* )} */}
      </Modal.Body>
    </Modal>
  );
}
