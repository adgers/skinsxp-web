import { getBannerListUsingGET } from '@/services/common/tongyongxiangguan';
import { useRequest } from '@umijs/max';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner() {
  const { data } = useRequest(() => getBannerListUsingGET({ topN: 10 }));

  return (
    <div className='my-4 h-[150px] sm:h-[330px]'>
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
            <SwiperSlide key={i}>
              <img
                src={t.image}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
