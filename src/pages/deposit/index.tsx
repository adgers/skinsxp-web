import {
  makePaymentUsingPOST,
  paymentStateUsingGET,
  rechargeConfigUsingGET,
  rechargeDiscountInfoUsingGET,
} from '@/services/front/chongzhixiangguan';
import { bindInviterUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { getImgHost, goback, langs, numberFixed } from '@/utils';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import {
  FormattedMessage,
  getLocale,
  useIntl,
  useModel,
  useRequest,
} from '@umijs/max';
import { useResponsive } from 'ahooks';
import { Spin } from 'antd';
import { remove } from 'lodash';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

enum PromoCodeState { // 只要有邀请码 就不能编辑了
  USING = 1, // 正在使用
  EDIT = 2, // 正在编辑
  VERIFY = 3, // 正在校验
}
enum DisplayType { //  0:默认、1:不展示邀请码、2、不展示邀请码和充值数
  DEFAULT = 0,
  HIDDEN_PROMO,
  HIDDEN_PROMO_ACCOUNT,
}

export default function Deposit() {
  const { getUser, userInfo } = useModel('user');
  const { data: rechargeConfig, loading } = useRequest(() =>
    rechargeConfigUsingGET(),
  );
  const { data: rechageInfo } = useRequest(() =>
    rechargeDiscountInfoUsingGET(),
  );
  const [currentTab, setCurrentTab] = useState<number>(1); // 1 | 2
  const [selectCurrency, setSelectCurrency] = useState<string>('');
  const [selectChannel, setSelectChannel] = useState<API.RechargeChannelVo>();
  const [promoCodeState, setPromoCodeState] = useState<number>(
    PromoCodeState.EDIT,
  );
  const [inputCode, setInputCode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const { languageList, rechargeAmountAllowList, rechargeChannelList } =
    rechargeConfig || {};
  const [payOrderId, setPayOrderId] = useState<string>();
  const responsive = useResponsive();
  const intl = useIntl();

  const showTab = !responsive?.lg;

  const onBindPromoCode = async () => {
    const code = inputCode;
    if (!code) return;

    if (/^[0-9a-zA-Z]{6,15}$/g.test(code) === false) {
      toast.error(intl.formatMessage({ id: 'promoteCode_error' }));
      return;
    }
    /* verifying */
    setPromoCodeState(PromoCodeState.VERIFY);
    const ret = await bindInviterUsingPOST({
      invitationCode: code,
    });
    if (ret.status === 0) {
      toast.success(intl.formatMessage({ id: 'mine_xgcg' }));
      getUser();
    }
    if (ret.status === 1) {
      /* bind code fail , to edit */
      setPromoCodeState(PromoCodeState.EDIT);
    }
  };

  const onPay = async () => {
    if (!selectChannel) {
      toast.error(intl.formatMessage({ id: 'recharge_unselect_channcel' }));
      return;
    }
    const ret = await makePaymentUsingPOST({
      // couponId: selectCoupon?.id,
      // currencyCode: selectCurrency || '',
      quantity,
      rechargeChannelId: selectChannel?.id || 0,
    });
    if (ret.status === 0) {
      if (ret.data?.payUrl) {
        setTimeout(() => {
          window.open(ret?.data?.payUrl, '_blank');
        });
      }
      if (ret.data?.orderId) {
        setPayOrderId(ret.data.orderId);
      }
    }
  };

  const renderChannel = useMemo(() => {
    if (!loading && rechargeConfig)
      return (
        <div className="flex flex-col gap-4">
          <Menu as="div" className="relative">
            <Menu.Button className="select select-md select-accent border-opacity-50 rounded w-full font-semibold flex justify-between items-center focus:outline-none bg-black">
              <div className="flex gap-1 items-center">
                <img
                  src={
                    langs.find((item) => item.value === selectCurrency)?.flag
                  }
                  className="w-5 h-5"
                />
                {langs.find((item) => item.value === selectCurrency)?.title}
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-full bg-dark ring-1 ring-accent rounded origin-top-left p-1 z-50">
                {langs?.map((item) => (
                  <Menu.Item key={item.value}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-accent bg-opacity-10' : ''
                        } flex items-center p-2 gap-2 text-sm rounded`}
                        onClick={() => setSelectCurrency(item.value)}
                      >
                        <img src={item.flag} className="w-5" />
                        <span>{item.title}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <ul className="grid min-h-0 w-full grid-cols-2 gap-3 md:grid-cols-3">
            {rechargeChannelList?.map((item, index) => {
              if (item?.languageCode?.includes(selectCurrency))
                return (
                  <li className="h-[8rem] min-h-[5rem] md:h-auto" key={index}>
                    <div
                      className={`trainstion relative cursor-pointer flex items-center justify-center h-full min-h-0 flex-col rounded-lg border bg-black bg-opacity-90 bg-clip-padding bg-no-repeat outline-none overflow-hidden duration-300 focus:outline-none focus-visible:light ${
                        item?.id === selectChannel?.id
                          ? 'border-green'
                          : 'border-light'
                      }`}
                      onClick={() => {
                        setSelectChannel(item);
                        if (showTab) {
                          setCurrentTab(2);
                        }
                      }}
                    >
                      <img
                        src={`${getImgHost()}${item?.logo}.png`}
                        className="h-full min-h-0 w-full max-w-full object-contain text-center leading-[100px]"
                        alt="visa_mastercard"
                      />
                    </div>
                  </li>
                );
            })}
          </ul>
        </div>
      );
  }, [selectCurrency, selectChannel, languageList, loading, rechargeConfig]);

  const renderQuantity = useMemo(() => {
    if (!loading && rechageInfo && rechargeConfig)
      return (
        <div className="flex flex-col">
          {
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
                    {intl
                      .formatMessage({ id: 'benefit_promo_explain' })
                      .split('\\n')[1]
                      ?.trim()}
                  </p>
                  <p className="mt-2">
                    <FormattedMessage id="deposit_default_tgmnr" />
                    <span className="text-primary ml-2">{`"WGSKINS"`}</span>
                  </p>
                </div>
                <div className="w-48 relative z-10  aspect-square sm:block">
                  <img src={require('@/assets/promo-img.png')} alt="" />
                </div>
              </div>
              <div className="w-full mt-5 flex justify-between gap-4 mb-4 items-center">
                {promoCodeState === PromoCodeState.EDIT ? (
                  <input
                    type="text"
                    className="w-full bg-black rounded pl-4 border border-light focus:outline-none h-12"
                    placeholder={intl.formatMessage({
                      id: 'deposit_promoteCode_placeholder',
                    })}
                    onChange={(e) => setInputCode(e?.target?.value)}
                    value={inputCode}
                  />
                ) : promoCodeState === PromoCodeState.USING ? (
                  <div className="flex-1 flex rounded-lg items-center pl-8 bg-light/20 text-sm h-12">
                    <div className="text-white/50 mr-2">
                      <FormattedMessage id="benefit_promote_code" />:
                    </div>
                    <div className="text-green text-md font-semibold">
                      {userInfo?.inviterPromotionCode}
                      {Number(userInfo?.rebateValue) > 0 && (
                        <span className="ml-2">
                          + &nbsp;
                          {userInfo?.rebateType === 0
                            ? `${Number(userInfo?.rebateValue)}%`
                            : Number(userInfo?.rebateValue)}
                          &nbsp;
                          <FormattedMessage id="vip_discount" />
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex h-full rounded-lg items-center pl-8 bg-light/20 text-sm">
                    <LoadingOutlined className="mr-2" />
                    <div className="text-white/50 mr-2">{inputCode}</div>
                  </div>
                )}

                <div
                  className="btn btn-green uppercase px-10"
                  onClick={() => {
                    switch (promoCodeState) {
                      case PromoCodeState.USING:
                        setPromoCodeState(PromoCodeState.EDIT);
                        break;

                      case PromoCodeState.EDIT:
                        if (inputCode) {
                          if (inputCode !== userInfo?.inviterPromotionCode) {
                            onBindPromoCode();
                          } else {
                            setInputCode('');
                          }
                        } else {
                          if (userInfo?.inviterPromotionCode) {
                            setPromoCodeState(PromoCodeState.USING);
                            setInputCode('');
                          }
                        }

                        break;
                      case PromoCodeState.VERIFY:
                        break;
                    }
                  }}
                >
                  {promoCodeState === PromoCodeState.USING ||
                  inputCode === userInfo?.inviterPromotionCode ? (
                    <FormattedMessage id="edit" />
                  ) : !!inputCode?.trim() ? (
                    <FormattedMessage id="text_btn_apply" />
                  ) : (
                    <FormattedMessage id="cancel" />
                  )}
                </div>
              </div>
            </>
          }
          {
            <>
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {rechargeAmountAllowList?.map((item, i) => (
                  <div
                    className={`rounded flex items-center py-3 justify-center relative cursor-pointer ${
                      quantity === item
                        ? 'bg-green/[0.3] border border-green'
                        : 'bg-light/20 '
                    }`}
                    key={i}
                    onClick={() => {
                      setQuantity(item);
                    }}
                  >
                    ${numberFixed(item)}
                  </div>
                ))}
              </div>
              <div className="rounded-lg py-3 md:py-6 flex flex-col gap-6">
                <div className="">
                  <div className="flex w-full gap-2">
                    <div className="uppercase text-xs flex items-center">
                      <FormattedMessage id="deposit_actually_recevied" />
                    </div>
                    <div className="font-num h-[40px] flex items-center gap-2">
                      <span className="text-green">
                        ${numberFixed(quantity, 2)}
                      </span>
                      {Number(userInfo?.firstRechargeRebate) > 0 && (
                        <div className="text-xs font-light flex items-center">
                          <span className="text-green font-semibold whitespace-nowrap">
                            +$
                            {numberFixed(
                              (Number(quantity) *
                                Number(userInfo?.firstRechargeRebate)) /
                                100,
                            )}
                          </span>
                          <span className="w-fit">
                            （<FormattedMessage id="benifit_scfl" />）
                          </span>
                        </div>
                      )}
                      {Number(userInfo?.rebateValue) > 0 && (
                        <div className="text-xs font-light flex items-center">
                          <span className="text-green font-semibold">
                            +$
                            {userInfo?.rebateType === 0
                              ? `${numberFixed(
                                  (Number(quantity) *
                                    Number(userInfo?.rebateValue)) /
                                    100,
                                )}`
                              : Number(userInfo?.rebateValue)}
                          </span>
                          <span>
                            （<FormattedMessage id="vip_discount" />）
                          </span>
                        </div>
                      )}
                      {/* {selectChannel?.displayType === DisplayType.DEFAULT && (
                        <>
                          &nbsp;+&nbsp;
                          <span className="text-purple">
                            <IconFont type="icon-coin" className="mr-1" />
                            {numberFixed(
                              (Number(quantity) *
                                Number(rechageInfo?.rechargeDiscount)) /
                                100,
                            )}
                          </span>
                        </>
                      )} */}
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-green btn-sm md:btn-md uppercase w-full rounded font-semibold"
                  onClick={() => {
                    onPay();
                    window?.fbq(
                      'trackSingleCustom',
                      '1024868335308144',
                      'click_CHECKOUT',
                    );
                    window?.gtag('event', 'conversion', {
                      send_to: 'AW-11345409756/X-e6CI2Qy-UYENzt9KEq',
                    });
                  }}
                  type="button"
                >
                  <FormattedMessage id={'pay_amount'} /> $
                  {numberFixed(quantity, 2)}
                </button>
              </div>
            </>
          }
        </div>
      );
  }, [
    rechargeAmountAllowList,
    quantity,
    selectCurrency,
    loading,
    rechageInfo,
    selectChannel,
    promoCodeState,
    languageList,
    inputCode,
  ]);

  useEffect(() => {
    if (rechargeAmountAllowList && rechargeAmountAllowList.length > 0) {
      setQuantity(rechargeAmountAllowList[0]);
    }
    if (languageList && languageList.length > 0) {
      const locale = getLocale();
      if (languageList.includes(locale)) {
        setSelectCurrency(locale);
      } else {
        setSelectCurrency(languageList[0]);
      }
    }
  }, [rechargeConfig]);

  let interval: any = null;

  const checkPayStatus = async (id: string) => {
    const ret = await paymentStateUsingGET({ orderId: id });

    if (ret?.data?.state === 1) {
      window?.fbq('trackSingleCustom', '1024868335308144', 'payment_success');
    }
    if (ret?.data?.state === 1 && ret?.data?.firstRechargeFlag) {
      /* 后续由后台配置平台列表 */
      // 首次充值成功
      window?.fbq('trackSingleCustom', '1024868335308144', 'fistRecharge');

      if (['3', '7']?.includes(userInfo?.promotionChannelId)) {
        // fb
        window?.fbq('track', 'Purchase', {
          currency: 'USD',
          value: ret?.data?.quantity,
        });
      }
      if (['2'].includes(userInfo?.promotionChannelId)) {
        // 木瓜
        // ga
        window?.gtag('event', 'first_purchase_mg', {
          currency: 'USD',
          value: ret?.data?.quantity,
        });
        /* send to aw */
        window?.gtag('event', 'conversion', {
          send_to: 'AW-11334119378/EidNCImyluUYENLfw5wq',
          value: ret?.data?.quantity,
          currency: 'USD',
        });

        window?.gtag('event', 'conversion', {
          send_to: 'AW-11345409756/UtjlCJCQy-UYENzt9KEq',
          value: ret?.data?.quantity,
          currency: 'USD',
        });
      }
      toast.success(intl?.formatMessage({ id: 'deposit_success' }));
      getUser();
      if (interval) {
        clearInterval(interval);
      }
    }
  };

  useEffect(() => {
    if (payOrderId) {
      interval = setInterval(() => {
        checkPayStatus(payOrderId);
      }, 2000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [payOrderId]);

  useEffect(() => {
    if (!!userInfo?.inviterPromotionCode) {
      /* has promoCode, can not edit */
      setInputCode('');
      setPromoCodeState(PromoCodeState.USING);
    }
  }, [userInfo?.inviterPromotionCode]);

  useEffect(() => {
    if (rechargeChannelList?.length && languageList?.length) {
      let curChannelList = JSON.parse(JSON.stringify(rechargeChannelList));
      remove(
        curChannelList,
        (item) => !item?.languageCode?.includes(selectCurrency),
      );
      setSelectChannel(curChannelList?.[0] || null);
    }
  }, [selectCurrency, rechargeChannelList, languageList]);

  return (
    <div className="max-w-[1400px] m-auto px-3 md:px-6">
      <div className="my-5 flex w-full flex-col justify-between border-b border-light lg:mb-0 lg:mt-8 lg:flex-row">
        <div className="-mb-px items-center border-b border-green pb-6 pr-6 font-semibold uppercase text-white flex gap-3">
          <div className="-my-2 text-white cursor-pointer" onClick={goback}>
            <LeftOutlined />
          </div>
          <FormattedMessage id="wc_rewards_deposit" />
        </div>
      </div>
      <div className="relative mb-8 grid grid-cols-2 border-b border-light font-light lg:hidden">
        <div className="absolute bottom-0 left-0 h-0.5 w-1/2 transform bg-gold transition-transform duration-300 translate-x-full"></div>
        <div
          className={`flex h-12 items-center justify-center cursor-pointer font-semibold ${
            currentTab === 1 ? 'text-green border-b border-green' : ''
          } `}
          onClick={() => {
            if (currentTab !== 1) {
              setCurrentTab(1);
              setSelectChannel();
            }
          }}
        >
          <FormattedMessage id="deposit_choose_method" />
        </div>
        <div
          className={`flex h-12 items-center justify-center cursor-pointer font-semibold ${
            currentTab === 2 ? 'text-green border-b border-green' : ''
          }`}
        >
          <FormattedMessage id="deposit_pay" />
        </div>
      </div>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
      >
        {!showTab ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5 min-h-16">
            {renderChannel}
            {renderQuantity}
          </div>
        ) : (
          <div className="min-h-[300px]">
            {currentTab === 1 ? <>{renderChannel}</> : <>{renderQuantity}</>}
          </div>
        )}
      </Spin>
    </div>
  );
}
