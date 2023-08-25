import { numberFixed } from '@/utils';
import { history } from '@umijs/max';
import { useInViewport } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import { IconFont } from '../icons';
import './index.less';

export default React.memo(function BoxCard({ data }: { data: API.BoxPageVo }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const ref2 = useRef<HTMLVideoElement>(null);
  const [inViewport, ratio] = useInViewport(wrapperRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });
  const [show, setShow] = React.useState(false);

  const playVideo2 = async () => {
    await (ref2.current as HTMLVideoElement)?.play();
  };

  const playVideo1 = async () => {
    await (ref.current as HTMLVideoElement)?.play();
    if (ref.current) {
      ref.current.onended = () => {
        setShow(true);
        // playVideo2();
      };
    }
  };

  useEffect(() => {
    if (inViewport && ratio && ratio > 0.8) {
      if (!show) {
        playVideo1();
      } else {
        // playVideo2();
      }
    } else {
      ref2?.current?.pause();
    }
  }, [inViewport, ratio]);

  return (
    <div className="box-card relative" ref={wrapperRef}>
      <div className="box-infobg-dark">
        <LazyLoad height={200} className="img-wrapper w-full">
          <img src={data?.weaponImage} className="w-full h-full min-h-[100px]" />
          <video
            className={`w-full h-full absolute left-0 top-0 ${
              !show ? 'block' : 'hidden'
            }`}
            ref={ref}
            muted={true}
            preload="auto"
            playsInline={true}
            webkit-playsinline="true"
            x5-playsinline="true"
            controls={false}
            src={data.video}
          />
          <video
            className={`w-full h-full absolute left-0 top-0 ${
              show ? 'block' : 'hidden'
            }`}
            ref={ref2}
            muted={true}
            playsInline={true}
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            controls={false}
            src={data.secondVideo}
            onMouseEnter={playVideo2}
            onClick={(e) => {
              e.preventDefault();
              playVideo2();
            }}
          />
        </LazyLoad>
        <div className="px-4 pb-4 text-sm uppercase font-semibold truncate text-center">
          {data.boxName}
        </div>
        <div
          className="flex justify-center -mt-2 cursor-pointer"
          onClick={() => {
            history.push(`/case/${data.id}`);
          }}
        >
          <div className="box-btn min-w-[50%] z-[1] text-base-100 relative top-2 px-1">
            <IconFont type="icon-coin" className="text-base" />
            <span className="text-sm font-num">
              {numberFixed(data?.openPrice || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
