import { IconFont } from '@/components/icons';
import { exchangeQuantityUsingPOST } from '@/services/front/kaixiangxiangguan';
import { isSafari, numberFixed, parseName } from '@/utils';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import { Button, Modal } from 'react-daisyui';
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

  const audio = useMemo(
    () => new Audio(require('@/assets/audio/item.wav')),
    [],
  );

  const [openResults, setOpenResults] = useState<
    API.OpenBoxResultVo[] & API.UpgradeResultVo
  >([]);

  const countTotalPrice = (
    results: API.OpenBoxResultVo[] & API.UpgradeResultVo,
  ) => {
    const total = results?.reduce((total: number, item: any) => {
      return Number(total) + Number(item.recoveryPrice);
    }, 0);
    setTotalPrice(numberFixed(total, 2));
  };

  const putResults = async () => {
    //间隔500ms将results中的数据放入openResults中
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      await new Promise((resolve) => {
        setTimeout(() => {
          setOpenResults((prev) => {
            const ret = [...prev, item];
            countTotalPrice(ret);
            return ret;
          });

          if (voice && !isSafari()) {
            audio.currentTime = 0;
            audio.play();
          }
          resolve(null);
        }, 1000);
      });
    }
  };

  useEffect(() => {
    if (show) {
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
    if (results.length !== openResults.length) {
      return;
    }
    if (saleLoading) return;
    setSaleLoading(true);
    const ids = results?.map((item: any) => item.voucherId);
    const ret = await exchangeQuantityUsingPOST({ ids: ids.join(',') });
    setSaleLoading(false);
    if (ret.status === 0) {
      if (voice) {
        const audio = new Audio(require('@/assets/audio/exchange.mp3'));
        audio.play();
      }
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4 justify-center min-h-[200px]">
          {openResults?.map((item, i: number) => (
            <div
              className="flex flex-col gap-1 w-[130px] sm:w-[180px] animate__animated animate__flipInX relative items-center justify-center"
              key={i}
            >
              <div
                className={`absolute left-[15px] top-0 w-[100px] sm:w-[150px] h-[111px] sm:h-[166px] weapon-bg grade-${item.grade}`}
              ></div>
              <div
                className={`grade-bg grade-${item.grade}-bg ${
                  item.grade === 0 || item.grade === 1
                    ? 'animate-spin-slow'
                    : ''
                }`}
              />
              <img
                src={item.giftImage}
                className="z-10 w-full h-[98px] sm:h-[135px]"
              />
              <div className="w-full flex flex-col px-[15px] z-20 gap-2">
                <div className="text-sm flex gap-1 font-num text-green">
                  ${item.recoveryPrice}
                </div>
                <div className="text-xs flex flex-col">
                  <div className='text-white/50'>{item.giftName && parseName(item.giftName)?.[0]}</div>
                  <div className='truncate'>
                    {item.giftName && parseName(item.giftName)?.[1] && (
                      <span className="text-white/50">
                        ({item.giftName && parseName(item.giftName)?.[1]})
                      </span>
                    )}
                    {item.giftName && parseName(item.giftName)?.[2]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {results.length === openResults.length && (
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-4 w-full sm:px-5 mt-6">
            <button onClick={onClose} className="btn-purple" type="button">
              <FormattedMessage id="open_box_receive" />
            </button>

            <Button
              className="btn-green"
              onClick={onSale}
              loading={saleLoading}
            >
              <FormattedMessage id="open_box_sell_all" />
              <IconFont type="icon-coin" />
              <CountUp
                end={totalPrice}
                duration={0.3}
                decimals={2}
                separator=""
              />
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
