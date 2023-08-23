import { IconFont } from '@/components/icons';
import Lottery from '@/components/lottery';
import NumberSelect from '@/components/numberSelect';
import WeaponCard from '@/components/weaponCard';
import {
  boxDetailUsingGET,
  boxGiftListUsingGET,
  recentBoxGiftUsingGET,
  v2OpenBoxUsingGET,
} from '@/services/front/kaixiangxiangguan';
import { getBoxColor, goback, numberFixed, sleep } from '@/utils';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage, useModel, useParams, useRequest } from '@umijs/max';
import { useResponsive } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import './index.less';
import Result from './result';

export default function BoxPage() {
  const { getUser } = useModel('user');
  const ref = useRef<HTMLVideoElement>(null);
  const boxId = useParams<{ id: string }>()?.id;
  const responsive = useResponsive();

  const { data: boxDetails } = useRequest(
    async () => {
      return await boxDetailUsingGET({ boxId: Number(boxId) });
    },
    {
      refreshDeps: [boxId],
    },
  );

  const { data: boxInfoTickets } = useRequest(
    async () => {
      return await boxGiftListUsingGET({ boxId: Number(boxId) });
    },
    {
      refreshDeps: [boxId],
    },
  );

  const { data: recentBoxs, refresh } = useRequest(
    async () => {
      return await recentBoxGiftUsingGET({ boxId: Number(boxId), limit: 12 });
    },
    {
      refreshDeps: [boxId],
    },
  );

  const [openCount, setOpenCount] = useState(1);
  const [resultShow, setResultShow] = useState(false);
  const [results, setResults] = useState<API.OpenBoxResultVo[]>();
  const [openLoading, setOpenLoading] = useState(false);

  const [lotteryStart, setLotteryStart] = useState(false);
  const [lotteryShow, setLotteryShow] = useState(false);

  const { voice, toggleVoice, fast, toggleFast } = useModel('sys');

  const onLortteryCompleted = async (index: number) => {
    if (index === openCount - 1) {
      sleep(300);
      setResultShow(true);
      setLotteryStart(false);
    }
  };

  const onResultClose = async () => {
    setResultShow(false);
    getUser();
    setLotteryShow(false);
    refresh();
  };

  const openBox = async () => {
    if (openLoading || lotteryShow) return;
    setOpenLoading(true);
    const ret = await v2OpenBoxUsingGET({
      boxId: Number(boxId),
      number: openCount,
    });
    setOpenLoading(false);
    if (ret.status !== 0) {
      return;
    }
    getUser();
    setResults(ret?.data?.results);
    setLotteryShow(true);
    await sleep(500);
    setLotteryStart(true);
  };

  useEffect(() => {
    if (lotteryShow) {
      ref.current?.pause();
    } else {
      ref.current?.play();
    }
  }, [location.search, lotteryShow]);

  return (
    <div className="max-w-[1400px] w-full m-auto mt-4 px-3">
      <div className="flex grid-cols-3 items-center sm:grid h-[38px] sm:h-[76px] box-open-title px-4">
        <button
          className="btn btn-sm btn-neutral w-16 !gap-[2px] !px-0"
          onClick={goback}
          type="button"
        >
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </button>
        <h2 className="mx-auto px-6 text-center text-base md:text-xl font-semibold uppercase truncate">
          {boxDetails?.boxName}
        </h2>
        <div className="flex justify-center space-x-1 sm:justify-end sm:space-x-2">
          <div
            className={`cursor-pointer border border-accent p-1 rounded ${
              !voice && 'border-opacity-20'
            }`}
            onClick={toggleVoice}
          >
            {voice ? (
              <IconFont type="icon-shengyin" />
            ) : (
              <IconFont type="icon-shengyinguanbi" />
            )}
          </div>

          <div
            className={`cursor-pointer border border-accent p-1 rounded ${
              !fast && 'border-opacity-20'
            }`}
            onClick={toggleFast}
          >
            <IconFont type="icon-lighting" />
          </div>
        </div>
      </div>
      <div className="bg-neutral h-[152px] md:h-[304px] mt-4 rounded openbox-bg">
        {lotteryShow && openCount > 1 && (
          <div className="w-full h-full relative z-10">
            <div
              className={`grid grid-cols-${openCount} gap-2 md:gap-3 w-full`}
            >
              <div className="arrow-left"></div>
              <div className="arrow-right"></div>
              {Array.from({ length: openCount }).map((item, index) => (
                <Lottery
                  giftList={boxInfoTickets?.boxGiftVo || []}
                  lotteryWin={results?.[index] || {}}
                  randomPosition={false}
                  vertical
                  onCompleted={onLortteryCompleted}
                  boxSize={
                    responsive.md
                      ? { width: 128, height: 112 }
                      : { width: 64, height: 56 }
                  }
                  start={lotteryStart}
                  wrapHeight={responsive.md ? 304 : 152}
                  fast={fast}
                  voice={voice}
                  lotteryIndex={index}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}

        {lotteryShow && openCount === 1 && (
          <div className="w-full relative h-full z-10">
            <div className="arrow-top"></div>
            <div className="arrow-bottom"></div>
            <Lottery
              giftList={boxInfoTickets?.boxGiftVo || []}
              lotteryWin={results?.[0] || {}}
              onCompleted={onLortteryCompleted}
              randomPosition={false}
              boxSize={
                responsive.md
                  ? { width: 200, height: 175 }
                  : { width: 100, height: 88 }
              }
              start={lotteryStart}
              wrapHeight={responsive.md ? 304 : 152}
              lotteryIndex={0}
              fast={fast}
              voice={voice}
            />
          </div>
        )}

        {!lotteryShow && (
          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src={boxDetails?.boxImage}
              className="h-[152px] md:h-[304px]"
            />
            <video
              loop={true}
              className="h-[152px] md:h-[304px] absolute"
              muted={true}
              src={boxDetails?.secondVideo}
              ref={ref}
              controls={false}
              playsInline={true}
              webkit-playsinline="true"
              x5-playsinline="true"
            ></video>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
        <NumberSelect
          count={5}
          onChange={(i) => {
            setOpenCount(i);
          }}
          disabled={openLoading || lotteryShow}
          value={openCount}
        />
        <button
          type="button"
          onClick={openBox}
          className="flex items-center justify-center h-8 sm:h-12 px-4 uppercase border border-secondary text-secondary rounded font-num font-semibold bg-secondary bg-opacity-20"
        >
          <div className="open-btn-arr animate-pulse" />
          <div className="flex gap-2 px-1 flex-1 justify-center">
            {openLoading && <LoadingOutlined />}
            <IconFont type="icon-coin" />
            <CountUp
              end={numberFixed((boxDetails?.openPrice || 0) * openCount)}
              duration={0.3}
              decimals={2}
              separator=""
              className="font-num"
            />
            <FormattedMessage id="open_box_open" />
          </div>
          <div className="open-btn-arr-right animate-pulse" />
        </button>
      </div>

      <div className="box-title mt-10">
        <span className="text-center text-base sm:text-2xl uppercase font-semibold">
          <FormattedMessage id="open_box_lastdrop" />
        </span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
        {recentBoxs?.map((item, i: number) => {
          return (
            <div className="card-flip" key={i}>
              <div className="front">
                <WeaponCard data={item} key={i} />
              </div>
              <div className="back">
                <div className="flex flex-col gap-3 items-center justify-center w-full h-full bg-neutral bg-opacity-70 cursor-pointer rounded-md">
                  <div className="avatar w-10 h-10 relative rounded">
                    <img src={item?.headPic} />
                    <img
                      src={item?.headGround}
                      className="absolute left-0 top-0 w-full h-full"
                    />
                  </div>
                  <div className="text-sm">{item?.nickname}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="box-title mt-10">
        <span className="text-center text-base sm:text-2xl uppercase font-semibold">
          <FormattedMessage id="open_box_content" />
        </span>
      </div>

      <div>
        {boxInfoTickets?.gradeGiftProb && (
          <div className="flex items-center justify-center gap-2 flex-wrap my-4 font-num">
            <span className="text-sm uppercase font-semibold">
              <FormattedMessage id="drop_probability" />
            </span>
            {boxInfoTickets?.gradeGiftProb?.map((item, i: number) => {
              const color = getBoxColor(item.grade || 0);
              return (
                <div className="flex items-center gap-2" key={i}>
                  <div
                    className="w-6 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className={`text-white text-sm text-[${color}]`}>
                    {item?.prob && numberFixed(item?.prob * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {boxInfoTickets?.boxGiftVo?.map((item, i: number) => {
            return <WeaponCard data={item} key={i} />;
          })}
        </div>
      </div>

      <Result
        show={resultShow}
        results={results || []}
        onClose={onResultClose}
      />
    </div>
  );
}
