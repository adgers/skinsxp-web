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
            }}
          >
            <img
              src={require('@/assets/banner-bg.png')}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
              <div className="text-lg sm:text-[40px] sm:mb-4 text-center">
                {
                  intl
                    .formatMessage({ id: 'banner_first_recharge' })
                    ?.split('\\n')[0]
                }
              </div>
              <div className="text-primary text-xl sm:text-[50px] font-semibold">
                {
                  intl
                    .formatMessage({ id: 'banner_first_recharge' })
                    ?.split('\\n')[1]
                }
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            key={1}
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
            }}
          >
            <img
              src={require('@/assets/banner-bg.png')}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30">
              <div className="text-lg sm:text-[40px] sm:mb-4 text-center">
                {intl.formatMessage({ id: 'banner_promo' })?.split('\\n')[0]}
              </div>
              <div className="text-primary text-xl sm:text-[50px] font-semibold">
                {intl.formatMessage({ id: 'banner_promo' })?.split('\\n')[1]}
              </div>
            </div>
          </SwiperSlide>
          {/* ))} */}
        </Swiper>
      )}
    </Spin>
  );
}
