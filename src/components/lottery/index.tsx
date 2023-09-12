import { parseName, sleep } from '@/utils';
import { animated, easings, useSpring } from '@react-spring/web';
import { Howl } from 'howler';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

const Lottery = ({
  giftList,
  lotteryWin,
  onCompleted,
  vertical = false,
  randomPosition = true,
  boxSize,
  wrapHeight = 200,
  start,
  fast = false,
  lotteryIndex = 0,
  showName = false,
  voice = false,
  showLogo = true,
  itemAudioOpen = true,
}: {
  giftList: API.BoxGiftListVo[];
  lotteryWin?: API.BattleBoxGainVo;
  onCompleted: (index: number) => void;
  vertical?: boolean;
  start: boolean;
  randomPosition?: boolean;
  boxSize: { width: number; height: number };
  wrapHeight?: number;
  lotteryIndex?: number;
  fast?: boolean;
  showName?: boolean;
  voice?: boolean;
  showLogo?: boolean;
  itemAudioOpen?: boolean;
}) => {
  const baseNum = 36;
  const winLotteryIndex = 30;
  const duration = fast ? 150 * winLotteryIndex : 300 * winLotteryIndex;
  const [list, setList] = useState<API.BoxGiftListVo[]>([]);
  const prevMoveRef = useRef(0);

  const audio = useMemo(
    // () => new Audio(require('@/assets/audio/tick.mp3')),
    () =>
      new Howl({
        src: [require('@/assets/audio/tick.mp3')],
      }),
    [],
  );

  const itemAudio = useMemo(
    // () => new Audio(require('@/assets/audio/item.wav')),
    () =>
      new Howl({
        src: [require('@/assets/audio/item.wav')],
      }),
    [],
  );

  const playSpinAudio = useCallback(async () => {
    if (!voice) {
      return;
    }

    audio.play();
  }, []);

  const playItemAudio = useCallback(async () => {
    if (!voice || !itemAudioOpen) {
      return;
    }
    itemAudio.play();
  }, []);

  const wrapRef = useRef<HTMLDivElement>(null);

  const [moveSprings, moveApi] = useSpring(() => ({
    from: vertical ? { y: 0 } : { x: 0 },
  }));

  const [scaleSprings, scaleApi] = useSpring(() => ({
    from: { scale: 1 },
  }));

  const [opacitySprings, opacityApi] = useSpring(() => ({
    from: { opacity: 1 },
  }));

  const resetStyle = () => {
    moveApi.start({
      from: vertical ? { y: 0 } : { x: 0 },
    });
    scaleApi.start({
      from: { scale: 1 },
    });
    opacityApi.start({
      from: { opacity: 1 },
    });
  };

  const animateEnd = () => {
    playItemAudio();
    opacityApi.start({
      from: { opacity: 1 },
      to: { opacity: 0.2 },
      config: { duration: 500 },
    });
    scaleApi.start({
      from: { scale: 1 },
      to: { scale: 1.3 },
      config: { duration: 500 },
      onResolve: () => {
        onCompleted(lotteryIndex);
      },
    });
  };

  const animateEndX = (startPos?: number, centerPos?: number) => {
    opacityApi.start({
      from: { opacity: 1 },
      to: { opacity: 0.2 },
      config: { duration: 500 },
    });

    if (startPos && centerPos) {
      moveApi.start({
        from: { x: -startPos },
        to: { x: -centerPos },
        config: { duration: 2000 },
        onResolve: () => {
          playItemAudio();
          scaleApi.start({
            from: { scale: 1 },
            to: { scale: 1.3 },
            config: { duration: 500 },
            onResolve: () => {
              onCompleted(lotteryIndex);
            },
          });
        },
      });
    }
  };

  const initList = () => {
    if (giftList.length === 0) return;
    let list = [...giftList];
    //最少数量为baseNum，如果不足，随机补足到最大baseNum个
    if (list.length < baseNum) {
      const diffNum = baseNum - list.length;
      for (let i = 0; i < diffNum; i++) {
        const randomIndex = Math.floor(Math.random() * list.length);
        list.splice(randomIndex, 0, list[randomIndex]);
      }
    }

    // 随机打乱顺序
    list.sort(() => Math.random() - 0.5);
    setList(list);
  };

  const initWinItem = (lotteryWin: API.BattleBoxGainVo) => {
    const newList = [...list];
    newList[winLotteryIndex] = lotteryWin;
    setList(newList);
  };

  const goMoveY = () => {
    const boxHeight = boxSize.height;
    let randomHeight;
    if (randomPosition) {
      randomHeight = Math.random() * (boxHeight - 30) + 30;
    } else {
      //选中物品的正中间位置
      randomHeight = boxHeight / 2;
    }

    const gapHeight = 8;
    const moveY =
      winLotteryIndex * (boxHeight + gapHeight) - wrapHeight / 2 + randomHeight;

    moveApi.start({
      from: { y: 0 },
      to: { y: -moveY },
      config: { duration: duration, easing: easings.easeOutCubic },
      onChange: (props) => {
        const currentMoveY = props.value.y;
        const distanceDelta = currentMoveY - prevMoveRef.current;
        const speed = Math.abs(distanceDelta);
        if (speed > boxHeight - 1) {
          prevMoveRef.current = currentMoveY;
          if (lotteryIndex === 0) {
            playSpinAudio();
          }
        }
      },
      onResolve: () => {
        animateEnd();
      },
    });
  };

  const goMoveX = () => {
    const boxWidth = boxSize.width;
    let randomWidth;
    if (randomPosition) {
      //随机位置在箱子宽度10到箱子宽度-10之间
      randomWidth = Math.random() * (boxWidth - 5) + 5;
    } else {
      //选中物品的正中间位置
      randomWidth = boxWidth / 2;
    }

    const gapWidth = 8;
    const wrapWidth = wrapRef.current?.offsetWidth || 0;
    const moveX =
      winLotteryIndex * (boxWidth + gapWidth) - wrapWidth / 2 + randomWidth - 8;

    const centerPos =
      winLotteryIndex * (boxWidth + gapWidth) -
      wrapWidth / 2 +
      boxWidth / 2 -
      8;

    moveApi.start({
      from: { x: 0 },
      to: { x: -moveX },
      config: { duration: duration, easing: easings.easeOutCubic },
      onChange: (props) => {
        const currentMoveX = props.value.x;
        const distanceDelta = currentMoveX - prevMoveRef.current;
        const speed = Math.abs(distanceDelta);
        //当移动距离超过一个box的宽度时，播放音效
        if (speed > boxWidth - 1) {
          prevMoveRef.current = currentMoveX;
          if (lotteryIndex === 0) {
            playSpinAudio();
          }
        }
      },
      onResolve: () => {
        animateEndX(moveX, centerPos);
      },
    });
  };

  useEffect(() => {
    initList();
    resetStyle();
  }, [giftList]);

  useEffect(() => {
    resetStyle();
  }, [lotteryWin]);

  useEffect(() => {
    if (!start || !lotteryWin) return;
    initWinItem(lotteryWin);

    sleep(500 * lotteryIndex).then(() => {
      if (vertical) {
        goMoveY();
      } else {
        goMoveX();
      }
    });
  }, [start, lotteryWin]);

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        height: wrapHeight,
      }}
      ref={wrapRef}
    >
      <animated.div
        style={{
          ...moveSprings,
        }}
        className={`flex items-center will-change-transform gap-2 w-full h-full ${
          vertical ? 'flex-col' : 'flex-row'
        }`}
      >
        {list.map((item: any, index: number) => {
          const isWin = item?.id === lotteryWin?.id;
          const grade = item?.grade ?? item?.giftGrade;
          const name = parseName(item?.giftName);

          return (
            <animated.div
              className={`lottery-card lottery-card-${grade} ${
                showLogo ? 'lottery-card-logo' : 'lottery-card-bg'
              }`}
              key={index}
              style={{
                width: boxSize.width,
                height: boxSize.height,
                ...(isWin ? {} : opacitySprings),
              }}
            >
              <animated.img
                style={{
                  ...(isWin ? scaleSprings : opacitySprings),
                }}
                src={item?.giftImage}
                className={`mx-auto object-contain h-full w-2/3`}
              />
              {showLogo && (
                <animated.div
                  style={{
                    ...(isWin ? {} : opacitySprings),
                  }}
                  className={`card-logo`}
                />
              )}
              {showName && (
                <div className="absolute bottom-0 left-0 -mb-1 w-full px-1 py-2 sm:px-2 font-semibold uppercase leading-tight md:p-3">
                  <div className="text-xs md:text-sm text-center">
                    <div className="text-white text-opacity-50">{name[0]}</div>
                    <div className="text-white truncate">
                      {name[1] && (
                        <span className="text-white/50">({name[1]})</span>
                      )}
                      {name[2]}
                    </div>
                  </div>
                </div>
              )}
            </animated.div>
          );
        })}
      </animated.div>
    </div>
  );
};

export default Lottery;
