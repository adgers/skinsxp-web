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

  const [lotteryStart, setLotteryStart] = useState(false);
  const [giftList, setGiftList] = useState<API.BoxGiftVo[]>([]);

  const { voice, toggleVoice, fast, toggleFast } = useModel('sys');

  const onLortteryCompleted = async (index: number) => {
    if (index === openCount - 1) {
      sleep(300);
      setResultShow(true);
      setLotteryStart(false);
    }
  };

  const resetGiftList = async () => {
    const list = [...giftList];
    setGiftList([]);
    sleep(300);
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

  const openBox = async () => {
    if (openLoading || lotteryStart) return;
    setOpenLoading(true);
    const ret = await v2OpenBoxUsingGET({
      caseId: Number(caseId),
      number: openCount,
    });
    setOpenLoading(false);
    if (ret.status !== 0) {
      return;
    }
    getUser();
    setResults(ret?.data?.results);
    await sleep(500);
    setLotteryStart(true);
  };

  useEffect(() => {
    if (boxInfoTickets?.boxGiftVo) {
      setGiftList(boxInfoTickets?.boxGiftVo);
    }
  }, [boxInfoTickets?.boxGiftVo]);

  return (
    <div className="max-w-[1400px] w-full m-auto mt-4 px-3">
      <div className="flex grid-cols-3 items-center sm:grid h-[60px] sm:h-[120px] px-4 box-open-title">
        <button
          className="btn btn-sm text-white w-20 gap-1"
          onClick={goback}
          type="button"
        >
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </button>
        <h2 className="mx-auto px-6 text-center text-white md:text-xl font-semibold uppercase truncate">
          {boxDetails?.boxName}
        </h2>
        <div className="flex justify-center space-x-1 sm:justify-end sm:space-x-2">
          <div
            className={`cursor-pointer border border-white text-white px-1 rounded ${
              !voice && 'border-opacity-20 text-opacity-50'
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
            className={`cursor-pointer border border-white text-white px-1 rounded ${
              !fast && 'border-opacity-20 text-opacity-50'
            }`}
            onClick={toggleFast}
          >
            <IconFont type="icon-lighting" />
          </div>
        </div>
      </div>
      <div className="rounded ring-1 ring-light mt-4 py-[15px] p-3 relative h-[174px] md:h-[324px]">
        {openCount === 1 && !lotteryStart && (
          <div className="absolute inset-0 z-30 bg-dark bg-opacity-60 sm:rounded-2xl">
            <div className="absolute left-1/2 grid aspect-[1/1.5] h-full -translate-x-1/2 transform grid-cols-1 grid-rows-1">
              <div className="absolute right-0 top-0 h-full w-full py-2">
                <img
                  src={boxDetails?.boxImage}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="z-10 mx-auto mb-4 mt-auto max-w-full rounded-lg bg-black bg-opacity-50 p-2 text-center text-sm font-semibold uppercase leading-none text-white">
                {boxDetails?.boxName}
              </div>
            </div>
          </div>
        )}

        {openCount > 1 && (
          <div className="w-full h-full relative z-10">
            <div
              className={`grid grid-cols-${openCount} gap-2 md:gap-3 w-full h-full`}
            >
              <div className="arrow-left"></div>
              <div className="arrow-right"></div>
              {Array.from({ length: openCount }).map((item, index) => (
                <Lottery
                  giftList={giftList}
                  lotteryWin={results?.[index] || {}}
                  randomPosition={true}
                  vertical
                  onCompleted={onLortteryCompleted}
                  boxSize={
                    responsive.md
                      ? { width: '100%', height: 200 }
                      : { width: '100%', height: 100 }
                  }
                  start={lotteryStart}
                  wrapHeight={responsive.md ? 300 : 150}
                  fast={fast}
                  voice={voice}
                  lotteryIndex={index}
                  key={index}
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
              boxSize={
                responsive.md
                  ? { width: 250, height: 300 }
                  : { width: 125, height: 150 }
              }
              start={lotteryStart}
              wrapHeight={responsive.md ? 300 : 150}
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
            className="flex items-center justify-center sm:px-12 h-10 sm:h-[60px] uppercase border border-green text-white font-num font-semibold bg-[#18331F] sm:min-w-[310px]"
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
