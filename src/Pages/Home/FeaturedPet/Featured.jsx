import { Link } from "react-router-dom";
import Title from "../../../Components/Title/Title";
const Featured = () => {
   
    return (
        <div className="mb-20 mx-4 text-white">
           <Title title={'Help Us'}/>


            <div className="lg:flex mt-12 p-8 items-center bg-primary justify-center gap-6">
                <div className="mx-6">
                    <h2 className="lg:text-3xl text-xl text-secondary font-bold py-4 lg:py-8">We need your help</h2>
                    <p className="lg:text-xl font-semibold]">Any help you give can make a huge difference <span className="text-secondary">and keep us saving  wildlife. </span> </p>
                    <p className=" font-semibold mt-4 lg:mt-8">We are truly passionate about our work, but with your help we  can do even more to help British wildlife.</p>
                    <div className="flex justify-center my-8">
                        <button className="bg-secondary text-white lg:px-4 lg:py-3 p-2  rounded-lg lg:text-xl font-semibold"><Link to='/donationCampaign'>Donate Now</Link></button>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/VxY7myc/21-3-16-Antibiotics.png" className="h-full w-full" alt="" />
                </div>

            </div>


        </div>
    );
};

export default Featured;