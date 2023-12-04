
const About = () => {
    return (
        <div>
            <h2 className="text-4xl text-center mt-20 mb-8 ">About Us</h2>
            <hr />
            <div className="lg:flex gap-6 items-center lg:mx-12 mx-8 justify-center ">
                <div className="shadow-lg rounded-lg bg-white px-4 py-12 w-1/2">
                    <h2 className="text-3xl font-bold text-[#001F3F]">About Pet Adoption</h2>
                    <h3 className="text-2xl font-semibold my-6">
                        Our Mission:
                    </h3>

                        <p className="text-[#333333] ">At the heart of our mission is the commitment to facilitate pet adoptions and support meaningful causes through donation campaigns. We aim to build a platform where pet owners can easily list their pets for adoption, and caring individuals can open their hearts and homes to these adorable companions. Additionally, we provide a space for users to create and contribute to donation campaigns.</p>
                
                </div>
                <div className="w-1/2" >
                    <img src="https://i.ibb.co/Rj12yXG/wepik-export-20231203152208d-D5-Q.jpg"  className="object-cover w-60" />
                </div>
            </div>
            
        </div>
    );
};

export default About;