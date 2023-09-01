import { getBannerListUsingGET } from '@/services/common/tongyongxiangguan';
import { useRequest } from '@umijs/max';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  const { data } = useRequest(() => getBannerListUsingGET({ topN: 10 }));

  return (
    <div className='my-4 sm:my-6'>
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
          className="w-full flex items-center"
        >
          {data?.map((t, i) => (
            <SwiperSlide key={i}>
              <img
                src={t.image}
                className="w-full h-[180px] object-cover md:object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
