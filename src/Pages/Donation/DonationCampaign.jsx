import { Link } from "react-router-dom";
import useDonations from "../../Components/Hooks/useDonations";

const DonationCampaign = () => {
    const [donations] = useDonations()
    
    return (
        <div>
            <h2 className='text-center text-4xl text-green-600 my-6'>Total Pets {donations.length} </h2>
            <div className='grid lg:grid-cols-3 gap-4'>

                {
                    donations.map(donation => <Link to={`/donationCampaign/${donation._id}`} key={donation._id} class="relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                        </div>
                        <div class="px-6 py-4 lg:ml-4">
                            <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Pet Name: {donation.pet_name}
                            </h4>
                            <div class="lg:flex font-sans gap-4 text-center items-center  antialiased justify-between text-sm  bg-clip-text">
                            <h2 className="bg-pink-600 px-2 rounded-md text-white py-4">Max Donation: ${donation.max_donation_amount}</h2>
                            <p className="bg-pink-600 px-3 rounded-md text-white py-4">
                                Donated Amount: ${donation.donated_amount}</p>
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