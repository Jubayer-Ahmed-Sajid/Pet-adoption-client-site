import About from "../About/About";
import Banner from "../Banner/Banner";
import CallToSignUp from "../CallToSignUp/CallToSignUp";
import Categories from "../Categories/Categories";
import ContactUs from "../ContactUs/ContactUs";
import Featured from "../FeaturedPet/Featured";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Categories></Categories>
            <CallToSignUp></CallToSignUp>
            <Services></Services>
            <About></About>
            <Featured></Featured>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;