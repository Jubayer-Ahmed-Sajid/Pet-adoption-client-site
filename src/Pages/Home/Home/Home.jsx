import About from "../About/About";
import Banner from "../Banner/Banner";
import CommunityMarquee from "../CommunityMarquee/CommunityMarquee";
import CallToSignUp from "../CallToSignUp/CallToSignUp";
import Categories from "../Categories/Categories";
import ContactUs from "../ContactUs/ContactUs";
import Featured from "../FeaturedPet/Featured";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div className="space-y-4">
      <Banner />
      <CommunityMarquee />
      <Categories />
      <Services />
      <About />
      <Featured />
      <CallToSignUp />
      <ContactUs />
    </div>
  );
};

export default Home;
