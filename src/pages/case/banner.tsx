import { useIntl, useLocation } from '@umijs/max';

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
        className="w-full rounded h-[210px]  md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] flex items-center !z-0"
      >
        {/* {data?.map((t, i) => ( */}
        {/* <SwiperSlide
          key={0}
          className="h-[210px]  md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] relative"
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
            src={require('@/assets/banner.png')}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col  items-center z-30">
            <div className="sm:text-[32px] text-center uppercase font-num font-semibold mt-10">
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
        </SwiperSlide> */}
        {/* ))} */}
        <SwiperSlide
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
        </SwiperSlide>
      </Swiper>
      {/* )} */}
    </div>
  );
}
