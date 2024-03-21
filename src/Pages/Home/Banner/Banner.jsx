import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
import banner1 from '../../../assets/bannerImage/banner-1.jpg'
import banner2 from '../../../assets/bannerImage/banner-2.jpg'
import banner3 from '../../../assets/bannerImage/banner-3.jpg'
const Banner = () => {
  return (
    <div className="relative my-16">
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
        modules={[Pagination,Autoplay, Navigation]}
        className="mySwiper"
      >

        {/* slider one */}

        <SwiperSlide className="relative">
          <div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

          
            <div className="absolute left-12 w-1/2 xxs:top-8 top-16 lg:left-24  lg:top-40">
              <h2 className="text-xl  xxs:text-sm xxs:mb-1 lg:text-4xl font-bold lg:mb-4 mb-2 text-white lg:block">Discover the Joy of Pet Adoption and <span className="text-secondary">Change Lives Forever!</span> </h2>

              <p className="hidden lg:block text-xl font-semibold text-white">Find joy, adopt a furry friend today!<br />Explore our loving pets waiting for<br />their forever homes. Adopt, don't shop!</p>
              <button className="lg:block lg:mt-6 mt-3 lg:py-2 p-2 lg:px-3 rounded-lg xxs:text-sm bg-secondary text-white lg:text-xl font-medium"><Link to='/petlisting'>Adopt Now</Link></button>
            </div>

            {/* Image */}
            <img src={banner1} alt="" />
          </div>
        </SwiperSlide>

        {/* slider two */}

        <SwiperSlide className="relative">
          <div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute xxs:top-8 left-12 w-1/2 top-16 lg:left-24  lg:top-40">

              <h2 className=" lg:text-4xl xxs:text-sm xxs:mb-1 font-bold lg:mb-4 mb-2 text-white lg:block"> Welcome a Furry Friend into Your <span className="text-secondary">Family with Adoption! </span> </h2>
              <p className="hidden lg:block text-xl font-semibold text-white "> Find joy, adopt a furry friend  today! <br /> Explore  our  loving pets waiting for <br /> their forever homes. Adopt, don't shop!</p>

              <button className="lg:block lg:mt-6 mt-3 lg:py-2 p-2 lg:px-3 rounded-lg  xxs:text-sm bg-secondary text-white  lg:text-xl font-medium "><Link to='/petlisting'>Adopt Now</Link></button>
            </div>
            <div>

              <img src={banner2} alt="" />
            </div>
          </div>
        </SwiperSlide>

        {/* slider three */}

        <SwiperSlide className="relative">
          <div>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute xxs:top-8 left-12 w-1/2 top-16 lg:left-24  lg:top-40">

              <h2 className=" lg:text-4xl xxs:text-sm font-bold lg:mb-4 mb-2 xxs:mb-1 text-white lg:block">Make a Difference With Your <br /><span className="text-secondary"> Generous Donation!</span>  </h2>

              <p className="hidden lg:block text-xl font-semibold text-white "> Empower change with your generosity. Every <br /> donation fuels our mission, creating a brighter future. <br /> Join us in making a difference!!!</p>


              <button className="lg:block lg:mt-6 mt-3 lg:py-2 p-2 lg:px-3 rounded-lg  xxs:text-sm bg-secondary text-white  lg:text-xl font-medium "><Link to='/donationCampaign'>Donate Now</Link></button>


            </div>

            <img className="w-full" src={banner3} alt="" />
          </div>



        </SwiperSlide>


      </Swiper>
    </div>
  );
};

export default Banner;