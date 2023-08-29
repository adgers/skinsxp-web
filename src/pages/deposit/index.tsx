import {
  makePaymentUsingPOST,
  paymentStateUsingGET,
  rechargeConfigUsingGET,
  rechargeCouponListUsingGET,
  rechargeDiscountInfoUsingGET,
} from '@/services/front/chongzhixiangguan';
import { goback, numberFixed } from '@/utils';
import { LeftOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import { FormattedMessage, useModel, useRequest } from '@umijs/max';
import { Fragment, useEffect, useState } from 'react';
import { Input } from 'react-daisyui';
import { toast } from 'react-toastify';

export default function Deposit() {
  const { getUser } = useModel('user');
  const { data: rechargeConfig, loading } = useRequest(() =>
    rechargeConfigUsingGET(),
  );
  const { data: rechageInfo } = useRequest(() =>
    rechargeDiscountInfoUsingGET(),
  );
  const [selectCoupon, setSelectCoupon] =
    useState<API.RechargeCouponRecordVo>();
  const [selectCurrency, setSelectCurrency] = useState<API.CurrencyRateVo>();
  const [selectChannel, setSelectChannel] = useState<API.RechargeChannelVo>();

  const { data: couponList } = useRequest(() => rechargeCouponListUsingGET());
  const [quantity, setQuantity] = useState(0);
  const { currencyRateVoList, rechargeAmountAllowList, rechargeChannelList } =
    rechargeConfig || {};

  const [payOrderId, setPayOrderId] = useState<string>();

  const onPay = async () => {
    if (!selectChannel) {
      toast.error('请选择支付方式');
      return;
    }
    const ret = await makePaymentUsingPOST({
      couponId: selectCoupon?.id,
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
      toast.success('充值成功');
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
      <div className="my-4">
        <div className="btn btn-sm btn-neutral" onClick={goback}>
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </div>
      </div>
      {!loading && rechageInfo && rechargeConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <img src={depBg} className="w-full h-full hidden lg:block" /> */}
          <div className="flex flex-col gap-4">
            <Menu as="div" className="relative">
              <Menu.Button className="select select-sm md:select-md select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-nonebg-dark">
                <div>Currency</div>
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
              <li className="h-[8rem] min-h-[5rem] md:h-auto">
                <a
                  className="trainstion relative flex h-full min-h-0 flex-col rounded-lg border bg-dark bg-opacity-90 bg-clip-padding bg-no-repeat outline-none  duration-300 focus:outline-none border-light focus-visible:light active"
                  href=""
                >
                  <img
                    src="https://key-drop.com/uploads/payment/methods/Visa_Master_alone.png?v85"
                    className="h-full min-h-0 w-full max-w-full object-contain text-center leading-[100px]"
                    alt="visa_mastercard"
                  />
                </a>
              </li>
            </ul>
            <div className="grid min-h-0 w-full grid-cols-2 gap-3 md:grid-cols-3">
              <div></div>
              {/* {rechargeChannelList?.map((item, index) => (
                <div
                  key={index}
                  className={`h-[8rem] min-h-[5rem] md:h-auto flex items-center cursor-pointer rounded justify-center ${
                    selectChannel?.id === item.id ? 'border border-green' : ''
                  }`}
                  onClick={() => setSelectChannel(item)}
                >
                  {item?.channelName}
                </div>
              ))} */}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              {/* <div className="vip-level">
                <div className="vip-level-icon"></div>
                <div className="vip-level-num">{userInfo?.grade}</div>
              </div> */}
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {rechargeAmountAllowList?.map((item, i) => (
                <div
                  className={`rounded-none flex items-center py-3 justify-center relative cursor-pointer ${
                    quantity === item
                      ? 'bg-green/[0.3] border border-green'
                      : 'bg-light/20 '
                  }`}
                  key={i}
                  onClick={() => {
                    setQuantity(item);
                  }}
                >
                  $ {numberFixed(item * Number(rechageInfo?.rechargeDiscount))}
                </div>
              ))}
            </div>
            <div className="rounded-lg py-3 md:py-6 flex flex-col gap-6">
              {/* {couponList && couponList.length > 0 && (
                <Menu as="div" className="relative">
                  <Menu.Button className="select select-sm md:select-md select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-nonebg-dark">
                    <div>coupon</div>
                    <div>
                      {selectCoupon ? selectCoupon.couponName : 'please Select'}
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
                      {couponList.map((item, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? 'bg-accent bg-opacity-10' : ''
                              } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                              onClick={() => {
                                setSelectCoupon(item);
                              }}
                            >
                              {item.couponName}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? 'bg-accent bg-opacity-10' : ''
                            } flex justify-between items-center p-2 text-sm rounded cursor-pointer`}
                            onClick={() => {
                              setSelectCoupon({});
                            }}
                          >
                            do not use coupon
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )} */}

              <div className="flex gap-x-8">
                <div className="flex flex-col w-fit gap-2">
                  <div className="uppercase  text-xs">you amout</div>
                  <div className="flex h-[40px] w-[176px] overflow-hidden rounded-lg border border-light text-xs font-bold">
                    <div className="flex h-full pl-5 pr-1 items-center justify-center bg-dark text-center text-whitew">
                      {selectCurrency?.symbol}
                    </div>
                    <Input
                      type="number"
                      className="flex-1 bg-transparent pr-5 pl-0 text-lg h-full w-10 font-bold text-white outline-none border-none focus:outline-none lg:text-xs"
                      value={(selectCurrency?.rate || 0) * quantity}
                      onChange={(e) => {
                        console.log(e.target.value, 'e');
                        setQuantity(
                          Number(e.target.value) / (selectCurrency?.rate || 0),
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="uppercase text-xs">Actually obtained</div>
                  <div className="font-num h-[40px] flex items-center">
                    <span className="text-green"> $ {quantity}</span> +{' '}
                    <span className="text-purple">
                      {numberFixed(
                        (Number(quantity) *
                          Number(rechageInfo?.rechargeDiscount)) /
                          100,
                      )}
                    </span>
                    {selectCoupon?.rechargeDiscount &&
                      `+${selectCoupon?.rechargeDiscount}`}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-green btn-sm md:btn-md uppercase w-full rounded font-semibold"
                onClick={onPay}
                type="button"
              >
                pay {selectCurrency?.symbol}{' '}
                {(selectCurrency?.rate || 0) * quantity}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
