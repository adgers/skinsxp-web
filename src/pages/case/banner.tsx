import { getBannerListUsingGET } from '@/services/common/tongyongxiangguan';
import { LoadingOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Spin } from 'antd';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
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
          className="w-full h-full flex items-center"
        >
          {data?.map((t, i) => (
            <SwiperSlide key={i} className='h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] xxl:h-[400px]'>
              <img src={t.image} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Spin>
  );
}
