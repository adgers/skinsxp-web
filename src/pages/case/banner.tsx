import { FormattedMessage, history, useIntl } from '@umijs/max';

import { useCountDown } from 'ahooks';
import { Countdown } from 'react-daisyui';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  const intl = useIntl();
  const [countdown, formattedRes] = useCountDown({ leftTime: 14888552 });
  const { days, hours, minutes, seconds } = formattedRes;

  // const { data, loading } = useRequest(
  //   () => getBannerListUsingGET({ topN: 10 }),
  //   {
  //     cacheKey: 'bannerList',
  //   },
  // );

  return (
    <div className="p-2 sm:p-4 flex items-center w-full justify-center">
      {/* {data && data?.length > 0 && ( */}
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full rounded h-[125px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] xxl:h-[400px] flex items-center z-0"
      >
        {/* {data?.map((t, i) => ( */}
        <SwiperSlide
          key={0}
          className="h-[125px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] xxl:h-[400px] relative"
          onClick={() => {
            history.push('/event');
          }}
        >
          <img
            src={require('@/assets/halloween-banner.png')}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
            <div className="w-fit m-auto flex gap-2">
              {days > 0 && (
                <div className="flex w-[60px] h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                  <Countdown
                    value={days}
                    className="days-value text-xs font-semibold tabular-nums leading-none text-white"
                  />
                  <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                    <FormattedMessage id="text_time_days" />
                  </span>
                </div>
              )}
              <div className="flex w-[60px] h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                <Countdown
                  value={hours}
                  className="days-value text-xs font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_hour" />
                </span>
              </div>
              <div className="flex w-[60px] h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                <Countdown
                  value={minutes}
                  className="days-value text-xs font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_min" />
                </span>
              </div>

              <div className="flex w-[60px] h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                <Countdown
                  value={seconds}
                  className="days-value text-xs font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_sec" />
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* ))} */}
      </Swiper>
      {/* )} */}
    </div>
  );
}
