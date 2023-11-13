import { history, useIntl, useLocation } from '@umijs/max';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  const location = useLocation();

  const intl = useIntl();
  // const { data, loading } = useRequest(
  //   () => getBannerListUsingGET({ topN: 10 }),
  //   {
  //     cacheKey: 'bannerList',
  //   },
  // );

  return (
    <div className="flex items-center w-full justify-center mt-4">
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
        className="w-full rounded h-[125px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] xxl:h-[400px] flex items-center"
      >
        {/* {data?.map((t, i) => ( */}
        <SwiperSlide
          key={0}
          className="h-[125px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] xxl:h-[400px] relative"
          onClick={() => {
            history.push({
              pathname: '/deposit',
              search: location.search,
            });
            window?.fbq(
              'trackSingleCustom',
              '1024868335308144',
              'InitiateCheckout',
            );
            window?.gtag('event', 'conversion', {
              send_to: 'AW-11345409756/EOFKCIqQy-UYENzt9KEq',
            });
          }}
        >
          <img
            src={require('@/assets/banner-bg.png')}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col  items-center z-30">
            {/* <div className="w-fit mt-[64px] md:mt-[140px] mx-auto flex gap-2">
              {days > 0 && (
                <div className="flex w-[60px] md:w-[80px] h-[36px] md:h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                  <Countdown
                    value={days}
                    className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                  />
                  <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                    <FormattedMessage id="text_time_days" />
                  </span>
                </div>
              )}
              <div className="flex w-[60px] md:w-[80px] h-[36px] md:h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                <Countdown
                  value={hours}
                  className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_hour" />
                </span>
              </div>
              <div className="flex w-[60px] md:w-[80px] h-[36px] md:h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                <Countdown
                  value={minutes}
                  className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_min" />
                </span>
              </div>

              <div className="flex w-[60px] md:w-[80px] h-[36px] md:h-[50px] flex-shrink-0 flex-col items-center justify-center text-center bg-black/70 rounded">
                <Countdown
                  value={seconds}
                  className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_sec" />
                </span>
              </div>
            </div>
            {location.pathname === '/case' && (
              <div
                className="btn btn-purple !h-[32px] md:!h-12 min-h-0 mt-3 md:mt-8 !px-8"
                onClick={() => {
                  history.push('/event');
                }}
              >
                <FormattedMessage id="go_event"/>
              </div>
            )} */}
            <div className="sm:text-[32px] text-center uppercase font-num font-semibold mt-5">
              {intl.formatMessage({ id: 'banner_first_recharge' })} &
            </div>
            <div className="sm:text-[32px] sm:mb-6 text-center uppercase font-num font-semibold">
              {intl.formatMessage({ id: 'banner_promo' })}
            </div>
            <div
              className="text-primary text-xl mt-2 sm:mt-0 sm:h-[60px] sm:leading-none sm:text-[50px] font-num uppercase font-semibold"
              style={{
                backgroundImage:
                  'linear-gradient(270deg, #0BFF59 0.04%, #B4FC3B 99.77%)',
                WebkitBackgroundClip: 'text',
                overflow: 'visible',
                color: 'transparent',
              }}
            >
              {intl.formatMessage({ id: 'banner_bonus' })}
            </div>
          </div>
        </SwiperSlide>
        {/* ))} */}
      </Swiper>
      {/* )} */}
    </div>
  );
}
