import depBg from '@/assets/dep-bg.png';
import { IconFont } from '@/components/icons';
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
import { useModel, useRequest,FormattedMessage } from '@umijs/max';
import { Fragment, useEffect, useState } from 'react';
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
          <img src={depBg} className="w-full h-full hidden lg:block" />
          <div className="flex flex-col gap-6">
            <Menu as="div" className="relative">
              <Menu.Button className="select select-sm md:select-md select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none bg-neutral">
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
                <Menu.Items className="absolute left-0 mt-2 w-full bg-neutral ring-1 ring-accent rounded origin-top-left p-1 z-50">
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

            <Menu as="div" className="relative">
              <Menu.Button className="select select-sm md:select-md select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none bg-neutral">
                <div>Recharge channels</div>
                <div>
                  {selectChannel ? selectChannel.channelName : 'please select'}
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
                <Menu.Items className="absolute left-0 mt-2 w-full bg-neutral ring-1 ring-accent rounded origin-top-left p-1 z-50">
                  {rechargeChannelList?.map((item) => (
                    <Menu.Item key={item.rechargeConfigId}>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? 'bg-accent bg-opacity-10' : ''
                          } flex justify-between items-center p-2 text-sm rounded`}
                          onClick={() => setSelectChannel(item)}
                        >
                          {item.channelName}
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="flex gap-2">
              {/* <div className="vip-level">
                <div className="vip-level-icon"></div>
                <div className="vip-level-num">{userInfo?.grade}</div>
              </div> */}
              <span className="text-secondary font-num ml-1 flex gap-1 items-center uppercase">
                Bonus {rechageInfo?.rechargeDiscount}%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {rechargeAmountAllowList?.map((item,i) => (
                <div
                  className={`rounded md:rounded-lg bg-gradient-to-r from-[#44425E] to-[#131314] ring-1  hover:ring-accent cursor-pointer overflow-hidden ${
                    item === quantity ? 'ring-accent' : 'ring-transparent'
                  }`}
                  key={i}
                  onClick={() => {
                    setQuantity(item);
                  }}
                >
                  <div className="font-num text-secondary h-14 md:h-28 flex items-center justify-center md:text-2xl">
                    <IconFont type="icon-coin" className="mr-1" /> {item}
                  </div>
                  <div className="bg-base-100 bg-opacity-50 flex items-center justify-center gap-1 h-6 md:h-12 text-xs md:text-base">
                    <IconFont type="icon-gift" />+
                    {numberFixed(
                      (item * Number(rechageInfo?.rechargeDiscount)) / 100,
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-base-content bg-opacity-10 rounded-lg p-3 md:p-6 flex flex-col gap-6">
              {couponList && couponList.length > 0 && (
                <Menu as="div" className="relative">
                  <Menu.Button className="select select-sm md:select-md select-accent border-opacity-50 rounded uppercase w-full font-semibold flex justify-between items-center focus:outline-none bg-neutral">
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
                    <Menu.Items className="absolute left-0 mt-2 w-full bg-neutral ring-1 ring-accent rounded origin-top-left p-1 z-50">
                      {couponList.map((item,i) => (
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
              )}

              <div className="grid items-center gap-2 md:grid-cols-2">
                <div className="flex flex-col w-full gap-2">
                  <div className="uppercase font-semibold text-sm md:text-base">
                    you amout
                  </div>
                  <div className="text-primary inline-flex gap-1">
                    {selectCurrency?.symbol}
                    <span> {(selectCurrency?.rate || 0) * quantity}</span>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="uppercase font-semibold text-sm md:text-base">
                    Actually obtained
                  </div>
                  <div className="text-secondary font-num">
                    <IconFont type="icon-coin" className="mr-1" />
                    {quantity}+
                    {numberFixed(
                      (Number(quantity) *
                        Number(rechageInfo?.rechargeDiscount)) /
                        100,
                    )}
                    {selectCoupon?.rechargeDiscount &&
                      `+${selectCoupon?.rechargeDiscount}`}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm md:btn-md uppercase w-full rounded font-semibold"
                onClick={onPay}
                type='button'
              >
                pay {(selectCurrency?.rate || 0) * quantity}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
