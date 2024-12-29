import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";

const Main = () => {
    return (
        <div className="flex flex-col justify-end">
            <NavBar></NavBar>
            <Outlet></Outlet>
           <div>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default Main;