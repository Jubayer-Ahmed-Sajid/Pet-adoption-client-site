import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="relative mb-20">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
         <div>
         <div className="absolute left-8 lg:w-auto w-1/2 top-24 lg:left-24 text-center lg:top-32  ">
            <h2 className="text-2xl lg:text-4xl font-bold lg:mb-4 mb-2 text-white lg:block "> Add a New Pet To Your Family  <br /> <span className="text-red-400 pt-4">...A Pet</span> </h2>
            <p className="hidden lg:block text-xl font-semibold text-white "> Find joy, adopt a furry friend  today! <br /> Explore  our  loving pets waiting for <br /> their forever homes. Adopt, don't shop!</p>
            <div className="w-full flex  justify-center">
            <button className=" lg:block lg:mt-6 mt-3 lg:py-2 p-2 lg:px-3 rounded-lg bg-slate-400  lg:text-xl font-semibold "><Link to='/petlisting '>Adopt Now</Link></button>
            </div>
          </div>
          <img className="w-full lg:h-[80vh] min-h-[50vh] lg:max-h-[500px]  object-cover" src="https://i.ibb.co/kqK4b72/wepik-export-20231203105027z-BHe.jpg

" alt="" />
         </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="absolute left-8 lg:w-auto w-1/2 top-24 lg:left-24 text-center lg:top-32  ">
            <h2 className="text-2xl lg:text-4xl font-bold lg:mb-4 mb-2 text-white lg:block"> Add a New Pet To Your Family  <br /> <span className="text-red-400 pt-4">...A Pet</span> </h2>
            <p className="hidden lg:block text-xl font-semibold text-white "> Find joy, adopt a furry friend  today! <br /> Explore  our  loving pets waiting for <br /> their forever homes. Adopt, don't shop!</p>
            <div className="w-full flex  justify-center">
              <button className="lg:block lg:mt-6 mt-3 lg:py-2 p-2 lg:px-3 rounded-lg bg-slate-400  lg:text-xl font-semibold "><Link to='/petlisting'>Adopt Now</Link></button>
            </div>
          </div>
          <img className="w-full lg:h-[80vh] min-h-[50vh] max-h-[500px] object-cover" src="https://i.ibb.co/MB6NjfP/wepik-export-20231203105207-Yd-RP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="absolute left-8 lg:w-auto w-1/2 top-24 lg:left-24 text-center lg:top-32  ">
            <h2 className=" text-2xl   lg:text-4xl font-bold lg:mb-4 mb-2 text-white lg:block">Make a Difference: <span className="text-red-400 pt-4">With Your Generous Donation!</span> </h2>
            <p className="hidden lg:block text-xl font-semibold text-white "> Empower change with your generosity. Every <br /> donation fuels our mission, creating a brighter future. <br /> Join us in making a difference!!!</p>
            <div className="w-full flex  justify-center">
            <button className="lg:block lg:mt-6 mt-3 lg:py-2 p-2 lg:px-3 rounded-lg bg-slate-400  lg:text-xl font-semibold "><Link to='/donationCampaign'>Donate Now</Link></button>
            </div>
          </div>
          <img className="w-full lg:h-[80vh] min-h-[50vh] max-h-[500px] object-cover" src="https://i.ibb.co/sVgj3XD/wepik-export-20231203104401-Ln-IK.jpg" alt="" />
        </SwiperSlide>


      </Swiper>
    </div>
  );
};

export default Banner;