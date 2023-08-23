import spinVideo from '@/assets/audio/spin.mp3';
import { sleep } from '@/utils';
import { animated, easings, useSpring } from '@react-spring/web';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  voice = true,
  lotteryIndex = 0,
}: {
  giftList: API.BoxGiftListVo[];
  lotteryWin: API.BattleBoxGainVo;
  onCompleted: (index: number) => void;
  vertical?: boolean;
  start: boolean;
  randomPosition?: boolean;
  boxSize: { width: number; height: number };
  wrapHeight?: number;
  lotteryIndex?: number;
  fast?: boolean;
  voice?: boolean;
}) => {
  const baseNum = 40;
  const winLotteryIndex = 30;
  const duration = fast ? 100 * winLotteryIndex : 250 * winLotteryIndex;
  const [list, setList] = useState<API.BoxGiftListVo[]>([]);

  const prevMoveRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLVideoElement>(null);

  const [moveSprings, moveApi] = useSpring(() => ({
    from: vertical ? { y: 0 } : { x: 0 },
  }));

  const [scaleSprings, scaleApi] = useSpring(() => ({
    from: { scale: 1 },
  }));

  const [rotateSprings, rotateApi] = useSpring(() => ({
    from: { rotate: 0 },
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
    rotateApi.start({
      from: { rotate: 0 },
    });
    opacityApi.start({
      from: { opacity: 1 },
    });
  };

  const animateEnd = () => {
    rotateApi.start({
      from: { rotate: 0 },
      to: { rotate: 360 },
      config: { duration: 500 },
    });
    opacityApi.start({
      from: { opacity: 1 },
      to: { opacity: 0.3 },
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

  const initList = () => {
    let list = [...giftList];
    //最少数量为baseNum，如果不足，随机补足
    if (list.length < baseNum) {
      for (let i = 0; i < baseNum; i++) {
        const index = Math.floor(Math.random() * giftList.length);
        list.push(giftList[index]);
      }
    }
    // 随机打乱顺序
    list.sort(() => Math.random() - 0.5);
    // 添加中奖物品到中奖位置
    list.splice(winLotteryIndex, 0, lotteryWin);
    setList(list);
  };

  const playSpinAudio = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const goMoveY = () => {
    const boxHeight = boxSize.height;
    let randomHeight;
    if (randomPosition) {
      randomHeight = Math.random() * (boxHeight - 30) + 30;
    } else {
      //选中物品的正中间位置
      randomHeight = boxHeight / 2;
    }

    const moveY = winLotteryIndex * boxHeight - wrapHeight / 2 + randomHeight;

    moveApi.start({
      from: { y: 0 },
      to: { y: -moveY },
      config: { duration: duration, easing: easings.easeOutQuint },
      onChange: (props) => {
        const currentMoveY = props.value.y;
        const distanceDelta = currentMoveY - prevMoveRef.current;
        const speed = Math.abs(distanceDelta);
        if (speed > boxHeight) {
          prevMoveRef.current = currentMoveY;
          if (voice) {
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
      randomWidth = Math.random() * (boxWidth - 30) + 30;
    } else {
      //选中物品的正中间位置
      randomWidth = boxWidth / 2;
    }

    const wrapWidth = wrapRef.current?.offsetWidth || 0;
    const moveX = winLotteryIndex * boxWidth - wrapWidth / 2 + randomWidth;

    moveApi.start({
      from: { x: 0 },
      to: { x: -moveX },
      config: { duration: duration, easing: easings.easeOutQuint },
      onChange: (props) => {
        const currentMoveX = props.value.x;
        const distanceDelta = currentMoveX - prevMoveRef.current;
        const speed = Math.abs(distanceDelta);

        //当移动距离超过一个box的宽度时，播放音效
        if (speed > boxWidth) {
          prevMoveRef.current = currentMoveX;
          if (voice) {
            playSpinAudio();
          }
        }
      },
      onResolve: () => {
        animateEnd();
      },
    });
  };

  useEffect(() => {
    if (!giftList && !lotteryWin) return;
    resetStyle();
    initList();
  }, [giftList, lotteryWin]);

  useEffect(() => {
    if (!start) return;
    sleep(500 * lotteryIndex).then(() => {
      if (vertical) {
        goMoveY();
      } else {
        goMoveX();
      }
    });
  }, [start]);

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        height: wrapHeight,
      }}
      ref={wrapRef}
    >
      <video
        src={spinVideo}
        ref={audioRef}
        controls={false}
        playsInline={true}
        webkit-playsinline="true"
        x5-playsinline="true"
        style={{
          display: 'none',
        }}
      />
      <animated.div
        style={{
          ...moveSprings,
        }}
        className={`flex items-center will-change-transform w-full h-full ${
          vertical ? 'flex-col' : 'flex-row'
        }`}
      >
        {list.map((item: any, index: number) => {
          const isWin = item.id === lotteryWin.id;
          const grade = item.grade ?? item.giftGrade;

          return (
            <div
              className="lottery-card"
              key={index}
              style={{
                width: boxSize.width,
                height: boxSize.height,
              }}
            >
              <animated.img
                style={{
                  ...(isWin ? scaleSprings : opacitySprings),
                }}
                src={item.giftImage}
                className={`sm:w-full sm:h-full z-10 will-change-transform`}
              />
              <animated.div
                style={{
                  ...(isWin ? rotateSprings : opacitySprings),
                }}
                className={`lottery-card-bg lottery-card-${grade}`}
              />
            </div>
          );
        })}
      </animated.div>
    </div>
  );
};

export default Lottery;
