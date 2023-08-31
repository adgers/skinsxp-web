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
import { getBoxColor, goback, numberFixed, sleep, useStateRef } from '@/utils';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage, useModel, useParams, useRequest } from '@umijs/max';
import { useResponsive } from 'ahooks';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import './index.less';
import Result from './result';

export default function BoxPage() {
  const { getUser } = useModel('user');
  const caseId = useParams<{ id: string }>()?.id;
  const responsive = useResponsive();

  const { data: boxDetails } = useRequest(
    async () => {
      return await boxDetailUsingGET({ caseId: Number(caseId) });
    },
    {
      refreshDeps: [caseId],
    },
  );

  const { data: boxInfoTickets } = useRequest(
    async () => {
      return await boxGiftListUsingGET({ caseId: Number(caseId) });
    },
    {
      refreshDeps: [caseId],
    },
  );

  const { data: recentBoxs, refresh } = useRequest(
    async () => {
      return await recentBoxGiftUsingGET({
        caseId: Number(caseId),
        limit: 6,
        isTop: true,
      });
    },
    {
      refreshDeps: [caseId],
    },
  );
  const [openCount, setOpenCount] = useState(1);
  const [resultShow, setResultShow] = useState(false);
  const [results, setResults] = useState<API.OpenBoxResultVo[]>();
  const [openLoading, setOpenLoading] = useState(false);

  const [hasOpen, setHasOpen] = useState(false);
  const [lotteryStart, setLotteryStart] = useState(false);
  const lotteryStartRef = useStateRef(lotteryStart);
  const [giftList, setGiftList] = useState<API.BoxGiftVo[]>([]);
  const { voice, toggleVoice, fast, toggleFast } = useModel('sys');

  const onLortteryCompleted = async (index: number) => {
    if (index === openCount - 1) {
      await sleep(500);
      setResultShow(true);
      setLotteryStart(false);
      lotteryStartRef.current = false;
    }
  };

  const resetGiftList = async () => {
    const list = [...giftList];
    setGiftList([]);
    await sleep(300);
    setGiftList(list);
  };

  const onResultClose = async () => {
    setResultShow(false);
    getUser();
    refresh();
    resetGiftList();
  };

  const onNumberChange = async (i: number) => {
    setOpenCount(i);
    resetGiftList();
  };

  const playAudio = () => {
    // if (fast) {
    //   fastAudio.currentTime = 0;
    //   fastAudio.play();
    // } else {
    //   audio.currentTime = 0;
    //   audio.play();
    // }
  };

  const openBox = async () => {
    if (openLoading || lotteryStartRef.current) return;
    setOpenLoading(true);
    const ret = await v2OpenBoxUsingGET({
      caseId: Number(caseId),
      number: openCount,
    });
    setOpenLoading(false);
    if (ret.status !== 0) {
      return;
    }
    setHasOpen(true);
    getUser();
    setResults(ret?.data?.results);
    lotteryStartRef.current = true;

    await sleep(500);
    setLotteryStart(true);

    if (voice) {
      playAudio();
    }
  };

  useEffect(() => {
    if (boxInfoTickets?.boxGiftVo) {
      setGiftList(boxInfoTickets?.boxGiftVo);
    }
  }, [boxInfoTickets?.boxGiftVo]);

  return (
    <div className="max-w-[1400px] w-full m-auto mt-4 px-3">
      <div className="flex flex-row items-center h-[60px] sm:h-[120px] box-open-title">
        <button
          className="btn btn-sm text-white gap-1"
          onClick={goback}
          type="button"
        >
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </button>
        <h2 className="mx-auto px-6 text-center text-white md:text-xl font-semibold uppercase truncate flex-1 w-full">
          {boxDetails?.boxName}
        </h2>
        <div className="flex justify-center space-x-1 sm:justify-end sm:space-x-2">
          <div
            className={`cursor-pointer  text-white px-1 rounded ${
              !voice && 'text-opacity-50'
            }`}
            onClick={toggleVoice}
          >
            {voice ? (
              <IconFont type="icon-a-voiceon" />
            ) : (
              <IconFont type="icon-a-voiceoff" />
            )}
          </div>

          <div
            className={`cursor-pointer  text-white px-1 rounded ${
              !fast && 'text-opacity-50'
            }`}
            onClick={toggleFast}
          >
            <IconFont type="icon-lighting" />
          </div>
        </div>
      </div>
      <div className="rounded ring-1 ring-light mt-4 p-0 sm:p-3 relative h-[174px] md:h-[324px] lottery-bg">
        {openCount === 1 && !hasOpen && (
          <div className="absolute inset-0 z-30 bg-dark bg-opacity-60 sm:rounded-2xl">
            <div className="absolute left-1/2 grid aspect-[1/1.5] h-full -translate-x-1/2 transform grid-cols-1 grid-rows-1">
              <div className="absolute right-0 top-0 h-full w-full">
                <img
                  src={boxDetails?.boxImage}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {openCount > 1 && (
          <div className="w-full h-full relative z-10">
            <div className="grid-cols-5 hidden"></div>
            <div
              className={`grid grid-cols-${openCount} gap-2 md:gap-3 w-full h-full`}
            >
              <div className="arrow-left"></div>
              <div className="arrow-right"></div>
              {Array.from({ length: openCount }).map((item, index) => (
                <Lottery
                  giftList={giftList}
                  lotteryWin={results?.[index] || {}}
                  randomPosition={false}
                  vertical
                  onCompleted={onLortteryCompleted}
                  boxSize={
                    responsive.md
                      ? { width: '100%', height: 112 }
                      : { width: '100%', height: 56 }
                  }
                  start={lotteryStart}
                  wrapHeight={responsive.md ? 300 : 174}
                  fast={fast}
                  lotteryIndex={index}
                  key={index}
                  voice={voice}
                />
              ))}
            </div>
          </div>
        )}

        {openCount === 1 && (
          <div className="w-full relative h-full z-10">
            <div className="arrow-top"></div>
            <div className="arrow-bottom"></div>
            <Lottery
              giftList={giftList}
              lotteryWin={results?.[0] || {}}
              onCompleted={onLortteryCompleted}
              randomPosition={true}
              showLogo={false}
              showName={true}
              boxSize={
                responsive.md
                  ? { width: 250, height: 300 }
                  : { width: 125, height: 170 }
              }
              start={lotteryStart}
              wrapHeight={responsive.md ? 300 : 170}
              lotteryIndex={0}
              fast={fast}
              voice={voice}
            />
          </div>
        )}
      </div>
      <div className="mt-6 grid w-full px-2 sm:mt-8 sm:w-auto">
        <div className="col-start-1 row-start-1 mx-auto grid w-full transform gap-2 transition duration-300 ease-out sm:gap-4 md:w-auto md:gap-8 grid-cols-2">
          <NumberSelect
            count={5}
            onChange={onNumberChange}
            disabled={openLoading || lotteryStart}
            value={openCount}
          />
          <button
            type="button"
            onClick={openBox}
            className="btn-green sm:px-12 !h-10 sm:!h-[60px] !min-h-fit uppercase font-num font-semibold sm:min-w-[310px]"
          >
            <div className="flex gap-2 px-1 flex-1 justify-center">
              {openLoading && <LoadingOutlined />}
              $
              <CountUp
                end={numberFixed((boxDetails?.openPrice || 0) * openCount)}
                duration={0.3}
                decimals={2}
                separator=""
                className="font-num"
              />
              <FormattedMessage id="open_box_open" />
            </div>
          </button>
        </div>
      </div>

      <div className="box-title mt-10">
        <span className="text-center  text-white sm:text-2xl uppercase font-semibold">
          <FormattedMessage id="open_box_lastdrop" />
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-4">
        {recentBoxs?.map((item, i: number) => {
          return (
            <div className="card-flip relative group" key={i}>
              <WeaponCard data={item} key={i} isGiveawayWinList={true} />
              <div className="absolute w-full h-full top-0 left-0 z-[11] bg-black/70 flex flex-col items-center opacity-0  transition-opacity justify-center group-hover:opacity-100 gap-1">
                <div className="w-[66px] h-[66px] rounded-full overflow-hidden">
                  <img src={item?.headPic} alt="" />
                </div>
                <div className="text-sm">{item?.nickname}</div>
                <div className="text-sm">{item?.createTime}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="box-title mt-10">
        <span className="text-center text-white sm:text-2xl uppercase font-semibold">
          <FormattedMessage id="open_box_content" />
        </span>
      </div>
      <div>
        {boxInfoTickets?.gradeGiftProb && (
          <div className="flex items-center justify-center gap-2 flex-wrap my-4 font-num">
            {boxInfoTickets?.gradeGiftProb?.map((item, i: number) => {
              const color = getBoxColor(item.grade || 0);
              return (
                <div className="flex items-center gap-2" key={i}>
                  <div
                    className="w-5 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className={`text-white text-xs text-[${color}]`}>
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
