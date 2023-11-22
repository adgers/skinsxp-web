import { FormattedMessage,history,useIntl, useLocation } from '@umijs/max';
import { useCountDown } from 'ahooks';
import { Countdown } from 'react-daisyui';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  const [countdown, formattedRes] = useCountDown({ targetDate: 1701359999000 });
  const { days, hours, minutes, seconds } = formattedRes;
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
        className="w-full rounded h-[210px]  md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] flex items-center !z-0"
      >
        {/* {data?.map((t, i) => ( */}
        <SwiperSlide
          key={0}
          className="h-[210px]  md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] relative"
          onClick={() => {
            history.push('/event');
          }}
        >
          <img
            src={require('@/assets/banner-event.png')}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col  items-center z-30">
            <div className="w-fit mt-[72px] md:mt-[140px] mx-auto flex gap-2">
              {days > 0 && (
                <div className="flex w-[60px] md:w-[66px] h-[36px] md:h-[80px] flex-shrink-0 flex-col items-center justify-center text-center bg-[#4B557A]/60 rounded">
                  <Countdown
                    value={days}
                    className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                  />
                  <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                    <FormattedMessage id="text_time_days" />
                  </span>
                </div>
              )}
              <div className="flex w-[60px] md:w-[66px] h-[36px] md:h-[80px] flex-shrink-0 flex-col items-center justify-center text-center bg-[#4B557A]/60 rounded">
                <Countdown
                  value={hours}
                  className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_hour" />
                </span>
              </div>
              <div className="flex w-[60px] md:w-[66px] h-[36px] md:h-[80px] flex-shrink-0 flex-col items-center justify-center text-center bg-[#4B557A]/60 rounded">
                <Countdown
                  value={minutes}
                  className="days-value text-sm md:text-lg font-semibold tabular-nums leading-none text-white"
                />
                <span className="transform scale-75 font-medium leading-none text-white text-opacity-70">
                  <FormattedMessage id="text_time_min" />
                </span>
              </div>

              <div className="flex w-[60px] md:w-[66px] h-[36px] md:h-[80px] flex-shrink-0 flex-col items-center justify-center text-center bg-[#4B557A]/60 rounded">
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
                className="btn btn-red !h-[32px] md:!h-12 min-h-0 mt-3 md:mt-8 !px-8"
                onClick={() => {
                  history.push('/event');
                }}
              >
                <FormattedMessage id="go_event" />
              </div>
            )}
          </div>
        </SwiperSlide>
        {/* ))} */}
        {/* <SwiperSlide
          key={0}
          className="h-[150px]  md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] relative"
          onClick={() => {
            window.open('https://discord.gg/ucDMTAbAcS');
          }}
        >
          <img
            src={require('@/assets/banner-discord.png')}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center z-30">
            <div
              className="text-[16px] md:text-[50px] text-center uppercase font-num font-semibold mt-5 md:mt-10 w-[160px] md:w-[800px] whitespace-pre-wrap"
              style={{ fontFamily: 'Bebas' }}
            >
              {intl.formatMessage({ id: 'banner_discord_text' })}
            </div>
            <div className="w-[120px] h-[36px] md:w-[310px] md:h-[95px] bg-[url('@/assets/banner-discord-btn.png')] bg-no-repeat bg-cover mt-2 lg:mt-[60px] text-xs md:text-xl  md:py-10 flex items-center justify-center cursor-pointer">
              <span className="pl-8">
                {intl.formatMessage({ id: 'banner_discord_btn' })}
              </span>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
      {/* )} */}
    </div>
  );
}
