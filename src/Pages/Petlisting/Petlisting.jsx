import React from 'react';
import usePets from '../../Components/Hooks/usePets';
import { Link } from 'react-router-dom';
import { MdLocationPin } from "react-icons/md";

const Petlisting = () => {
    const [pets, refetch] = usePets()
    console.log(pets)
    return (
        <div className='px-4'>
            <h2 className='text-center text-4xl text-green-600 my-6'>Total Pets {pets.length} </h2>
            <div className='grid lg:grid-cols-3 gap-4'>

                {
                    pets.map(pet => <Link to={`/petlisting/${pet._id}`} key={pet._id} class="relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white  h-80 rounded-xl bg-clip-border">

                            <img src={pet.image} className='w-3/4 mx-auto h-60 object-cover' alt="profile-picture" />
                        </div>
                            <h2 className='text-xl ml-8 py-2 text-[#aea4af] rounded-2xl w-fit px-6 font-semibold bg-[#eaecf0]'>{pet.category}</h2>
                        <div class="px-6 py-4 lg:ml-4">
                            <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                              {pet.name}
                            </h4>
                            <p class="block font-sans  antialiased font-medium leading-relaxed text-xl bg-clip-text">
                                Pet Age: {pet.age}
                            </p>
                            <div className='flex items-center justify-between'>

                            <h2 className='flex text-xl items-center'><span className='text-3xl mr-2 my-2  rounded-lg'><MdLocationPin></MdLocationPin></span> {pet.pet_location}</h2>
                            <h2>Added On {pet.AddedDate}</h2>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <button className='bg-yellow-600 p-3 my-3 text-white font-semibold rounded-lg'>See Details</button>

                        </div>

                    </Link>)
                }
            </div>

        </div>
    );
};

export default Petlisting;