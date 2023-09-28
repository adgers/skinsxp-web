import winnerIcon from '@/assets/winner-icon.png';
import Countdown from '@/components/countdown';
import { IconFont } from '@/components/icons';
import Lottery from '@/components/lottery';
import WeaponCard from '@/components/weaponCard';
import {
  cancelBattleUsingPOST,
  getBattleDetailUsingGET,
  getBattleResultsUsingGET,
  joinBattleUsingPOST,
  joinBotUsingPOST,
} from '@/services/front/duizhanxiangguan';
import { isLogin, numberFixed, sleep } from '@/utils';
import {
  CheckCircleFilled,
  CopyOutlined,
  LeftOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  FormattedMessage,
  Link,
  history,
  useIntl,
  useModel,
  useParams,
  useRequest,
} from '@umijs/max';
import { useResponsive } from 'ahooks';
import 'animate.css';
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useMemo, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Verify from './verify';

import { Howl } from 'howler';

import { Spin } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import BoxDetail from './boxDetail';
import './index.less';
import Result from './result';

const countTotalPrice = (record: any) => {
  if (!record) return numberFixed(0, 2);
  let price = 0;
  record.forEach((t: any) => {
    price += t.giftPrice;
  });
  return numberFixed(price, 2);
};

const WartingCard = ({
  user,
  onJoin,
  onJoinBot,
  joinLoading,
  joinBotLoading,
  isOwner,
  mode,
  modeName,
}: {
  user?: any;
  userList?: any;
  onJoin: () => void;
  onJoinBot: () => void;
  isOwner: boolean;
  joinLoading: boolean;
  joinBotLoading: boolean;
  mode: number;
  modeName: string;
}) => {
  return (
    <div>
      {user?.customerId ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="relative">
            <CheckCircleFilled className="text-green text-[32px]" />
            <div className="animate-circleChange absolute w-8 h-8 rounded-full left-0 top-0 border-2 border-green"></div>
          </div>
          <span className="font-num text-white uppercase text-xs sm:text-base whitespace-wrap text-center">
            Ready to battle
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          {isOwner ? (
            <div
              className="btn-green !text-xs sm:!text-sm uppercase font-semibold "
              onClick={onJoinBot}
            >
              {joinLoading && <LoadingOutlined />}
              <IconFont type="icon-battle" className="text-white text-sm" />
              <FormattedMessage id="battle_room_join_bot" />
            </div>
          ) : (
            <>
              <div className="w-full font-num uppercase h-full flex items-center justify-center text-center animate-pulse text-white text-xs sm:text-base">
                ARE YOU READY TO PLAY
              </div>
              <div
                className={`px-4 py-2 text-xs sm:text-sm cursor-pointer uppercase font-semibold ${
                  mode === 0 ? 'btn-green' : 'btn-red'
                }`}
                onClick={() => {
                  onJoin();
                  window?.fbq(
                    'trackSingleCustom',
                    '1024868335308144',
                    'join_battle',
                  );
                }}
              >
                {joinBotLoading && <LoadingOutlined />}
                <IconFont type="icon-battle" className="text-white text-sm" />
                <FormattedMessage id="battle_room_join" />
                <span className="hidden sm:block">{modeName}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const ResultCard = ({ result }: { result: API.BattleCustomerGainVo }) => {
  return (
    <div className="flex flex-col animate__animated animate__zoomIn items-center gap-1">
      {result?.winner ? (
        <>
          <div className="font-num text-green text-sm sm:text-[42px] sm:leading-[42px] animate-bounce">
            WINNER
          </div>
          <div className="flex gap-1 items-center font-num text-green text-xs sm:text-base uppercase">
            <FormattedMessage id="battle_room_total" />
            <span>$</span>
            <CountUp
              end={result?.totalPrice || 0}
              duration={1}
              decimals={2}
              separator=""
            />
          </div>
        </>
      ) : (
        <>
          <div className="font-num text-light text-sm sm:text-[42px] sm:leading-[42px]">
            LOSER
          </div>
          {/* <div className="flex gap-1 items-center font-num text-xs sm:text-base">
            $
            <CountUp
              end={result?.totalPrice || 0}
              duration={1}
              decimals={2}
              separator=""
            />
          </div> */}
        </>
      )}
    </div>
  );
};

const ResultBoxs = ({
  boxs,
  cols,
  mini,
}: {
  boxs: API.BattleBoxRecordVo[];
  cols: number;
  mini: boolean;
}) => {
  let colsClass = 'grid-cols-4';
  if (cols === 2) {
    colsClass = 'sm:grid-cols-4';
  } else if (cols === 3) {
    colsClass = 'sm:grid-cols-3';
  } else if (cols === 4) {
    colsClass = 'sm:grid-cols-2';
  }

  return (
    <TransitionGroup
      className={`flex flex-col sm:grid gap-1 sm:grid-flow-row-dense sm:gap-2 ${colsClass} items-center mt-2 sm:mt-4 w-full`}
    >
      {boxs?.map((item) => (
        <CSSTransition
          key={item.id}
          classNames={{
            enter: 'animate-item-enter',
            enterActive: 'animate-item-enter-active',
            enterDone: 'animate-item-enter-done',
            exit: 'animate-item-exit',
            exitActive: 'animate-item-exit-active',
            exitDone: 'animate-item-exit-done',
          }}
          timeout={500}
        >
          <WeaponCard data={item} mini={mini} showRoll={false} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default function RoomDetail() {
  const boxListRef = useRef<HTMLDivElement>(null);
  const battleCode = useParams<{ id: string }>()?.id;
  const [boxDetail, setBoxDetail] = useState<any>();
  const [boxDetailShow, setBoxDetailShow] = useState(false);
  const [cancelConfrimShow, setCancelConfirmShow] = useState(false);
  const [countDownShow, setCountDownShow] = useState(false);
  const [verifyShow, setVerifyShow] = useState(false);
  const [index, setIndex] = useState<number>(1);
  const [openResult, setOpenResult] = useState<
    API.BattleCustomerOpenBoxVo[] & API.BattleCustomerGainVo[]
  >();
  const [lotteryStart, setLotteryStart] = useState(false);
  const [lotteryShow, setLotteryShow] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinBotLoading, setJoinBotLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultModalData, setResultModalData] = useState<API.BattleBoxGainVo[]>(
    [],
  );
  const { getUser, userInfo } = useModel('user');
  const { voice, toggleVoice } = useModel('sys');
  const [myRoom, setMyRoom] = useState(false);
  const [replay, setReplay] = useState(false);
  const responsive = useResponsive();
  const { battleState } = useModel('socket');

  const battleAudio = useMemo(
    () =>
      new Howl({
        src: [require('@/assets/audio/battle-bgm.mp3')],
        loop: true,
      }),
    [],
  );

  const winAudio = useMemo(
    () =>
      new Howl({
        src: [require('@/assets/audio/win.wav')],
      }),
    [],
  );

  const failAudio = useMemo(
    () =>
      new Howl({
        src: [require('@/assets/audio/fail.wav')],
      }),
    [],
  );

  const readyAudio = useMemo(
    () =>
      new Howl({
        src: [require('@/assets/audio/ready.wav')],
      }),
    [],
  );

  const intl = useIntl();
  const battleMode = [
    intl.formatMessage({ id: 'room_mode_oh' }),
    intl.formatMessage({ id: 'room_mode_fq' }),
  ];

  const isWinUser = (mode: any, userid: number) => {
    if (!openResult || !userid || openResult?.length === 0) return null;
    if (mode === 0 || mode === 3) {
      //欧皇模式数字最大是胜利方
      let maxPrice = 0;
      let maxUserId: number[] = [];

      openResult?.forEach((t) => {
        if (!t.customerId) return;
        let price = 0;
        t?.userOpenBoxRecord?.forEach((r) => {
          price += r.giftPrice || 0;
        });
        if (price > maxPrice) {
          maxPrice = price;
          maxUserId = [t.customerId];
        } else if (price === maxPrice) {
          maxUserId.push(t.customerId);
        }
      });

      return maxUserId.includes(userid);
    } else {
      let minPrice: any;
      let minUserId: number[] = [];

      openResult?.forEach((t) => {
        let price = 0;
        if (!t.customerId) return;
        t?.userOpenBoxRecord?.forEach((r) => {
          price += r.giftPrice || 0;
        });
        if (minPrice === undefined) {
          minPrice = price;
          minUserId.push(t.customerId);
        } else if (price < minPrice) {
          minPrice = price;
          minUserId = [t.customerId];
        } else if (price === minPrice) {
          minUserId.push(t.customerId);
        }
      });
      return minUserId.includes(userid);
    }
  };

  const onShowBoxDetail = (
    boxName: string,
    giftList: any,
    gradeGiftProb: any,
  ) => {
    setBoxDetail({
      boxName,
      boxGiftVo: giftList,
      gradeGiftProb: gradeGiftProb,
    });
    setBoxDetailShow(true);
  };

  const { data, refresh, loading } = useRequest(
    () => battleCode && getBattleDetailUsingGET({ battleCode }),
    {
      refreshDeps: [battleCode],
    },
  );

  useEffect(() => {
    if (battleState?.battleCode === battleCode) {
      if (battleState?.state === 2) {
        return;
      }
      refresh();
    }
  }, [battleState]);

  const { data: roomResult } = useRequest<{ data?: API.BattleResultVo }>(
    async () => {
      if (data?.state === 1 || data?.state === 2) {
        return await getBattleResultsUsingGET({ battleCode: battleCode || '' });
      }
    },
    {
      refreshDeps: [data?.state],
    },
  );

  const onJoin = async (pos: number) => {
    if (joinLoading) {
      return;
    }
    setJoinLoading(true);
    const ret = await joinBattleUsingPOST({
      battleCode: battleCode || '',
      pos,
    });
    setJoinLoading(false);
    if (ret.status === 0) {
      // toast.success(<FormattedMessage id="roll_detail_jrcg" />);
      if (voice) {
        readyAudio.play();
      }
      getUser();
    }
  };

  const onJoinBot = async (pos: number) => {
    if (joinBotLoading) {
      return;
    }
    setJoinBotLoading(true);
    const ret = await joinBotUsingPOST({ battleCode: battleCode || '', pos });
    setJoinBotLoading(false);
    if (ret.status === 0) {
      if (voice) {
        readyAudio.play();
      }
    }
  };

  const cancelRoom = async () => {
    if (cancelLoading) {
      return;
    }
    setCancelLoading(true);
    const ret = await cancelBattleUsingPOST({ battleCode: battleCode || '' });
    setCancelLoading(false);
    setCancelConfirmShow(false);
    if (ret.status === 0) {
      getUser();
      history.replace({ pathname: '/battle', search: location?.search || '' });
    }
  };

  const goTo = (index: number) => {
    setIndex(index);

    const boxList = boxListRef.current?.children;
    boxList?.[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const initOpenResult = (i: number) => {
    if (!roomResult?.boxOpenRecords) return;

    const resultArr: API.BattleCustomerOpenBoxVo[] = cloneDeep(
      roomResult?.boxOpenRecords,
    );
    resultArr?.map((record) => {
      record.userOpenBoxRecord = record?.userOpenBoxRecord?.slice(0, i);
      return record;
    });

    //将resultArr中的数据倒序
    resultArr?.forEach((t) => {
      t.userOpenBoxRecord = t?.userOpenBoxRecord?.reverse();
    });

    setOpenResult(resultArr);
  };

  const playAudio = () => {
    battleAudio.play();
  };

  const onCountDownFinish = async () => {
    await sleep(1500);
    setCountDownShow(false);
    await sleep(500);
    goTo(1);
    setLotteryStart(true);
    if (voice) {
      playAudio();
    }
  };

  const onLortteryCompleted = async () => {
    initOpenResult(index);
    // itemAudio.play();
    setLotteryStart(false);
    if (data?.boxList && index === data?.boxList?.length) {
      await sleep(2500);
      setLotteryShow(false);
      setIsEnd(true);
      if (voice) {
        battleAudio.stop();
      }
      if (myRoom) {
        let isWin = false;
        const myRecord = roomResult?.customerGainList?.find(
          (t) => t.customerId === userInfo?.id,
        );

        if (myRecord) {
          isWin = !!myRecord.winner;
          setResultModalData(myRecord?.userOpenBoxRecord || []);
        }
        if (isWin) {
          if (voice) {
            winAudio.play();
          }
          await sleep(2500);
          if (!replay) {
            setResultModalVisible(true);
          }
        } else {
          if (voice) {
            failAudio.play();
          }
        }
      }
    } else {
      await sleep(1000);
      goTo(index + 1);
      await sleep(1000);
      setLotteryStart(true);
    }
  };

  useEffect(() => {
    if (data?.state === 3) {
      toast.error(intl.formatMessage({ id: 'battle_room_cancel' }));
      history.replace({ pathname: '/battle', search: location?.search || '' });
    }

    if (data?.customerList) {
      const isMyRoom =
        data?.customerList?.findIndex((t) => t.customerId === userInfo?.id) >
        -1;
      setMyRoom(isMyRoom);
    }

    if (roomResult && data?.state === 2) {
      goTo(data?.boxList?.length || 0);
      setIsEnd(true);
    }
    if (data?.state === 1 && roomResult?.info?.round) {
      const round = roomResult?.info?.round;
      if (round < 1) return;
      if (round === 1) {
        setLotteryShow(true);
        setCountDownShow(true);
      } else {
        initOpenResult(round - 1);
        goTo(round);
        setLotteryShow(true);
        sleep(1000).then(() => {
          setLotteryStart(true);
        });
      }
    }
  }, [roomResult, data?.state]);

  useEffect(() => {
    if (isEnd && roomResult?.customerGainList) {
      if (myRoom) {
        getUser();
      }
      setOpenResult(roomResult?.customerGainList);
    }
  }, [isEnd]);

  //页面离开时停止播放音乐
  useEffect(() => {
    return () => {
      if (voice) {
        battleAudio.stop();
      }
    };
  }, []);

  const {
    countCustomer = 2,
    customerList,
    state,
    boxList,
    mode = 0,
  } = data || {};
  const isOwner = data?.customerId === userInfo?.id;

  const modeName = battleMode[mode];

  const goHistory = () => {
    setOpenResult([]);
    setIsEnd(false);
    setReplay(true);

    setCountDownShow(true);
    setLotteryShow(true);
  };

  return (
    <div className="max-w-[1400px] w-full m-auto mt-4 battle-detail px-1 sm:px-0">
      {countDownShow && (
        <Countdown onFinish={onCountDownFinish} voice={voice} />
      )}
      {resultModalVisible && (
        <Result
          show={resultModalVisible}
          results={resultModalData}
          onClose={() => setResultModalVisible(false)}
        />
      )}

      <div className="my-5 flex w-full flex-col justify-between border-b border-light lg:mb-0 lg:mt-8 lg:flex-row">
        <div className="-mb-px items-center border-b border-green pb-6 pr-6 font-semibold uppercase text-white flex">
          <Link className="-my-2 -ml-3 px-3 py-2 text-white" to="/battle">
            <LeftOutlined />
          </Link>
          <FormattedMessage id="battle_room_battle" />
        </div>
        {isLogin() && (
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-4 md:pb-3">
              <Link
                className={`uppercase font-semibold ${
                  mode === 0 ? 'btn-green' : 'btn-red'
                }`}
                to={`/battle/create/${battleCode}`}
              >
                <IconFont type="icon-battle" />
                <FormattedMessage id="battle_create_same" /> ${data?.totalPrice}
              </Link>

              <Link className="btn-purple " to={`/battle/create`}>
                <IconFont type="icon-battle" />
                <FormattedMessage id="arena_cjfy" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
      >
        <div className="flex flex-col gap-3 mt-4">
          <div
            className={`bg-black py-5 flex px-5 sm:px-8 items-center gap-2 rounded battle-mode-${mode}`}
          >
            <div className="flex gap-2 sm:gap-4 items-center">
              <div
                className={`w-[60px] h-[60px] flex items-center justify-center rounded-full relative ring ${
                  mode === 1 ? 'ring-red' : 'ring-green'
                }`}
              >
                <span className="font-num text-white text-2xl">
                  {boxList?.length}
                </span>
                {state !== 2 && (
                  <div
                    className={`animate-circleChange absolute  h-full w-full rounded-full left-0 top-0 border ${
                      mode === 1 ? 'border-red' : 'border-green'
                    }`}
                  ></div>
                )}
              </div>
              <div className="text-xs font-semibold">
                <div className="text-white uppercase hidden sm:block">
                  <FormattedMessage id="battle_battle_rounds" />
                </div>
                <div className="font-num text-sm sm:text-xs">
                  {boxList &&
                    boxList?.length > 0 &&
                    `${index}/${boxList?.length}`}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 flex-nowrap" ref={boxListRef}>
                {boxList?.map((item, i) => {
                  const isActive = i + 1 === index;
                  return (
                    <div
                      key={i}
                      className={`w-[64px] md:w-[84px] rounded-sm overflow-hidden flex-shrink-0 relative flex justify-center items-center cursor-pointer transform will-change-transform transition duration-300 ${
                        isActive && !isEnd
                          ? ''
                          : isEnd
                          ? 'opacity-100'
                          : 'opacity-30'
                      }`}
                      onClick={() =>
                        onShowBoxDetail(
                          item.boxName,
                          item.giftList,
                          item.gradeGiftProb,
                        )
                      }
                    >
                      <img src={item.boxImage} className="w-full h-full" />
                      <p className="absolute left-0 bottom-0 w-full p-1 text-center font-semibold text-white truncate bg-black bg-opacity-70 text-[8px]">
                        {item.boxName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center sm:justify-end flex-wrap">
            {roomResult && isEnd && (
              <>
                <div
                  className="cursor-pointer flex gap-2 uppercase font-semibold"
                  onClick={goHistory}
                >
                  <IconFont type="icon-luxiang" />
                  <span className="text-xs text-white/70">
                    <FormattedMessage id="battle_replay" />
                  </span>
                </div>
              </>
            )}
            {isOwner && customerList && customerList?.length < 2 && (
              <div
                className="cursor-pointer flex gap-1 uppercase font-semibold"
                onClick={() => setCancelConfirmShow(true)}
              >
                <IconFont type="icon-exit" />
                <span className="text-xs text-white/70">
                  <FormattedMessage id="battle_cancel" />
                </span>
              </div>
            )}

            <div
              className={`cursor-pointer flex gap-1 uppercase font-semibold text-white ${
                !voice && 'text-opacity-50'
              }`}
              onClick={toggleVoice}
            >
              {voice ? (
                <IconFont type="icon-a-voiceon" />
              ) : (
                <IconFont type="icon-a-voiceoff" />
              )}
              <span className="text-xs text-white/70">
                <FormattedMessage id="text_normal_sound" />
              </span>
            </div>

            <CopyToClipboard
              text={`${window.location.href.split('?')[0]}`}
              onCopy={() => {
                toast.success(intl.formatMessage({ id: 'copy_success' }));
              }}
            >
              <div className="flex gap-1 cursor-pointer font-semibold">
                <CopyOutlined />
                <span className="text-xs text-white/70">
                  {location.href.split('?')[0]}
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <div
          className={`grid grid-cols-${countCustomer} gap-2 sm:gap-3 w-full mt-4`}
        >
          {Array.from({ length: countCustomer }).map((_, i) => {
            const isLast = i === countCustomer - 1;
            const user = customerList?.filter(
              (u) => Number(u?.pos) === i + 1,
            )[0];

            const userOpenRecord = roomResult?.boxOpenRecords?.filter(
              (item) => item.customerId === user?.customerId,
            )[0];

            const userLastResult = roomResult?.customerGainList?.filter(
              (item) => item.customerId === user?.customerId,
            )[0];

            const userOpeningResult = openResult?.filter(
              (item) => item.customerId === user?.customerId,
            )[0];

            const isWin = isEnd
              ? userLastResult?.winner
              : isWinUser(data?.mode, user?.customerId);

            const price = isEnd
              ? userOpenRecord?.totalPrice
              : countTotalPrice(userOpeningResult?.userOpenBoxRecord);

            const lotteryWin = userOpenRecord?.userOpenBoxRecord?.[index - 1];
            const giftList = boxList?.filter(
              (t) => t.boxId === lotteryWin?.boxId,
            )[0]?.giftList;

            return (
              <div className="flex flex-col" key={i}>
                <div
                  className={`battle-seat-bg rounded-t h-[200px] sm:h-[300px] px-2 seat-${
                    i + 1
                  } ${isLast ? 'seat-last' : ''}`}
                >
                  {state === 0 && (
                    <WartingCard
                      onJoin={() => {
                        onJoin(i + 1);
                      }}
                      onJoinBot={() => {
                        onJoinBot(i + 1);
                      }}
                      joinLoading={joinLoading}
                      joinBotLoading={joinBotLoading}
                      user={user}
                      userList={customerList}
                      isOwner={isOwner}
                      mode={mode}
                      modeName={modeName}
                    />
                  )}
                  {isEnd && userOpenRecord && (
                    <ResultCard result={userLastResult} />
                  )}
                  {lotteryShow && lotteryWin && (
                    <Lottery
                      giftList={giftList}
                      lotteryWin={lotteryWin}
                      randomPosition={false}
                      vertical
                      onCompleted={onLortteryCompleted}
                      boxSize={
                        responsive.md
                          ? { width: '100%', height: 112 }
                          : { width: '100%', height: 56 }
                      }
                      start={lotteryStart}
                      wrapHeight={responsive.md ? 300 : 200}
                      fast
                      voice={voice}
                      index={index}
                    />
                  )}
                </div>
                <div
                  className={`battle-user rounded-b gap-1 sm:justify-between items-center flex-col md:flex-row text-sm p-3 md:p-4 min-h-[104px] md:min-h-[72px] ${
                    isWin && 'win-user-bg'
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-1 sm:gap-2 items-center">
                    {user?.customerId && (
                      <>
                        <div className="relative">
                          <img
                            src={user?.headPic}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                          />
                          {isWin && (
                            <div className="w-[17px] absolute right-0 top-[-10px]">
                              <img src={winnerIcon} alt="" />
                            </div>
                          )}
                        </div>

                        <span className="truncate text-xs sm:text-sm text-white font-semibold">
                          {user?.nickname}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-1 items-center text-xs sm:text-sm text-green font-num">
                    $
                    <CountUp
                      end={price || 0}
                      duration={1}
                      decimals={2}
                      separator=""
                    />
                  </div>
                </div>
                <div className="battle-result">
                  <ResultBoxs
                    boxs={userOpeningResult?.userOpenBoxRecord || []}
                    cols={data?.countCustomer || 2}
                    mini={!responsive.md}
                  />
                </div>
                {userOpenRecord?.clientSeed && (
                  <div className="mt-2 rounded text-center hidden sm:flex gap-1 flex-col sm:flex-row items-center py-3 bg-black justify-center text-xs text-white/70 ">
                    <div className="uppercase">
                      <FormattedMessage id="battle_user_seed" />:
                    </div>
                    <div>{userOpenRecord?.clientSeed}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {roomResult && isEnd && (
          <div className="flex mt-4 p-3 gap-2 bg-black flex-col sm:flex-row sm:justify-between items-center text-xs rounded">
            <div>
              <Verify
                show={verifyShow}
                onClose={() => setVerifyShow(false)}
                data={roomResult}
              />
              <div
                className="cursor-pointer flex gap-1 uppercase font-semibold bg-dark py-3 px-4 rounded hover:bg-opacity-50"
                onClick={() => setVerifyShow(true)}
              >
                <IconFont type="icon-shield" className="text-green" />
                <span className="text-green">
                  <FormattedMessage id="mine_gpyz" />
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row text-white/70 items-center">
              <div className="flex gap-1">
                <div className="uppercase">
                  <FormattedMessage id="server_seed" />
                </div>
                {roomResult.randKeyVo?.secretHash}
              </div>
              <div className="flex gap-1">
                <div className="uppercase">
                  <FormattedMessage id="started_at" />
                </div>
                {roomResult.info?.battleTime}
              </div>
            </div>
          </div>
        )}

        {boxDetailShow && (
          <BoxDetail
            caseName={boxDetail.boxName}
            boxDetail={boxDetail}
            show={boxDetailShow}
            onClose={() => {
              setBoxDetailShow(false);
            }}
          />
        )}

        <Modal open={cancelConfrimShow} className="confirm-modal-bg max-w-sm">
          <Modal.Header className="text-base mb-2">
            <FormattedMessage id="battle_room_cancel_title" />
          </Modal.Header>
          <Modal.Body className="text-sm">
            <FormattedMessage id="battle_room_cancel_content" />
          </Modal.Body>
          <Modal.Actions>
            <Button
              className="btn-sm btn-outline rounded"
              onClick={() => {
                setCancelConfirmShow(false);
              }}
            >
              <FormattedMessage id="cancel" />
            </Button>
            <Button
              className="btn-primary btn-sm rounded"
              onClick={() => {
                cancelRoom();
              }}
              loading={cancelLoading}
            >
              <FormattedMessage id="confirm" />
            </Button>
          </Modal.Actions>
        </Modal>
      </Spin>
    </div>
  );
}
