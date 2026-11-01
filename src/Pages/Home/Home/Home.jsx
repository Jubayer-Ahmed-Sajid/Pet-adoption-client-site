import About from "../About/About";
import Banner from "../Banner/Banner";
import CommunityMarquee from "../CommunityMarquee/CommunityMarquee";
import CallToSignUp from "../CallToSignUp/CallToSignUp";
import Categories from "../Categories/Categories";
import ContactUs from "../ContactUs/ContactUs";
import Featured from "../FeaturedPet/Featured";
import Services from "../Services/Services";
import RescueTrajectoryGraphic from "../../../Components/RescueTrajectoryGraphic";
import MotionReveal from "../../../Components/MotionReveal";

const Home = () => {
  return (
    <div className="space-y-4">
      <Banner />
      <CommunityMarquee />
      <Categories />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal direction="up" distance={24}>
          <RescueTrajectoryGraphic />
        </MotionReveal>
      </div>
      <Services />
      <About />
      <Featured />
      <CallToSignUp />
      <ContactUs />
    </div>
  );
};

export default Home;
