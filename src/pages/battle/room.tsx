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
import { numberFixed, sleep } from '@/utils';
import {
  CheckCircleFilled,
  LeftOutlined,
  LoadingOutlined,
  LogoutOutlined,
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
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'swiper/css';
import BoxDetail from './boxDetail';
import './index.less';
import Verify from './verify';

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
}: {
  user?: any;
  userList?: any;
  onJoin: () => void;
  onJoinBot: () => void;
  isOwner: boolean;
  joinLoading: boolean;
  joinBotLoading: boolean;
}) => {
  return (
    <div>
      {user?.customerId ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="relative">
            <CheckCircleFilled className="text-success text-[32px]" />
            <div className="animate-circleChange absolute w-8 h-8 rounded-full left-0 top-0 border-2 border-success"></div>
          </div>
          <span className="font-num">Ready</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <IconFont
            type="icon-zhandou"
            className="text-primary text-[28px] animate-bounce"
          />
          {isOwner ? (
            <div
              className="rounded px-2 py-1 text-xs border border-primary text-primary cursor-pointer flex gap-1 items-center uppercase"
              onClick={onJoinBot}
            >
              {joinLoading && <LoadingOutlined />}
              <FormattedMessage id="battle_room_join_bot" />
            </div>
          ) : (
            <div
              className="rounded px-2 py-1 text-xs border border-primary text-primary cursor-pointer flex gap-1 items-center uppercase"
              onClick={onJoin}
            >
              {joinBotLoading && <LoadingOutlined />}
              <FormattedMessage id="battle_room_join" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ResultCard = ({ result }: { result: API.BattleCustomerGainVo }) => {
  return (
    <div className="flex flex-col animate__animated animate__zoomIn items-center">
      {result?.winner ? (
        <>
          <div className="font-num win-text text-[21px] sm:text-[42px]">
            WIN
          </div>
          <div className="flex gap-1 items-center font-num text-[#D2C87B] text-xs sm:text-base">
            <IconFont type="icon-daimond" />
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
          <div className="font-num lose-text text-[21px] sm:text-[42px]">
            LOSE
          </div>
          <div className="flex gap-1 items-center font-num text-xs sm:text-base">
            <IconFont type="icon-daimond" />
            <CountUp
              end={result?.totalPrice || 0}
              duration={1}
              decimals={2}
              separator=""
            />
          </div>
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
      className={`flex flex-col-reverse sm:grid gap-1 sm:gap-2 ${colsClass} items-center mt-2 sm:mt-4 w-full`}
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
          <WeaponCard data={item} mini={mini} />
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
  const { getUser, userInfo } = useModel('user');
  const { voice, toggleVoice } = useModel('sys');
  const [myRoom, setMyRoom] = useState(false);
  const responsive = useResponsive();
  const { battleState } = useModel('socket');

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

  const { data, refresh } = useRequest(
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
      toast.success(<FormattedMessage id="roll_detail_jrcg" />);
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
      toast.success(<FormattedMessage id="roll_detail_jrcg" />);
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
      toast.success('解散成功');
      getUser();
      history.replace('/battle');
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

    setOpenResult(resultArr);
  };

  const onCountDownFinish = async () => {
    await sleep(1500);
    setCountDownShow(false);
    await sleep(500);
    goTo(1);
    setLotteryStart(true);
  };

  const onLortteryCompleted = async () => {
    initOpenResult(index);
    setLotteryStart(false);
    if (data?.boxList && index === data?.boxList?.length) {
      await sleep(2500);
      setLotteryShow(false);
      setIsEnd(true);
      if (voice && myRoom) {
        let isWin = false;
        const myRecord = roomResult?.customerGainList?.find(
          (t) => t.customerId === userInfo?.id,
        );

        if (myRecord) {
          // isWin = myRecord.winner;
        }
        if (isWin) {
          // winAudio.current.play();
        } else {
          // loseAudio.current.play();
        }
        getUser();
      }
    } else {
      await sleep(1500);
      goTo(index + 1);
      await sleep(1000);
      setLotteryStart(true);
    }
  };

  useEffect(() => {
    if (data?.state === 3) {
      toast.error(intl.formatMessage({ id: 'battle_room_cancel' }));
      history.replace('/battle');
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
        setLotteryStart(true);
      }
    }
  }, [roomResult, data?.state]);

  useEffect(() => {
    if (isEnd && roomResult?.customerGainList) {
      if (responsive.md) {
        setOpenResult(roomResult?.customerGainList);
      } else {
        const ret = roomResult?.customerGainList.map((t) => {
          t.userOpenBoxRecord = t?.userOpenBoxRecord?.reverse();
          return t;
        });
        setOpenResult(ret);
      }
    }
  }, [isEnd]);

  const { countCustomer = 2, customerList, state, boxList, mode } = data || {};
  const isOwner = data?.customerId === userInfo?.id;

  const goHistory = () => {
    setOpenResult([]);
    setIsEnd(false);

    setCountDownShow(true);
    setLotteryShow(true);
  };

  return (
    <div className="max-w-[1400px] w-full m-auto mt-4">
      {countDownShow && <Countdown onFinish={onCountDownFinish} />}
      <div className="battle-title h-[38px] sm:h-[76px]">
        <Link
          className="btn btn-xs sm:btn-sm btn-neutral absolute left-2 top-[50%] -mt-[12px] sm:-mt-[16px] rounded"
          to="/battle"
        >
          <LeftOutlined />
          <FormattedMessage id="common_back" />
        </Link>
        <div className="text-2xl sm:text-3xl">
          {mode !== undefined && (
            <>
              <span>{`${battleMode[mode]}`}</span>
              <span className="font-num">BATTLE</span>
            </>
          )}
        </div>
      </div>
      {data && (
        <div className="px-3 sm:px-0">
          <div className="flex justify-between my-3 sm:my-5">
            <div className="flex items-center text-sm sm:text-base gap-2 font-num">
              <span className="uppercase">Total</span>
              <span className="mx-1">
                <IconFont type="icon-coin" className="mr-1" />
                {data?.totalPrice}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              {roomResult && data.state === 2 && (
                <>
                  <Verify
                    show={verifyShow}
                    onClose={() => setVerifyShow(false)}
                    data={roomResult}
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setVerifyShow(true)}
                  >
                    <IconFont type="icon-shield" className="text-success" />
                  </div>
                  <IconFont type="icon-luxiang" onClick={goHistory} />
                </>
              )}
              {isOwner && customerList && customerList?.length < 2 && (
                <LogoutOutlined onClick={() => setCancelConfirmShow(true)} />
              )}

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
            </div>
          </div>
          <div className="bg-neutral rounded sm:rounded-md py-5 flex px-5 sm:px-8 items-center gap-5">
            <div className="flex gap-4 items-center">
              <div className="w-[78px] h-[78px] sm:w-[120px] sm:h-[120px] flex items-center justify-center relative">
                <div className="round-bg animate-spin-slow"></div>
                <span className="font-num text-[#A5DCFF] text-xl sm:text-4xl">
                  {boxList?.length}
                </span>
              </div>
              <div className="font-num sm:text-xl text-base-content text-opacity-60">
                {index}/{boxList?.length}
              </div>
            </div>
            <div className="flex-1 overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 flex-nowrap" ref={boxListRef}>
                {boxList?.map((item, i) => {
                  const isActive = i + 1 === index;
                  return (
                    <div
                      key={i}
                      className={`w-16 h-16 flex-shrink-0 sm:w-24 sm:h-24 flex justify-center items-center cursor-pointer transform will-change-transform transition duration-300 ${
                        isActive && !isEnd
                          ? 'scale-[1.2]'
                          : isEnd
                          ? 'opacity-100'
                          : 'opacity-50'
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {data && (
        <div className="mt-4 p-3 bg-base-100">
          <div
            className={`grid grid-cols-${countCustomer} gap-2 sm:gap-3 w-full`}
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

              const userOpeningReuslt = openResult?.filter(
                (item) => item.customerId === user?.customerId,
              )[0];

              const isWin = isEnd
                ? userLastResult?.winner
                : isWinUser(data?.mode, user?.customerId);

              const price = countTotalPrice(
                userOpeningReuslt?.userOpenBoxRecord,
              );

              const lotteryWin = userOpenRecord?.userOpenBoxRecord?.[index - 1];
              const giftList = boxList?.filter(
                (t) => t.boxId === lotteryWin?.boxId,
              )[0]?.giftList;

              return (
                <div className="flex flex-col" key={i}>
                  <div
                    className={`battle-seat-bg h-[152px] md:h-[304px] seat-${
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
                      />
                    )}
                    {isEnd && userLastResult && (
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
                            ? { width: 128, height: 112 }
                            : { width: 64, height: 56 }
                        }
                        start={lotteryStart}
                        wrapHeight={responsive.md ? 304 : 152}
                        fast
                        voice={voice}
                      />
                    )}
                  </div>
                  <div
                    className={`battle-user gap-1 sm:justify-between items-center flex-col md:flex-row text-sm p-3 md:p-4 min-h-[104px] md:min-h-[72px] ${
                      isWin && 'win-user-bg'
                    }`}
                  >
                    {user?.customerId ? (
                      <>
                        <div className="flex flex-col md:flex-row gap-1 sm:gap-2 items-center">
                          <div className="relative">
                            <img
                              src={user?.headPic}
                              className="w-8 h-8 md:w-10 md:h-10 rounded-sm"
                            />
                            {user?.headGround && (
                              <img
                                src={user?.headGround}
                                className="absolute left-0 top-0 w-full h-full"
                              />
                            )}
                          </div>

                          <span className="text-base-content text-opacity-50 truncate text-xs sm:text-base">
                            {user?.nickname}
                          </span>
                        </div>
                        <div className="flex gap-1 items-center text-xs sm:text-base">
                          <IconFont type="icon-daimond" />
                          <CountUp
                            end={price || 0}
                            duration={1}
                            decimals={2}
                            separator=""
                            className="font-num"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="w-full font-num uppercase h-full flex items-center justify-center text-center animate-pulse">
                        Waiting for player
                      </div>
                    )}
                  </div>
                  <div className="battle-result">
                    <ResultBoxs
                      boxs={userOpeningReuslt?.userOpenBoxRecord || []}
                      cols={data.countCustomer || 2}
                      mini={!responsive.md}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <BoxDetail
        boxInfo={boxDetail}
        show={boxDetailShow}
        onClose={() => {
          setBoxDetailShow(false);
        }}
      />
      {data && (
        <>
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
        </>
      )}
    </div>
  );
}
