import { IconFont } from '@/components/icons';
import WeaponCard from '@/components/weaponCard';
import {
  getUpgradeConfigUsingGET,
  upgradeRecordPageUsingGET,
  v3StartUpgradeUsingPOST,
} from '@/services/front/shengjixiangguan';
import { goback, numberRoundUp } from '@/utils';
import { LeftOutlined, LoadingOutlined,RightOutlined } from '@ant-design/icons';
import { FormattedMessage, useModel, useRequest } from '@umijs/max';
import { useResponsive, useToggle } from 'ahooks';
import { Slider } from 'antd';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { animated, easings, useSpring } from 'react-spring';
import { toast } from 'react-toastify';
// import Result from '../box/result';
import DreamItems from './dreamItems';
import './index.less';
import { getMyVoucherPageUsingGET } from '@/services/front/gerenzhongxinxiangguan';

export default function DreamPage() {
  const { voice, toggleVoice } = useModel('sys');
  const [openLoading, setOpenLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [range, setRange] = useState<[number, number]>([0, 1]);
  const [percent, setPercent] = useState(5);
  const [resultShow, setResultShow] = useState(false);
  const [result, setResult] = useState<API.UpgradeResultVo>();
  const responsive = useResponsive();
  const [rotateStart, setRotateStart] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    stat: number;
  }>({
    page: 1,
    stat: 0,
  });

  const { data: config } = useRequest(() => getUpgradeConfigUsingGET());
  const { data: records } = useRequest(() =>
    upgradeRecordPageUsingGET({ page: 1, pageSize: 24 }),
  );
  const { data, refresh, loading } = useRequest(
    () =>
      getMyVoucherPageUsingGET({
        ...searchParams,
        pageSize: 12,
        orderByPrice,
      }),
    {
      refreshDeps: [searchParams?.page, searchParams?.stat, orderByPrice],
    },
  );
  const [selectItem, setSelectItem] = useState<API.UpgradeGiftPageVo>();
  const [modalVisible, { toggle: toggleVisible }] = useToggle(false);

  const [rotateSprings, rotateApi] = useSpring(() => ({
    from: { rotate: 0 },
  }));

  const startRotate = (success: boolean) => {
    let rotateTo = 360 * 3;
    if (success) {
      //如果成功就停止range[0]和range[1]之间的随机数
      rotateTo +=
        (Math.floor(Math.random() * (range[1] - range[0])) + range[0]) * 3.6;
    } else {
      //如果失败则停在rang[0]和rang[1]以外地方,rang[1]往后2-20内的随机地方
      rotateTo += (Math.floor(Math.random() * 20) + range[1] + 2) * 3.6;
    }

    setRotateStart(true);
    rotateApi.start({
      from: { rotate: 0 },
      to: { rotate: rotateTo },
      config: { duration: 5000, easing: easings.easeOutQuint },
      onResolve: () => {
        setResultShow(true);
        setRotateStart(false);
      },
    });
  };

  const open = async () => {
    if (!selectItem || openLoading || rotateStart) return;
    setOpenLoading(true);
    rotateApi.start({
      from: { rotate: 0 },
    });
    const ret = await v3StartUpgradeUsingPOST({
      quantity,
      requestRollCodeHigh: range[1] * 10000,
      requestRollCodeLow: range[0] === 0 ? 1 : range[0] * 10000,
      upgradeGiftId: selectItem?.id || 0,
    });
    setOpenLoading(false);

    if (ret.status === 0 && ret.data) {
      startRotate(!!ret.data?.won);
      setResult(ret.data);
    }
  };

  const onItemSelect = (item: API.UpgradeGiftPageVo) => {
    setSelectItem(item);
    toggleVisible();
  };

  const onSliderChange = (range: [number, number]) => {
    if (!selectItem) {
      toast.error('Please select a target accessory first', {
        toastId: 'selectItem',
      });
      return;
    }
    const percent = range[1] - range[0];
    if (percent < (config?.minProb || 5) || percent > (config?.maxProb || 75)) {
      return;
    }

    setRange(range);
    setPercent(percent);
  };

  const refreshQuantity = () => {
    const returnRate = config?.returnRate;
    const targetPirce = selectItem?.recoveryPrice;

    if (targetPirce && returnRate && percent > 0) {
      const quantity = numberRoundUp(
        ((targetPirce / returnRate) * percent) / 100,
      );
      setQuantity(quantity);
    }
  };

  useEffect(() => {
    refreshQuantity();
  }, [selectItem, range]);

  useEffect(() => {
    if (config) {
      setPercent(config?.minProb || 1);
      setRange([0, config?.minProb || 1]);
    }
  }, [config]);

  return (
    <div className="max-w-[1400px] m-auto px-3 mt-5">
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
              !voice && 'border-opacity-20'
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
      <div className="grid grid-cols-3 gap-5">
        {/* 已选择的武器 */}
        <div className="flex flex-col h-full rounded-l-lg rounded-r-lg bg-black lg:rounded-r-none ">
          <div className="my-auto p-3 pb-0 sm:p-6 sm:pb-0">
            <img
              src="https://key-drop.com/web/KD/static/images/item-placeholder.png?v85"
              alt=""
              className="pointer-events-none mx-auto mt-6 block h-full w-3/5 object-contain"
            />
          </div>
          <div className="flex flex-col items-center pb-3 text-center md:flex-row md:pb-6 md:pl-6 md:text-left">
            <div className="pr-1">
              <div className="flex">
                <p className="text-sm font-bold leading-tight text-purple md:text-base lg:text-lg !text-gold">
                  Choose your item
                </p>
              </div>
              <p className="text-xs leading-tight text-navy-300 sm:text-sm">
                Item, that you want to upgrade
              </p>
            </div>
            <div className="mt-3 rounded-lg bg-navy-900 px-5 py-3 text-center md:ml-auto md:mt-0 md:rounded-r-none md:text-right">
              <div className="whitespace-nowrap text-lg font-bold leading-none text-white">
                <span>US$0.00</span>
              </div>
              <div className="text-xs font-bold leading-none text-gold">
                <span>+0.00%</span>
              </div>
            </div>
          </div>
        </div>
        {/* 概率 */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-2">
          <div className="dream-bg w-[150px] h-[150px] md:w-[300px] md:h-[300px] flex-shrink-0">
            <div className="dream-bg-percent md:text-2xl font-num">
              {percent}%
            </div>
            <div className="dream-arr-wrap w-[102px] h-[102px] md:w-[204px] md:h-[204px]">
              <div className="dream-arr-cricle"></div>
            </div>
            <div
              className={`radial-progress  text-primary dream-bg-percent w-[102px] h-[102px] md:w-[204px] md:h-[204px]`}
              style={{
                '--value': percent,
                '--size': responsive.md ? '204px' : '102px',
                '--thickness': responsive.md ? '12px' : '6px',
                transform: `translate(-50%, -50%) rotate(${range[0] * 3.6}deg)`,
              }}
            ></div>
            <div className="dream-arr-wrap w-[102px] h-[102px] md:w-[204px] md:h-[204px]">
              <animated.div
                className="dream-arr"
                style={{
                  ...rotateSprings,
                }}
              ></animated.div>
            </div>
          </div>
          <div className="slider-bg w-full flex justify-center items-center px-4 md:px-10 mt-10">
            <Slider
              className="w-full"
              range
              value={range}
              onChange={onSliderChange}
              marks={{
                0: '0',
                10: '10',
                20: '20',
                30: '30',
                40: '40',
                50: '50',
                60: '60',
                70: '70',
                80: '80',
                90: '90',
                100: '100',
              }}
            />
          </div>
          <div className="flex w-full justify-center my-2 text-sm">
            {config?.minProb}% to {config?.maxProb}% percentage of the range
            <FormattedMessage
              id="dream_percentage_tip"
              values={{ min: config?.minProb, max: config?.maxProb }}
            />
          </div>
          {/* <div className="ring-1 ring-secondary rounded-md bg-base-100 bg-opacity-20 backdrop-blur-md px-2 md:px-5 py-3 flex items-center flex-col">
            <div className="uppercase font-num text-sm md:text-base text-secondary">
              <FormattedMessage id="dream_chose_target" />
            </div>
            {selectItem ? (
              <div className="flex my-5 relative" onClick={toggleVisible}>
                <img
                  className="h-[50px] md:h-[100px] cursor-pointer"
                  src={selectItem?.giftImage}
                />
                <div className="absolute text-xs w-full -bottom-2 left-0 truncate">
                  {selectItem.giftName}
                </div>
              </div>
            ) : (
              <img
                src={dreamBtn}
                className="w-[50px] md:w-[100px] cursor-pointer my-5 animate-pulse"
                onClick={toggleVisible}
              />
            )}

            <div className="text-xs">
              <FormattedMessage id="dream_failed_tip" />
            </div>
          </div> */}
        </div>
        {/* 想要获得的武器 */}
        <div className="rounded-md bg-black flex-1 w-full flex flex-col">
          <div className="flex-1"></div>
          <div className="flex mt-5 justify-center p-8">
            <button
              type="button"
              onClick={open}
              className="flex items-center justify-center min-w-[300px] h-8 sm:h-12 px-4 uppercase border border-secondary text-secondary rounded font-num font-semibold bg-secondary bg-opacity-20"
            >
              <div className="open-btn-arr animate-pulse" />
              <div className="flex gap-2 px-1 flex-1 justify-center">
                {openLoading && <LoadingOutlined />}
                <IconFont type="icon-coin" />
                <CountUp
                  end={quantity}
                  duration={0.3}
                  decimals={2}
                  separator=""
                  className="font-num"
                />
                <FormattedMessage id="dream_open" />
              </div>
              <div className="open-btn-arr-right animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mt-8 grid grid-cols-2 gap-4">
        <div className="py-6 px-4 bg-black rounded-lg h-fit">
          <div className="w-full flex justify-between items-center">
            <div className="text-lg">YOUR ITEMS</div>
            {/* <div className='text-sm'></div> */}
          </div>
          <div className="mt-6 flex h-full flex-col items-center justify-center py-20">
            <p className="text-sm font-bold leading-tight text-white md:text-base lg:text-l mb-4">
              You don`t have any skins
            </p>
            <div className="btn btn-green text-white">Open Cases</div>
          </div>
          <div
            className="mt-auto flex items-center justify-between pt-6 transition-opacity duration-300"
            style={{ opacity: 0.5, pointerEvents: 'none' }}
          >
            <LeftOutlined/>
            <div className="flex items-center justify-center rounded bg-navy-900 p-3 text-center text-sm font-bold leading-none text-white css-1mqx83j">
              0/0
            </div>
            <RightOutlined/>
          </div>
        </div>
        <div className="py-6 px-4 bg-black rounded-lg">
          <div className="w-full flex justify-between items-center">
            <div className="text-lg">Dreams</div>
            {/* <div className='text-sm'></div> */}
          </div>
        </div>
      </div>

      <div className="box-title mt-10">
        <span className="text-center text-base sm:text-2xl uppercase font-semibold">
          <FormattedMessage id="dream_dream_records" />
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
        {records?.pageData?.map((item, i: number) => {
          return (
            <div className="card-flip" key={i}>
              <div className="front">
                <WeaponCard data={item} />
              </div>
              <div className="back">
                <div className="flex flex-col gap-3 items-center justify-center w-full h-full bg-dark bg-opacity-70 cursor-pointer rounded-md">
                  <div className="avatar w-10 h-10 relative">
                    <img src={item?.headPic} className="rounded" />
                  </div>
                  <div className="text-sm">{item?.nickname}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <DreamItems
        show={modalVisible}
        onClose={toggleVisible}
        onSelect={onItemSelect}
      />
      {/* {resultShow && result && (
        <Result
          show={resultShow}
          results={[result]}
          onClose={() => setResultShow(false)}
        />
      )} */}
    </div>
  );
}
