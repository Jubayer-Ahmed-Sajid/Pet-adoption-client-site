import { FaCat, FaDog, FaFish, FaKiwiBird, FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";

const Categories = () => {
    return (
        <div>
            <h2 className=" text-3xl text-center font-bold text my-8">Categories</h2>
         <div className="grid mx-12 lg:grid-cols-4 text-center gap-4 lg:mx-4 my-2 lg:text-center">
         <Link to='categoryPets/cat' className="shadow-lg rounded-md  px-6 py-8">
                <div className="text-[#6504b5] flex justify-center mx-auto text-8xl text lg:w-20 mb-4">
                <FaCat></FaCat>
                </div>
                <h2 className="text-2xl font-bold ">Cat</h2>
            </Link>
         <Link to='categoryPets/dog' className="shadow-lg rounded-md py-4 px-6 py-8 ">
                <div className="text-[#6504b5] text-8xl flex justify-center lg:w-20 mb-4 mx-auto ">
                <FaDog></FaDog>
                </div>
                <h2 className="text-2xl font-bold ">Dog</h2>
            </Link>
         <Link to='categoryPets/fish' className="shadow-lg rounded-md px-6 py-8 ">
                <div className="text-[#6504b5] flex justify-center text-8xl text lg:w-20 mb-4 mx-auto ">
                <FaFish></FaFish>
                </div>
                <h2 className="text-2xl font-bold ">Fish</h2>
            </Link>
         <Link to='categoryPets/bird' className="shadow-lg rounded-md px-6 py-8 text">
                <div className="text-[#6504b5] flex justify-center text-8xl  lg:w-20 mb-4 mx-auto ">
                <FaKiwiBird></FaKiwiBird>
                </div>
                <h2 className="text-2xl font-bold ">Bird</h2>
            </Link>
         </div>
        </div>
    );
};

export default Categories;