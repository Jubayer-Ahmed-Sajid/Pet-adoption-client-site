import { Link } from "react-router-dom";
const Featured = () => {
   
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-semibold text-center  my-4 lg:my-12">Help us</h2>

            <div className="lg:flex items-center bg-[#1e534e] justify-center gap-6">
                <div className="mx-6">
                    <h2 className="lg:text-3xl text-xl text-[#d9f9a5] font-bold py-4 lg:py-8">We need your help</h2>
                    <p className="lg:text-xl font-semibold text-[#d9f9a5]">Any help you give can make a huge difference and keep us saving  wildlife.</p>
                    <p className="text-white font-semibold mt-4 lg:mt-8">We are truly passionate about our work, but with your help we  can do even more to help British wildlife.</p>
                    <div className="flex justify-center my-8">
                        <button className="bg-[#479130] text-white lg:px-4 lg:py-3 p-2  rounded-lg lg:text-xl font-semibold"><Link to='/donationCampaign'>Donate Now</Link></button>
                    </div>
                </div>
                <div className="mx-4">
                    <img src="https://i.ibb.co/VxY7myc/21-3-16-Antibiotics.png" alt="" />
                </div>

            </div>


        </div>
    );
};

export default Featured;