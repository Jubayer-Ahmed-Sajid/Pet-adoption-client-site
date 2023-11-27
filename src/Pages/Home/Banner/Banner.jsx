import  {Swiper,SwiperSlide} from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const Banner = () => {
    return (
        <div>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
            <h2 className="absolute left-24 text-4xl  text-white top-32 ">Hello world</h2>
            <img className="w-full h-[80vh] object-cover" src="https://i.ibb.co/ck161bM/download-18.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-full h-[80vh] object-cover" src="https://i.ibb.co/ck161bM/download-18.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-full h-[80vh] object-cover" src="https://i.ibb.co/ck161bM/download-18.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-full h-[80vh] object-cover" src="https://i.ibb.co/ck161bM/download-18.jpg" alt="" />
        </SwiperSlide>
        
      </Swiper>
        </div>
    );
};

export default Banner;