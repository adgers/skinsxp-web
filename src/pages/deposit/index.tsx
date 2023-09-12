import { IconFont } from '@/components/icons';
import {
  makePaymentUsingPOST,
  paymentStateUsingGET,
  rechargeConfigUsingGET,
  rechargeDiscountInfoUsingGET,
} from '@/services/front/chongzhixiangguan';
import { bindInviterUsingPOST } from '@/services/front/gerenzhongxinxiangguan';
import { getImgHost, goback, numberFixed } from '@/utils';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import { configResponsive, useResponsive } from 'ahooks';
import { remove } from 'lodash';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

configResponsive({
  large: 1024,
});
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
  const [currentTab, setCurrentTab] = useState<number>(2); // 1 | 2
  const [selectCurrency, setSelectCurrency] = useState<API.CurrencyRateVo>();
  const [selectChannel, setSelectChannel] = useState<API.RechargeChannelVo>();
  const [promoCodeState, setPromoCodeState] = useState<number>(
    PromoCodeState.EDIT,
  );
  const [quantity, setQuantity] = useState(0);
  const { currencyRateVoList, rechargeAmountAllowList, rechargeChannelList } =
    rechargeConfig || {};
  const [payOrderId, setPayOrderId] = useState<string>();
  const responsive = useResponsive();
  const intl = useIntl();
  const promoCodeRef = useRef<HTMLInputElement>(null);

  const showTab = !responsive?.large;

  const onBindPromoCode = async () => {
    const code = promoCodeRef?.current?.value;
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
      currencyCode: selectCurrency?.currencyFrom || '',
      quantity,
      rechargeChannelId: selectChannel?.id || 0,
    });
    if (ret.status === 0) {
      if (ret.data?.payUrl) {
        window.open(ret.data.payUrl);
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
            <Menu.Button className="select select-sm md:select-md select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none bg-black">
              <div>
                <FormattedMessage id="deposit_currency" />
              </div>
              <div>{selectCurrency?.currencyFrom || 'please select'}</div>
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
                {currencyRateVoList?.map((item) => (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-accent bg-opacity-10' : ''
                        } flex justify-between items-center p-2 text-sm rounded`}
                        onClick={() => setSelectCurrency(item)}
                      >
                        {item.currencyFrom}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <ul className="grid min-h-0 w-full grid-cols-2 gap-3 md:grid-cols-3">
            {rechargeChannelList?.map((item, index) => {
              if (
                item?.currencyCodeList?.includes(selectCurrency?.currencyFrom)
              )
                return (
                  <li className="h-[8rem] min-h-[5rem] md:h-auto" key={index}>
                    <div
                      className={`trainstion relative cursor-pointer flex items-center justify-center h-full min-h-0 flex-col rounded-lg border bg-black bg-opacity-90 bg-clip-padding bg-no-repeat outline-none  duration-300 focus:outline-none focus-visible:light ${
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
  }, [
    selectCurrency,
    selectChannel,
    currencyRateVoList,
    loading,
    rechargeConfig,
  ]);

  const renderQuantity = useMemo(() => {
    if (!loading && rechageInfo && rechargeConfig)
      return (
        <div className="flex flex-col">
          {selectChannel?.displayType === DisplayType.DEFAULT && (
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
                    ref={promoCodeRef}
                    placeholder={intl.formatMessage({ id: 'register_qsryqm' })}
                  />
                ) : promoCodeState === PromoCodeState.USING ? (
                  <div className="flex-1 flex h-full rounded-lg items-center pl-8 bg-light/20 text-sm">
                    <div className="text-white/50 mr-2">
                      <FormattedMessage id="promoteCode_mine" />:
                    </div>
                    <div className="text-green text-md font-semibold">
                      {userInfo?.inviterPromotionCode}
                      {Number(rechageInfo?.rechargeDiscount) > 0 && (
                        <span className="ml-2">
                          + &nbsp;{Number(rechageInfo?.rechargeDiscount)}
                          %&nbsp;
                          <FormattedMessage id="vip_discount" />
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex h-full rounded-lg items-center pl-8 bg-light/20 text-sm">
                    <LoadingOutlined className="mr-2" />
                    <div className="text-white/50 mr-2">
                      {promoCodeRef?.current?.value}
                    </div>
                  </div>
                )}

                <div
                  className={`btn btn-green uppercase px-10 ${
                    userInfo?.inviterPromotionCode ? 'btn-disabled' : ''
                  }`}
                  onClick={() => {
                    switch (promoCodeState) {
                      case PromoCodeState.EDIT:
                        onBindPromoCode();
                        break;
                      case PromoCodeState.VERIFY:
                      case PromoCodeState.USING:
                        break;
                    }
                  }}
                >
                  <FormattedMessage id="text_btn_apply" />
                </div>
              </div>
            </>
          )}
          {selectChannel?.displayType !== DisplayType.HIDDEN_PROMO_ACCOUNT && (
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
                <div className="flex gap-x-8">
                  <div className="flex flex-col w-fit gap-2">
                    <div className="uppercase  text-xs">
                      <FormattedMessage id="quantity" />
                    </div>
                    <div className="flex h-[40px] w-[176px] overflow-hidden pl-4 rounded border border-light text-xs font-bold items-center">
                      {selectCurrency?.symbol}
                      <div>
                        {numberFixed((selectCurrency?.rate || 0) * quantity, 2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="uppercase text-xs">
                      <FormattedMessage id="deposit_actually_recevied" />
                    </div>
                    <div className="font-num h-[40px] flex items-center gap-2">
                      <span className="text-green">
                        {selectCurrency?.symbol}
                        {numberFixed((selectCurrency?.rate || 0) * quantity, 2)}
                      </span>
                      &nbsp;+&nbsp;
                      <span className="text-purple">
                        <IconFont type="icon-coin" className="mr-1" />
                        {numberFixed(
                          (Number(quantity) *
                            Number(rechageInfo?.rechargeDiscount)) /
                            100,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-green btn-sm md:btn-md uppercase w-full rounded font-semibold"
                  onClick={onPay}
                  type="button"
                >
                  <FormattedMessage id={'pay_amount'} />{' '}
                  {selectCurrency?.symbol}
                  {numberFixed((selectCurrency?.rate || 0) * quantity, 2)}
                </button>
              </div>
            </>
          )}
          {selectChannel?.displayType === DisplayType.HIDDEN_PROMO_ACCOUNT && (
            <button
              className="btn btn-green btn-sm md:btn-md uppercase w-full rounded font-semibold"
              onClick={onPay}
              type="button"
            >
              <FormattedMessage id="deposit_pay" />
            </button>
          )}
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
  ]);

  useEffect(() => {
    if (rechargeAmountAllowList && rechargeAmountAllowList.length > 0) {
      setQuantity(rechargeAmountAllowList[0]);
    }
    if (currencyRateVoList && currencyRateVoList.length > 0) {
      setSelectCurrency(currencyRateVoList[0]);
    }
  }, [rechargeConfig]);

  let interval: any = null;

  const checkPayStatus = async (id: string) => {
    const ret = await paymentStateUsingGET({ orderId: id });
    if (ret.status === 0) {
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
      setPromoCodeState(PromoCodeState.USING);
    }
  }, [userInfo?.inviterPromotionCode]);

  useEffect(() => {
    if (rechargeChannelList?.length && currencyRateVoList?.length) {
      let curChannelList = JSON.parse(JSON.stringify(rechargeChannelList));
      remove(
        curChannelList,
        (item) =>
          !item?.currencyCodeList?.includes(selectCurrency?.currencyFrom),
      );
      setSelectChannel(curChannelList?.[0] || null);
    }
  }, [selectCurrency, rechargeChannelList, currencyRateVoList]);

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
          className={`flex h-12 items-center justify-center cursor-pointer ${
            currentTab === 1 ? 'text-green font-bold border-b border-green' : ''
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
          className={`flex h-12 items-center justify-center cursor-pointer  ${
            currentTab === 2 ? 'text-green font-bold border-b border-green' : ''
          }`}
        >
          <FormattedMessage id="deposit_pay" />
        </div>
      </div>
      {!showTab ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
          {renderChannel}
          {renderQuantity}
        </div>
      ) : (
        <div>
          {currentTab === 1 ? <>{renderChannel}</> : <>{renderQuantity}</>}
        </div>
      )}
    </div>
  );
}
