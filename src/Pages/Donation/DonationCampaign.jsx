import { Link } from "react-router-dom";
import useDonations from "../../Components/Hooks/useDonations";

const DonationCampaign = () => {
    const [donations] = useDonations()
    
    return (
        <div>
            <h2 className='text-center text-4xl text-secondary mt-20 my-6'>Donation Campaigns </h2>
            <div className='grid lg:grid-cols-3 gap-4'>

                {
                    donations.map(donation => <Link to={`/donationCampaign/${donation._id}`} key={donation._id} className="relative hover:shadow-lg transition-transform duration-300 transform hover:scale-105 flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-80 rounded-xl bg-clip-border">
                            <img src={donation.image} alt="profile-picture" />
                        </div>
                        <div className="px-6 py-4 lg:ml-4">
                            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Pet Name: {donation.pet_name}
                            </h4>
                            <div className="flex lg:flex-row flex-col font-sans gap-4 text-center items-center  antialiased justify-between text-sm  bg-clip-text">
                            <h2 className="bg-secondary px-2 rounded-md text-white py-4">Campaign Goal: <span className="font-semibold text-lg">${donation.max_donation_amount} </span> </h2>
                            <p className="bg-secondary px-3 rounded-md text-white py-4">
                                Raised Amount: <span className="font-semibold text-lg">${donation.donated_amount}</span></p>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            

                        </div>

                    </Link>)
                }
            </div>

        </div>
    );
};

export default DonationCampaign;