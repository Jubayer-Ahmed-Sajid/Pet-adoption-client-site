import Title from "../../../Components/Title/Title";

const About = () => {
    return (
        <div className="mb-20">
           <Title title={'About us'} />
         
            <div className="lg:flex gap-6 mt-12 w-full items-center lg:justify-between p-8 lg:mx-0 mx-6 justify-center ">
                <div className="lg:w-1/2  rounded-lg bg-white px-4 py-5 lg:py-12 w-full">
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#001F3F] ">About Pet Adoption</h2>
                    <h3 className="text-2xl font-semibold my-3 lg:my-6">
                        Our Mission:
                    </h3>

                        <p className="text-[#333333] ">At the heart of our mission is the commitment to facilitate pet adoptions and support meaningful causes through donation campaigns. We aim to build a platform where pet owners can easily list their pets for adoption, and caring individuals can open their hearts and homes to these adorable companions. Additionally, we provide a space for users to create and contribute to donation campaigns.</p>
                
                </div>
                <div className="lg:w-1/2 flex justify-end w-full" >
                    <img src="https://i.ibb.co/Rj12yXG/wepik-export-20231203152208d-D5-Q.jpg"  className="object-cover mr-12  w-full h-[340px] shadow-lg rounded-lg" />
                </div>
            </div>
            
        </div>
    );
};

export default About;