import { getBannerListUsingGET } from '@/services/common/tongyongxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { history, useIntl, useRequest } from '@umijs/max';
import { Spin } from 'antd';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  const intl = useIntl();
  const { data, loading } = useRequest(
    () => getBannerListUsingGET({ topN: 10 }),
    {
      cacheKey: 'bannerList',
    },
  );

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} />}
      className="my-4 h-[150px] sm:h-[460px] flex items-center w-full justify-center"
    >
      {data && data?.length > 0 && (
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
          className="w-[calc(100%-32px)] m-4 rounded h-[125px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] xxl:h-[400px] flex items-center"
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
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
              <div className="sm:text-[40px] sm:mb-10 text-center uppercase">
                {intl.formatMessage({ id: 'banner_first_recharge' })} &
              </div>
              <div className="sm:text-[40px] sm:mb-10 text-center uppercase">
                {intl.formatMessage({ id: 'banner_promo' })}
              </div>
              <div
                className="text-primary text-xl sm:h-[60px] sm:leading-none sm:text-[60px] font-semibold uppercase"
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
      )}
    </Spin>
  );
}
