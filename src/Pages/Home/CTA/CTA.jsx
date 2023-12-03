import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <div className="mt-20" >
            <div className="lg:flex items-center justify-center gap-6">
                <div className="px-4">
                    <h2 className="text-center text-3xl font-bold text-[#001F3F] ">Discover Your New Best Friend:
                        <br /> Explore Our Pet <span className="text-red-800">Adoption Center Today</span> </h2>
                        <p className="text-center  text-[#333333] mt-8">Find Your Furry Friend Today! Explore Our Adorable Pets Ready for Adoption.
                        <br />
                         Click Now to Bring Joy and Unconditional Love into Your Home.
                         <br /> Adopt, Don't Shop! Your Perfect Companion Awaits. Start Your Journey to Pet Parenthood.</p>
                         <div className="w-full flex items-center justify-center mt-8">
                            <button className="px-4 py-3 bg-slate-400 rounded-lg text-white"><Link to='/petlisting'>Adopt Now</Link></button>
                             
                         </div>

                </div>
                <div>
                    <img src="https://i.ibb.co/rpMbN4Y/d6251277-f080-4e7f-931d-b3657c3f28a4.jpg" alt="" className="h-80 object-cover"  />

                </div>
            </div>
            
        </div>
    );
};

export default CTA;