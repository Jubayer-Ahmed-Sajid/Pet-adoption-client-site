import React from 'react';
import usePets from '../../Components/Hooks/usePets';
import { Link } from 'react-router-dom';

const Petlisting = () => {
    const [pets, refetch] = usePets()
    console.log(pets)
    return (
        <div>
            <h2 className='text-center text-4xl text-green-600 my-6'>Total Pets {pets.length} </h2>
            <div className='grid lg:grid-cols-3 gap-4'>

                {
                    pets.map(pet => <Link to={`/petlisting/${pet._id}`} key={pet._id} class="relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                        </div>
                        <div class="px-6 py-4 lg:ml-4">
                            <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Pet Name: {pet.name}
                            </h4>
                            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                                Pet Age: {pet.age}
                            </p>
                            <h2>Location: {pet.pet_location}</h2>
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