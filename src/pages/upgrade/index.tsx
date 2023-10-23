import { IconFont } from '@/components/icons';
import WeaponCard from '@/components/weaponCard';
import { getMyVoucherPageUsingGET } from '@/services/front/gerenzhongxinxiangguan';
import {
  getUpgradeConfigUsingGET,
  pageUsingGET1,
  v3StartUpgradeUsingPOST,
} from '@/services/front/shengjixiangguan';
import { goback, numberFixed, parseName } from '@/utils';
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  UpOutlined,
} from '@ant-design/icons';
import {
  FormattedMessage,
  history,
  useIntl,
  useModel,
  useRequest,
} from '@umijs/max';
import { useResponsive } from 'ahooks';
import { Slider } from 'antd';
import { remove } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { animated, easings, useSpring } from 'react-spring';
import { toast } from 'react-toastify';
import { ItemState } from '../profile/bag';
import './index.less';
import Result from './result';

export default function DreamPage() {
  const { voice, toggleVoice } = useModel('sys');
  const intl = useIntl();
  const [openLoading, setOpenLoading] = useState(false);

  const [percent, setPercent] = useState(5); /* 显示 中奖率 */
  const [maxBalance, setMaxBalance] = useState(0); // 最大可选额外金额
  const [balancePercent, setBalancePercent] = useState<number>(0); // 额外金额所占百分比
  const [itemsPercent, setItemsPercent] = useState<number>(0); // 背包饰品 占比
  const [itemsTotal, setItemsTotal] = useState<number>(0); // 背包饰品价值
  const [targetPrice, setTargetPrice] = useState<number>(0); // 目标饰品价值

  const [resultShow, setResultShow] = useState(false);
  const [result, setResult] = useState<API.UpgradeResultVo[]>();
  const responsive = useResponsive();
  const [rotateStart, setRotateStart] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    stat: number;
  }>({
    page: 1,
    stat: 0,
  });
  const [orderByPrice, setOrderByPrice] = useState<boolean>(true);
  const [selectWeapon, setSelectWeapon] = useState<API.MyVoucherVo[]>([]);
  const [currentTimes, setCurrentTimes] = useState<number>(1);

  const [currentTab, setCurrentTab] = useState<'upgrade' | 'items'>('items');
  const percentRef = useRef(5);

  const timesBtn = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '1.5X',
      value: 1.5,
    },
    {
      label: '2X',
      value: 2,
    },
    {
      label: '5X',
      value: 5,
    },
    {
      label: '10X',
      value: 10,
    },
  ];

  const [searchDreamsParams, setSearchDreamsParams] = useState<{
    page: number;
    pageSize: number;
    giftName: string;
    orderByPrice: boolean;
    priceStart: string | null;
    priceEnd: string | null;
  }>({
    page: 1,
    pageSize: 16,
    giftName: '',
    orderByPrice: false,
    priceStart: null,
    priceEnd: null,
  });
  const [selectDreamWeapon, setSelectDreamWeapon] = useState<
    API.UpgradeGiftPageVo[]
  >([]);

  const { data: config } = useRequest(() => getUpgradeConfigUsingGET());

  const audio = useMemo(
    () =>
      new Howl({
        src: [require('@/assets/audio/upgrade.mp3')],
      }),
    [],
  );

  const getPercent = ({
    curPrice = 0,
    returnRate = 0,
    totalPrice = 0,
  }: {
    curPrice: number;
    returnRate: number;
    totalPrice: number;
  }) => {
    return Number((curPrice * (returnRate * 100 || 0)) / totalPrice || 0);
  };

  const getBalance = ({
    totalPrice,
    returnRate,
    percent,
  }: {
    totalPrice: number;
    returnRate: number;
    percent: number;
  }) => {
    return Number((percent * totalPrice) / (returnRate * 100));
  };

  /* 获取背包饰品 */
  const {
    data: bagData,
    refresh,
    loading,
  } = useRequest(
    () =>
      getMyVoucherPageUsingGET({
        ...searchParams,
        pageSize: 16,
        orderByPrice,
      }),

    {
      refreshDeps: [searchParams?.page, searchParams?.stat, orderByPrice],
    },
  );
  /* 获取升级饰品 */
  const {
    data: dreamsData,
    refresh: dreamRefresh,
    loading: dreamLoading,
  } = useRequest(
    () => {
      return pageUsingGET1({
        ...searchDreamsParams,
      });
    },
    {
      refreshDeps: [searchDreamsParams],
      cacheKey: 'dreamItems',
      cacheTime: -1,
    },
  );

  const [rotateSprings, rotateApi] = useSpring(() => ({
    from: { rotate: 0 },
  }));

  const startRotate = (success: boolean) => {
    let rotateTo = 360 * 3;
    let per = Number(percent);

    if (success) {
      rotateTo += Math.floor(Math.random() * per) * 3.6;
    } else {
      //如果失败停留在 percent到100之间的位置
      rotateTo += (Math.floor(Math.random() * (100 - per)) + per) * 3.6;
    }

    setRotateStart(true);
    if (voice) {
      audio.play();
    }

    rotateApi.start({
      from: { rotate: 0 },
      to: { rotate: rotateTo },
      config: { duration: 5000, easing: easings.easeOutQuint },
      onResolve: () => {
        setResultShow(true);
        setRotateStart(false);
        refresh();
        dreamRefresh();
      },
    });
  };

  const open = async () => {
    if (!selectDreamWeapon?.length || openLoading || rotateStart) return;
    setOpenLoading(true);
    rotateApi.start({
      from: { rotate: 0 },
    });
    const ret = await v3StartUpgradeUsingPOST({
      quantity: numberFixed((balancePercent / 100) * maxBalance),
      upgradeGiftIds:
        selectDreamWeapon?.map((item) => item.id)?.join(',') || '',
      vouchers: selectWeapon?.map((item) => item.id)?.join(',') || '',
    });
    setOpenLoading(false);

    if (ret.status === 0 && ret.data) {
      startRotate(!!ret.data?.[0]?.won);
      setResult(ret.data);
    }
  };

  const onSliderChange = (range: number) => {
    if (!selectDreamWeapon?.length) {
      toast.error(intl.formatMessage({ id: 'upgrade_select_tip' }), {
        toastId: 'selectItem',
      });
      return;
    }
    const percent = getPercent({
      curPrice: (range / 100) * maxBalance,
      returnRate: config?.returnRate,
      totalPrice: targetPrice,
    });

    if (percent + Number(itemsPercent) < (config?.minProb || 5)) {
      const balance = getBalance({
        percent: (config?.minProb || 5) - Number(itemsPercent),
        returnRate: config?.returnRate,
        totalPrice: targetPrice,
      });

      const autoAddBalancePercent = (balance / maxBalance) * 100;

      setBalancePercent(autoAddBalancePercent);
      return;
    } else if (percent + Number(itemsPercent) > (config?.maxProb || 75)) {
      return;
    }

    setBalancePercent(range);
  };

  /* 饰品总额&倍率 目标视频最低价变化 */
  useEffect(() => {
    setSearchDreamsParams({
      ...searchDreamsParams,
      priceStart: numberFixed(itemsTotal * currentTimes, 2),
    });
  }, [itemsTotal, currentTimes]);

  /* 最大可选额外金额, 目标饰品总额 */
  useEffect(() => {
    const targetPrice = selectDreamWeapon.reduce(
      (a: number, b: API.UpgradeGiftPageVo) => {
        return a + Number(b.recoveryPrice);
      },
      0,
    );
    setTargetPrice(targetPrice);
    if (targetPrice > 0 && config?.returnRate) {
      const curPercent = getPercent({
        curPrice: Number(itemsTotal),
        returnRate: Number(config?.returnRate) || 0,
        totalPrice: Number(targetPrice),
      });
      // const quantity = getMaxQuantity({
      //   price: Number(targetPrice) - Number(itemsTotal),
      //   returnRate: config?.returnRate,
      //   maxProb: config?.maxProb,
      // });
      const quantity = getBalance({
        totalPrice: targetPrice,
        returnRate: config?.returnRate,
        percent: Number(config?.maxProb - curPercent),
      });
      setMaxBalance(quantity);
      setItemsPercent(curPercent);
      if (Number(curPercent) < Number(config?.minProb)) {
        const autoAddBalancePercent =
          Number(config?.minProb) - Number(curPercent) || 0;

        const autoBalance =
          getBalance({
            percent: autoAddBalancePercent,
            returnRate: config?.returnRate,
            totalPrice: targetPrice,
          }) || 0;
        setBalancePercent((autoBalance / quantity) * 100);
      } else {
        setBalancePercent(0);
      }
    } else {
      setItemsPercent(0);
      setBalancePercent(0);
    }
  }, [selectDreamWeapon, config, itemsTotal]);

  /* 饰品总额 */
  useEffect(() => {
    const itemsTotal =
      selectWeapon.reduce((a: number, b: API.MyVoucherVo) => {
        return a + Number(b.recoveryPrice);
      }, 0) || 0;

    setItemsTotal(itemsTotal);
  }, [selectWeapon]);

  /* 总百分比 */
  useEffect(() => {
    const percent =
      Number(itemsPercent) +
      Number(
        getPercent({
          curPrice: (balancePercent / 100) * maxBalance,
          returnRate: config?.returnRate,
          totalPrice: targetPrice,
        }),
      );
    setPercent(Number(percent));
    percentRef.current = percent;
  }, [itemsPercent, balancePercent, maxBalance]);

  const selectWeaponRender = useMemo(() => {
    return (
      <div className="flex items-center flex-1 flex-wrap px-5 h-full">
        {selectWeapon.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center flex-grow basis-[25%] m-auto relative group
            ${
              selectWeapon?.length > 4
                ? 'max-w-[25%]'
                : 'max-w-[50%] lg:max-w-[75%]'
            }`}
          >
            <div
              className="absolute right-0 top-0 bg-black text-gray w-6 h-6 rounded-full cursor-pointer  items-center justify-center hidden group-hover:flex"
              onClick={() => {
                let prevWeapons = JSON.parse(JSON.stringify(selectWeapon));

                remove(
                  prevWeapons,
                  (weapon: API.MyVoucherVo) => weapon.id === item.id,
                );

                setSelectWeapon(prevWeapons);
              }}
            >
              X
            </div>
            <img src={item?.giftImage} className="w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }, [selectWeapon]);

  const selectDreamWeaponRender = useMemo(() => {
    return (
      <div className="flex items-center flex-1 flex-wrap px-5 h-full  ">
        {selectDreamWeapon.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center   flex-grow basis-[25%] m-auto relative group ${
              selectDreamWeapon?.length > 4
                ? 'max-w-[25%]'
                : 'max-w-[50%] lg:max-w-[75%]'
            }`}
          >
            <div
              className="absolute right-0 top-0 bg-black text-gray w-6 h-6 rounded-full cursor-pointer  items-center justify-center hidden group-hover:flex"
              onClick={() => {
                let prevWeapons = JSON.parse(JSON.stringify(selectDreamWeapon));

                remove(
                  prevWeapons,
                  (weapon: API.MyVoucherVo) => weapon.id === item.id,
                );

                setSelectDreamWeapon(prevWeapons);
              }}
            >
              x
            </div>
            <img src={item?.giftImage} className="w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }, [selectDreamWeapon]);

  return (
    <div className="max-w-[1400px] m-auto px-3 mt-5 bg-[url('@/assets/upgrade-bg.png')] bg-no-repeat bg-contain  ">
      <div className="flex grid-cols-3 items-center sm:grid h-[38px] sm:h-[76px]">
        <button
          className="btn btn-sm btn-neutral w-16 !gap-[2px] !px-0"
          onClick={goback}
          type="button"
        >
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </button>
        <h2 className="mx-auto px-6 text-center text-base md:text-xl font-semibold uppercase flex-1">
          <FormattedMessage id="dream_chasing_dream" />
        </h2>
        <div className="flex justify-center space-x-1 sm:justify-end sm:space-x-2">
          <div
            className={`cursor-pointer border border-accent p-1 rounded ${
              !voice ? 'border-opacity-20' : ''
            }`}
            onClick={toggleVoice}
          >
            {voice ? (
              <IconFont type="icon-a-voiceon" />
            ) : (
              <IconFont type="icon-a-voiceoff" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap relative w-full py-2.5">
        <div className="aspect-square  flex order-3 lg:order-none w-full lg:w-[33.33%] max-h-[26rem] lg:h-full  flex-col  rounded-l-lg rounded-r-lg bg-black/70 lg:rounded-r-none ">
          {selectWeapon?.length > 0 ? (
            <>
              {selectWeaponRender}
              <div className="flex justify-between px-4 py-2">
                <div>
                  <p className="text-gray text-sm">
                    {selectWeapon?.length > 1
                      ? 'Selected:'
                      : parseName(selectWeapon[0]?.voucherName)?.[0]}
                  </p>
                  <p className="text-xl font-bold mt-2">
                    {selectWeapon?.length > 1
                      ? `${selectWeapon?.length}Items`
                      : parseName(selectWeapon[0]?.voucherName)?.[2]}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-white text-xl font-bold">
                    ${numberFixed(itemsTotal)}
                  </p>
                  <p className="text-sm text-green mt-2">
                    +{numberFixed(itemsPercent)}%
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full m-auto bg-[url('@/assets/upgrade-gun.png')] bg-no-repeat bg-center bg-[size:50%]">
              <div className="upgrade-selected-items__placeholder-arrows animated-arrows">
                <img
                  src={require('@/assets/upgrade-select-arrow.png')}
                  alt="animated arrow"
                  className="animated-arrows__arrow"
                />
                <img
                  src={require('@/assets/upgrade-select-arrow.png')}
                  alt="animated arrow"
                  className="animated-arrows__arrow"
                />
                <img
                  src={require('@/assets/upgrade-select-arrow.png')}
                  alt="animated arrow"
                  className="animated-arrows__arrow"
                />
              </div>
              <div className="pr-1">
                <p className="text-sm font-semibold text-center leading-tight text-white md:text-base lg:text-lg !text-gold">
                  <FormattedMessage id="upgrade_xzsp" />
                </p>

                <p className="text-xs leading-tight text-light sm:text-sm">
                  <FormattedMessage id="upgrade_xzsp_recive" />
                </p>
              </div>
            </div>
          )}
        </div>
        {/* 概率 */}
        <div className="aspect-square  flex order-1 lg:order-none w-full lg:w-[33.33%] h-96 lg:h-auto  flex-col items-center justify-center gap-4 md:gap-2">
          <div className="dream-bg w-[300px] h-[300px] md:w-[300px] md:h-[300px] flex-shrink-0">
            <div className="dream-bg-percent md:text-2xl font-num text-white text-center z-30">
              {numberFixed(percent)}% <br />
              <div className="text-xs  text-white/50 font-light">
                <FormattedMessage id="upgrade_probability" />
              </div>
            </div>
            {/* 底部圆圈 */}
            <div className="dream-arr-wrap w-[204px] h-[204px] md:w-[204px] md:h-[204px]">
              <div
                className="w-full h-full border-[12px] border-[#657068] rounded-full wave"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, #0A1C15 0%, rgba(43, 123, 66, 0.48) 100%)',
                }}
              ></div>
            </div>
            {/* 绿圈 */}
            <div
              className={`radial-progress  text-primary dream-bg-percent w-[204px] h-[204px] md:w-[204px] md:h-[204px]`}
              style={{
                '--value': percent,
                '--size': responsive.md ? '204px' : '204px',
                '--thickness': responsive.md ? '12px' : '12px',
                transform: `translate(-50%, -50%) rotate(${0 * 3.6}deg)`,
              }}
            ></div>
            {/* 剪头 */}
            <div className="dream-arr-wrap w-[280px] h-[280px] md:w-[280px] md:h-[280px]">
              <animated.div
                className="dream-arr"
                style={{
                  ...rotateSprings,
                }}
              ></animated.div>
            </div>
          </div>
          {/* 金额 */}
          <div
            className="flex flex-col items-center w-60 py-2 gap-1 tr"
            style={{
              background:
                'linear-gradient(90deg, rgba(21, 21, 21, 0.00) 2.64%, rgba(21, 21, 21, 0.70) 19.53%, #151515 46.53%, rgba(21, 21, 21, 0.70) 79.41%, rgba(21, 21, 21, 0.00) 94.03%)',
            }}
          >
            <div className="text-green text-xl">
              $
              {numberFixed(
                Number(itemsTotal) + (balancePercent / 100) * maxBalance,
                2,
              )}
            </div>
            <div className="text-white/50 text-xs">
              <FormattedMessage id="upgrade_zjz" />
            </div>
          </div>
        </div>
        {/* 想要获得的武器 */}
        <div className="aspect-square order-3 lg:order-none w-full lg:w-[33.33%] max-h-[26rem]    lg:h-full  rounded-md bg-black flex-1 mt-6 lg:mt-0 flex flex-col">
          {selectDreamWeapon?.length > 0 ? (
            <>
              {selectDreamWeaponRender}

              <div className="flex justify-between px-4 py-2">
                <div>
                  <p className="text-gray text-sm">
                    {selectDreamWeapon?.length > 1
                      ? 'Selected:'
                      : parseName(selectDreamWeapon[0]?.giftName)?.[0]}
                  </p>
                  <p className="text-xl font-bold mt-2">
                    {selectDreamWeapon?.length > 1
                      ? `${selectDreamWeapon?.length}Items`
                      : parseName(selectDreamWeapon[0]?.giftName)?.[2]}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-gray text-sm">
                    <FormattedMessage id="recoveryPrice" />
                  </p>
                  <p className="text-xl font-bold mt-2">
                    $
                    {numberFixed(
                      selectDreamWeapon.reduce(
                        (a: number, b: API.UpgradeGiftPageVo) => {
                          return a + Number(b.recoveryPrice);
                        },
                        0,
                      ),
                      2,
                    )}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full m-auto bg-[url('@/assets/upgrade-gun.png')] bg-no-repeat bg-center bg-[size:50%]">
              <div className="upgrade-selected-items__placeholder-arrows animated-arrows">
                <img
                  src={require('@/assets/upgrade-select-arrow.png')}
                  alt="animated arrow"
                  className="animated-arrows__arrow"
                />
                <img
                  src={require('@/assets/upgrade-select-arrow.png')}
                  alt="animated arrow"
                  className="animated-arrows__arrow"
                />
                <img
                  src={require('@/assets/upgrade-select-arrow.png')}
                  alt="animated arrow"
                  className="animated-arrows__arrow"
                />
              </div>
              <div className="pr-1">
                <p className="text-sm font-semibold text-center leading-tight text-white md:text-base lg:text-lg !text-gold">
                  <FormattedMessage id="upgrade_xzsp_recive" />
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row items-center order-2 lg:order-none w-full h-auto lg:h-[100px] mt-2 relative gap-3">
          <div className="w-full lg:w-[33.33%] flex gap-3 lg:px-4 lg:pt-4 flex-wrap justify-center">
            {timesBtn.map((item, index) => {
              return (
                <Button
                  className={`btn rounded border bg-black ${
                    currentTimes === item.value
                      ? 'border-green text-green'
                      : 'border-light'
                  } ${
                    selectWeapon?.length > 0
                      ? 'cursor-pointer'
                      : ' cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (selectWeapon?.length > 0) {
                      setCurrentTimes(item.value);
                    }
                  }}
                  key={index}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>

          <div className="w-full lg:w-[33.33%]  px-4">
            <p className="text-white/50 mt-3 font-normal">
              <FormattedMessage id="upgrade_add_balance" />
            </p>

            <div className="w-full  bg-black flex flex-col justify-between items-center rounded mt-2 border border-light border-b-0">
              <div className="w-full pr-2 py-2 flex items-center justify-end font-bold">
                <span className="text-green mr-2 text-sm">
                  {'+'}
                  {targetPrice > 0
                    ? numberFixed(
                        getPercent({
                          curPrice: (balancePercent / 100) * maxBalance,
                          returnRate: config?.returnRate,
                          totalPrice: targetPrice,
                        }),
                        2,
                      )
                    : '0.00'}
                  %
                </span>
                <div className="text-gray">
                  <span className="text-white">
                    ${numberFixed((balancePercent / 100) * maxBalance, 2)}
                  </span>
                  /${numberFixed(maxBalance, 2)}
                </div>
              </div>
              <Slider
                className="w-full"
                value={balancePercent}
                onChange={onSliderChange}
                tooltip={{ open: false }}
              />
            </div>
          </div>
          <div className="w-full lg:w-[33.33%] lg:px-10 lg:pt-10 css-nn2bo0">
            <Button className="btn btn-green w-full" onClick={open}>
              <FormattedMessage id="main_tab_dream" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full mt-8 flex flex-wrap lg:grid grid-cols-2 gap-4">
        <div className="w-full  flex lg:hidden">
          <div
            className={`w-1/2 flex items-center cursor-pointer justify-center uppercase pb-4 ${
              currentTab === 'items'
                ? 'border-b border-green'
                : 'border-b border-light'
            }`}
            onClick={() => setCurrentTab('items')}
          >
            <FormattedMessage id="upgrade_wdsp" />
          </div>
          <div
            className={`w-1/2 flex items-center cursor-pointer justify-center uppercase pb-4 ${
              currentTab === 'upgrade'
                ? 'border-b border-green'
                : 'border-b border-light'
            }`}
            onClick={() => setCurrentTab('upgrade')}
          >
            <FormattedMessage id="main_tab_dream" />
          </div>
        </div>

        <div
          className={`pb-6 px-4 bg-black rounded-lg h-fit ${
            currentTab === 'items' ? ' block w-full' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between py-3.5 border-b border-light">
            <div className="text-lg font-semibold">
              <FormattedMessage id="upgrade_wdsp" />
              <span className="text-gray font-medium">
                （{bagData?.totalRows || 0}）
              </span>{' '}
            </div>
            <div
              className="border border-light h-10 py-2 px-4 rounded cursor-pointer"
              onClick={() => setOrderByPrice(!orderByPrice)}
            >
              <FormattedMessage id="recoveryPrice" />{' '}
              {orderByPrice ? <DownOutlined /> : <UpOutlined />}
            </div>
          </div>
          {Number(bagData?.totalRows) > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-7">
              {bagData?.pageData?.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={() => {
                    if (item.state !== ItemState.ACTIVE) {
                      return;
                    }
                    let prevWeapons = JSON.parse(JSON.stringify(selectWeapon));
                    if (selectWeapon?.find((weapon) => weapon.id === item.id)) {
                      remove(
                        prevWeapons,
                        (weapon: API.MyVoucherVo) => weapon.id === item.id,
                      );
                    } else {
                      const total =
                        [...prevWeapons, item].reduce(
                          (a: number, b: API.MyVoucherVo) => {
                            return a + Number(b.recoveryPrice);
                          },
                          0,
                        ) || 0;
                      if (
                        targetPrice > 0 &&
                        getPercent({
                          curPrice: total,
                          returnRate: config?.returnRate,
                          totalPrice: targetPrice,
                        }) > config?.maxProb
                      ) {
                        toast.error(intl.formatMessage({ id: 'upgrade_jzcc' }));
                        return;
                      }
                      prevWeapons.push(item);
                    }
                    setSelectWeapon(prevWeapons);
                  }}
                >
                  {item?.state !== ItemState.ACTIVE && (
                    <div className="absolute right-0 top-0 z-30 text-sm pt-2 pr-2 text-gray">
                      {item?.stateStr}
                    </div>
                  )}
                  <WeaponCard data={item} />
                  {selectWeapon?.find((weapon) => weapon.id === item.id) && (
                    <div className="absolute bottom-0 right-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                      >
                        <path
                          d="M46 0V42C46 44.2091 44.2091 46 42 46H0L46 0Z"
                          fill="#35F05E"
                        />
                        <path
                          d="M31.3455 38.4368C31.0227 38.7491 30.5089 38.7441 30.1922 38.4257L24.1076 32.307C23.4984 31.6944 23.508 30.7018 24.1289 30.1011C24.7412 29.5088 25.7168 29.522 26.3129 30.1306L30.3461 34.2488C30.577 34.4845 30.9548 34.4896 31.1919 34.2602L39.6837 26.0454C40.2863 25.4625 41.2426 25.4625 41.8452 26.0454C42.4767 26.6563 42.4767 27.6689 41.8452 28.2798L31.3455 38.4368Z"
                          fill="#252228"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-6 flex h-full flex-col items-center justify-center py-20">
                <p className="text-sm font-semibold leading-tight text-white md:text-base lg:text-l mb-4">
                  <FormattedMessage id="upgrade_no_skin" />
                </p>
                <div
                  className="btn btn-green text-white"
                  onClick={() => {
                    history.push('/case');
                  }}
                >
                  <FormattedMessage id="open_case" />
                </div>
              </div>
            </>
          )}
          {bagData?.totalRows > 0 && (
            <div className="mt-auto flex items-center justify-center pt-6">
              <span
                className={`${
                  searchParams?.page === 1
                    ? 'cursor-not-allowed text-gray'
                    : 'cursor-pointer text-white'
                }`}
                onClick={() => {
                  if (loading) return;
                  if (searchParams?.page > 1) {
                    setSearchParams({
                      ...searchParams,
                      page: searchParams?.page - 1,
                    });
                  }
                }}
              >
                <LeftOutlined />
              </span>
              <div className="flex items-center justify-center rounded bg-navy-900 p-3 text-center text-sm font-semibold leading-none text-white css-1mqx83j">
                {bagData?.page}/{bagData?.totalPages}
              </div>
              <span
                className={`${
                  bagData && searchParams?.page === bagData?.totalPages
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer text-white'
                }`}
                onClick={() => {
                  if (loading) return;

                  if (searchParams?.page < Number(bagData?.totalPages)) {
                    setSearchParams({
                      ...searchParams,
                      page: searchParams?.page + 1,
                    });
                  }
                }}
              >
                <RightOutlined />
              </span>
            </div>
          )}
        </div>

        <div
          className={`pb-6 px-4 bg-black rounded-lg h-full flex-col ${
            currentTab === 'upgrade' ? 'flex w-full' : 'hidden lg:flex'
          }`}
        >
          <div className="w-full flex justify-between items-center py-3.5 border-b border-light">
            <div className="hidden lg:block">
              <FormattedMessage id="main_tab_dream" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="flex border rounded border-[rgba(255,255,255,0.2)] h-10 w-full lg:w-[140px] items-center py-[1px] px-2">
                <SearchOutlined className="text-white text-lg" />
                <input
                  className="input w-full border border-l-0 rounded-r h-full pl-[5px] bg-transparent focus:outline-none text-white text-sm"
                  value={searchDreamsParams.giftName}
                  placeholder={'FIND SKIN'}
                  onChange={(e) =>
                    setSearchDreamsParams({
                      ...searchDreamsParams,
                      giftName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center text-white/20 gap-2">
                <div className="flex border w-[120px] rounded border-[rgba(255,255,255,0.2)] h-10 items-center py-[1px] pl-2">
                  <span className="text-white">$</span>
                  <input
                    className="input w-full  border border-l-0 rounded-r h-full focus:outline-none text-white text-sm bg-transparent"
                    onChange={(e) => {
                      setSearchDreamsParams({
                        ...searchDreamsParams,
                        priceStart: e.target.value,
                      });
                    }}
                    type="number"
                    value={searchDreamsParams.priceStart || 0}
                    placeholder={intl.formatMessage({
                      id: 'home_filter_price_min',
                    })}
                  />
                </div>
                -
                <div className="flex border w-[120px] rounded border-[rgba(255,255,255,0.2)] h-10 items-center py-[1px] pl-2">
                  <span className="text-white">$</span>
                  <input
                    className="input w-full border border-l-0 rounded-r h-full focus:outline-none text-white text-sm bg-transparent"
                    onChange={(e) => {
                      setSearchDreamsParams({
                        ...searchDreamsParams,
                        priceEnd: e.target.value,
                      });
                    }}
                    type="number"
                    value={searchDreamsParams.priceEnd || 0}
                    placeholder={intl.formatMessage({
                      id: 'home_filter_price_max',
                    })}
                  />
                </div>
              </div>
              <div
                className="border border-light h-10 py-2 px-4 rounded cursor-pointer"
                onClick={() =>
                  setSearchDreamsParams({
                    ...searchDreamsParams,
                    orderByPrice: !searchDreamsParams?.orderByPrice,
                  })
                }
              >
                <FormattedMessage id="recoveryPrice" />{' '}
                {searchDreamsParams?.orderByPrice ? (
                  <DownOutlined />
                ) : (
                  <UpOutlined />
                )}
              </div>
            </div>
            {/* <div className='text-sm'></div> */}
          </div>
          {Number(dreamsData?.totalRows) > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-7 h-full">
              {dreamsData?.pageData?.map((item, index) => (
                <div
                  key={index}
                  className="relative h-fit"
                  onClick={() => {
                    let prevWeapons = JSON.parse(
                      JSON.stringify(selectDreamWeapon),
                    );
                    if (
                      selectDreamWeapon?.find((weapon) => weapon.id === item.id)
                    ) {
                      remove(
                        prevWeapons,
                        (weapon: API.MyVoucherVo) => weapon.id === item.id,
                      );
                    } else {
                      prevWeapons.push(item);
                    }
                    setSelectDreamWeapon(prevWeapons);
                  }}
                >
                  <WeaponCard data={item} />
                  {selectDreamWeapon?.find(
                    (weapon) => weapon.id === item.id,
                  ) && (
                    <div className="absolute bottom-0 right-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        viewBox="0 0 46 46"
                        fill="none"
                      >
                        <path
                          d="M46 0V42C46 44.2091 44.2091 46 42 46H0L46 0Z"
                          fill="#35F05E"
                        />
                        <path
                          d="M31.3455 38.4368C31.0227 38.7491 30.5089 38.7441 30.1922 38.4257L24.1076 32.307C23.4984 31.6944 23.508 30.7018 24.1289 30.1011C24.7412 29.5088 25.7168 29.522 26.3129 30.1306L30.3461 34.2488C30.577 34.4845 30.9548 34.4896 31.1919 34.2602L39.6837 26.0454C40.2863 25.4625 41.2426 25.4625 41.8452 26.0454C42.4767 26.6563 42.4767 27.6689 41.8452 28.2798L31.3455 38.4368Z"
                          fill="#252228"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-6 flex h-full flex-col items-center justify-center py-20 bg-[url('@/assets/upgrade-gun.png')] bg-no-repeat bg-center bg-[size:50%]">
                <p className="text-sm font-semibold leading-tight text-white md:text-base lg:text-l mb-4 mt-32">
                  <FormattedMessage id="upgrade_no_items" />
                </p>
              </div>
            </>
          )}
          {Number(dreamsData?.totalRows) > 0 && (
            <div className="mt-auto flex items-center justify-center pt-6">
              <span
                className={`${
                  searchParams?.page === 1
                    ? 'cursor-not-allowed text-gray'
                    : 'cursor-pointer text-white'
                }`}
                onClick={() => {
                  if (loading) return;
                  if (searchDreamsParams?.page > 1) {
                    setSearchDreamsParams({
                      ...searchDreamsParams,
                      page: searchParams?.page - 1,
                    });
                  }
                }}
              >
                <LeftOutlined />
              </span>
              <div className="flex items-center justify-center rounded bg-navy-900 p-3 text-center text-sm font-semibold leading-none text-white css-1mqx83j">
                {dreamsData?.page}/{dreamsData?.totalPages}
              </div>
              <span
                className={`${
                  dreamsData && searchParams?.page === dreamsData?.totalPages
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer text-white'
                }`}
                onClick={() => {
                  if (loading) return;

                  if (searchParams?.page < Number(dreamsData?.totalPages)) {
                    setSearchDreamsParams({
                      ...searchDreamsParams,
                      page: searchParams?.page + 1,
                    });
                  }
                }}
              >
                <RightOutlined />
              </span>
            </div>
          )}
        </div>
      </div>

      {resultShow && result?.length && (
        <Result
          show={resultShow}
          results={result}
          onClose={() => setResultShow(false)}
        />
      )}
    </div>
  );
}
