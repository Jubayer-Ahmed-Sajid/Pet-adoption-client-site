import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="relative my-20">
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
          <div className="absolute lg:left-24 text-center lg:top-32  ">
            <h2 className=" text-4xl font-bold mb-4 text-white hidden lg:block "> Add a New Pet To Your Family  <br /> <span className="text-red-400 pt-4">...A Pet</span> </h2>
            <p className="hidden lg:block text-xl font-semibold text-white "> Find joy, adopt a furry friend  today! <br /> Explore  our  loving pets waiting for <br /> their forever homes. Adopt, don't shop!</p>
            <button className="hidden lg:block mt-6 py-2 px-3 rounded-lg bg-slate-400 text-xl font-semibold "><Link to='/petlisting '>Adopt Now</Link></button>
          </div>
          <img className="w-full lg:h-[80vh] lg:object-cover" src="https://i.ibb.co/kqK4b72/wepik-export-20231203105027z-BHe.jpg

" alt="" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="absolute lg:left-24 text-center lg:top-32  ">
            <h2 className=" text-4xl font-bold mb-4 text-white hidden lg:block"> Add a New Pet To Your Family  <br /> <span className="text-red-400 pt-4">...A Pet</span> </h2>
            <p className="hidden lg:block text-xl font-semibold text-white "> Find joy, adopt a furry friend  today! <br /> Explore  our  loving pets waiting for <br /> their forever homes. Adopt, don't shop!</p>
            <button className="hidden lg:block mt-6 py-2 px-3 rounded-lg bg-slate-400 text-xl font-semibold "><Link to='/petlisting'>Adopt Now</Link></button>
          </div>
          <img className="w-full h-[80vh] object-cover" src="https://i.ibb.co/MB6NjfP/wepik-export-20231203105207-Yd-RP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="absolute lg:left-24 text-center lg:top-32  ">
            <h2 className=" text-4xl font-bold mb-4 text-white hidden lg:block">Make a Difference: Support us<br /> <span className="text-red-400 pt-4">Cause with Your Generous Donation!</span> </h2>
            <p className="hidden lg:block text-xl font-semibold text-white "> Empower change with your generosity. Every <br /> donation fuels our mission, creating a brighter future. <br /> Join us in making a difference!!!</p>
            <button className="hidden lg:flex justify-center mt-6 py-2 px-3 rounded-lg bg-slate-400 text-xl font-semibold "><Link to='/donationCampaign'>Donate Now</Link></button>
          </div>
          <img className="w-full h-[80vh] object-cover" src="https://i.ibb.co/sVgj3XD/wepik-export-20231203104401-Ln-IK.jpg" alt="" />
        </SwiperSlide>


      </Swiper>
    </div>
  );
};

export default Banner;