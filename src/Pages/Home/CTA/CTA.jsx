import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <div className="mt-20" >
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-6">
                <div className="px-4 w-full lg:w-1/2">
                    <h2 className="text-center text-xl lg:text-3xl font-bold text-[#001F3F] ">Discover Your New Best Friend:
                         Explore Our Pet <span className="text-red-800">Adoption Center Today</span> </h2>
                        <p className="text-center w-full  mx-auto  text-[#333333] mt-4 lg:mt-8">Find Your Furry Friend Today! Explore Our Adorable Pets Ready for Adoption.
                     
                         Click Now to Bring Joy and Unconditional Love into Your Home.
                         Adopt, Don't Shop! Your Perfect Companion Awaits. Start Your Journey to Pet Parenthood.</p>
                         <div className="w-full flex items-center justify-center mt-8">
                            <button className="lg:px-4 p-2 lg:py-3 bg-slate-400 rounded-lg text-white"><Link to='/petlisting'>Adopt Now</Link></button>
                             
                         </div>

                </div>
                <div className="lg:w-1/2 w-full">
                    <img src="https://i.ibb.co/rpMbN4Y/d6251277-f080-4e7f-931d-b3657c3f28a4.jpg" alt="" className="lg:h-80 max-h-[300px] mx-auto object-cover"  />

                </div>
            </div>
            
        </div>
    );
};

export default CTA;