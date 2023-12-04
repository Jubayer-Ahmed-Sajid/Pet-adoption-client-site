import { Link } from "react-router-dom";
const Featured = () => {
   
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-semibold text-center my-12">Help us</h2>

            <div className="lg:flex items-center bg-[#1e534e] justify-center gap-6">
                <div>
                    <h2 className="text-5xl text-[#d9f9a5] font-bold my-8">We need your help</h2>
                    <p className="text-xl font-bold text-[#d9f9a5]">Any help you give can make a huge difference and keep us saving <br /> wildlife.</p>
                    <p className="text-white font-semibold mt-8">We are truly passionate about our work, but with your help we <br /> can do even more to help British wildlife.</p>
                    <div className="flex justify-center my-8">
                        <button className="bg-[#479130] text-white px-4 py-3 rounded-lg text-xl font-semibold"><Link to='/donationCampaign'>Donate Now</Link></button>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/VxY7myc/21-3-16-Antibiotics.png" alt="" />
                </div>

            </div>


        </div>
    );
};

export default Featured;