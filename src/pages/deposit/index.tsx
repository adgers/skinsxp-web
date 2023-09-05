import {
  makePaymentUsingPOST,
  paymentStateUsingGET,
  rechargeConfigUsingGET,
  rechargeDiscountInfoUsingGET,
} from '@/services/front/chongzhixiangguan';
import { goback, numberFixed } from '@/utils';
import { LeftOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { FormattedMessage, useIntl, useModel, useRequest } from '@umijs/max';
import { configResponsive, useResponsive } from 'ahooks';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

configResponsive({
  large: 1024,
});
export default function Deposit() {
  const { getUser } = useModel('user');
  const { data: rechargeConfig, loading } = useRequest(() =>
    rechargeConfigUsingGET(),
  );
  const { data: rechageInfo } = useRequest(() =>
    rechargeDiscountInfoUsingGET(),
  );
  const [currentTab, setCurrentTab] = useState<number>(2); // 1 | 2
  const [selectCurrency, setSelectCurrency] = useState<API.CurrencyRateVo>();
  const [selectChannel, setSelectChannel] = useState<API.RechargeChannelVo>();

  // const { data: couponList } = useRequest(() => rechargeCouponListUsingGET());
  const [quantity, setQuantity] = useState(0);
  const { currencyRateVoList, rechargeAmountAllowList, rechargeChannelList } =
    rechargeConfig || {};

  const [payOrderId, setPayOrderId] = useState<string>();

  const responsive = useResponsive();
  const intl = useIntl();

  const showTab = !responsive?.large;

  console.log('selectChannel', selectChannel);

  const onPay = async () => {
    if (!selectChannel) {
      toast.error('请选择支付方式');
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
    if (!loading && rechageInfo && rechargeConfig)
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
            {rechargeChannelList?.map((item, index) => (
              <li className="h-[8rem] min-h-[5rem] md:h-auto" key={index}>
                <div
                  className={`trainstion relative cursor-pointer flex items-center justify-center h-full min-h-0 flex-col rounded-lg border bg-dark bg-opacity-90 bg-clip-padding bg-no-repeat outline-none  duration-300 focus:outline-none focus-visible:light ${
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
                  {item?.channelName}
                  {/* <img
                    src="https://key-drop.com/uploads/payment/methods/Visa_Master_alone.png?v85"
                    className="h-full min-h-0 w-full max-w-full object-contain text-center leading-[100px]"
                    alt="visa_mastercard"
                  /> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
  }, [selectCurrency, selectChannel, currencyRateVoList, loading]);

  const renderQuantity = useMemo(() => {
    if (!loading && rechageInfo && rechargeConfig)
      return (
        <div className="flex flex-col">
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
                  $<div>{quantity}</div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="uppercase text-xs">
                  <FormattedMessage id="deposit_actually_recevied" />
                </div>
                <div className="font-num h-[40px] flex items-center gap-2">
                  <span className="text-green"> ${quantity}</span>
                  {/* <span className="text-purple">
                    {numberFixed(
                      (Number(quantity) *
                        Number(rechageInfo?.rechargeDiscount)) /
                        100,
                    )}
                  </span> */}
                </div>
              </div>
            </div>
            <button
              className="btn btn-green btn-sm md:btn-md uppercase w-full rounded font-semibold"
              onClick={onPay}
              type="button"
            >
              <FormattedMessage id={'pay_amount'} /> $ {quantity}
            </button>
          </div>
        </div>
      );
  }, [
    rechargeAmountAllowList,
    quantity,
    selectCurrency,
    loading,
    rechageInfo,
    selectChannel,
  ]);

  useEffect(() => {
    if (rechargeAmountAllowList && rechargeAmountAllowList.length > 0) {
      setQuantity(rechargeAmountAllowList[0]);
    }
    if (currencyRateVoList && currencyRateVoList.length > 0) {
      setSelectCurrency(currencyRateVoList[0]);
    }
    if (
      rechargeChannelList &&
      rechargeChannelList?.length > 0 &&
      !selectChannel
    ) {
      setSelectChannel(rechargeChannelList[0]);
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

  return (
    <div className="max-w-[1400px] m-auto px-3 md:px-6">
      <div className="my-5 flex w-full flex-col justify-between border-b border-light lg:mb-0 lg:mt-8 lg:flex-row">
        <div className="-mb-px items-center border-b border-green pb-6 pr-6 font-semibold uppercase text-white flex gap-3">
          <div className="-my-2 text-white cursor-pointer" onClick={goback}>
            <LeftOutlined />
          </div>
          <FormattedMessage id="Deposit" />
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
