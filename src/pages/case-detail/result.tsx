import winVideo from '@/assets/audio/win.mp3';
import { IconFont } from '@/components/icons';
import { exchangeQuantityUsingPOST } from '@/services/front/kaixiangxiangguan';
import { numberFixed } from '@/utils';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useCallback, useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-toastify';
import './index.less';

export default function Result({
  show,
  results,
  onClose,
}: {
  show: boolean;
  results: API.OpenBoxResultVo[] & API.UpgradeResultVo;
  onClose: () => void;
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [saleLoading, setSaleLoading] = useState(false);
  const { voice } = useModel('sys');
  const intl = useIntl();
  const audioRef = useRef<HTMLVideoElement>(null);

  const [openResults, setOpenResults] = useState<
    API.OpenBoxResultVo[] & API.UpgradeResultVo
  >([]);

  const putResults = async () => {
    //间隔500ms将results中的数据放入openResults中
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      await new Promise((resolve) => {
        setTimeout(() => {
          setOpenResults((prev) => [...prev, item]);
          resolve(null);
        }, 500);
      });
    }
  };

  const playWinAudio = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (show) {
      if (voice) {
        playWinAudio();
      }
      setOpenResults([]);
      putResults().then(() => {
        const total = results?.reduce((total: number, item: any) => {
          return Number(total) + Number(item.recoveryPrice);
        }, 0);
        setTotalPrice(numberFixed(total, 2));
      });
    }
  }, [show]);

  const onSale = async () => {
    if (saleLoading) return;
    setSaleLoading(true);
    const ids = results?.map((item: any) => item.voucherId);
    const ret = await exchangeQuantityUsingPOST({ ids: ids.join(',') });
    setSaleLoading(false);
    if (ret.status === 0) {
      // if (voice) {
      //   audio.play();
      // }
      toast.success(
        intl.formatMessage({
          id: 'sell_success',
        }),
      );
      onClose();
    }
  };
  return (
    <Modal
      open={show}
      className="max-w-md md:max-w-2xl result-modal rounded sm:rounded-lg backdrop-blur-md"
    >
      <Button
        size="xs"
        shape="circle"
        color="ghost"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Header className="text-center">
        <div className="result-title">Congratulations</div>
      </Modal.Header>
      <Modal.Body>
        <video
          src={winVideo}
          ref={audioRef}
          controls={false}
          playsInline={true}
          webkit-playsinline="true"
          x5-playsinline="true"
          style={{
            display: 'none',
          }}
        />
        <div className="flex flex-wrap items-center gap-2 justify-center min-h-[200px]">
          {openResults?.map((item, i: number) => (
            <div
              className="flex flex-col gap-1 w-[135px] sm:w-[180px] animate__animated animate__zoomIn"
              key={i}
            >
              <div
                className={`w-[135px] sm:w-[180px] h-[135px] sm:h-[180px] flex items-center justify-center weapon-bg grade-${item.grade}`}
              >
                <div className={`grade-${item.grade}-bg animate-spin-slow`} />
                <img src={item.giftImage} className="z-10" />
              </div>
              <div className="-mt-4">
                <div className="text-sm flex gap-1 font-num text-green">
                  $ {item.recoveryPrice}
                </div>
                <div className="text-xs truncate">
                  {item.giftName}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 w-full justify-center mt-6">
          <button
            onClick={onClose}
            className="btn-purple !btn-sm"
            type="button"
          >
            <FormattedMessage id="open_box_receive" />
          </button>

          <Button
            className="btn-green !btn-sm"
            onClick={onSale}
            loading={saleLoading}
          >
            <FormattedMessage id="open_box_sell_all" />
            <IconFont type="icon-daimond" />
            <CountUp
              end={totalPrice}
              duration={0.3}
              decimals={2}
              separator=""
            />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
