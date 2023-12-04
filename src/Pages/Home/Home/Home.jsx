import About from "../About/About";
import Banner from "../Banner/Banner";
import CTA from "../CTA/CTA";
import Categories from "../Categories/Categories";
import Featured from "../FeaturedPet/Featured";

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Categories></Categories>
            <CTA></CTA>
            <About></About>
            <Featured></Featured>
        </div>
    );
};

export default Home;