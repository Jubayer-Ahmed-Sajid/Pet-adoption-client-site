import React, { useEffect, useState } from 'react';
import usePets from '../../Components/Hooks/usePets';
import { Link } from 'react-router-dom';
import { MdLocationPin, MdSearch } from "react-icons/md";
import { Input, Option, Select } from '@material-tailwind/react';
import axios from 'axios';
import useAxiosPublic from '../../Components/Hooks/useAxiosPublic';

const Petlisting = () => {
    const [pets, refetch] = usePets()
    const axiosPublic = useAxiosPublic()
    const [query, setQuery] = useState('')
    const [displayPets, setDisplayPets] = useState([])

    useEffect(() => {
        const petToDisplay = pets.filter(pet => !pet.adopted)
        setDisplayPets(petToDisplay)
    }, [pets,setDisplayPets])
    console.log('Unadopted',displayPets)


    console.log(displayPets)


    const handleSearch = async () => {
        const response = await axiosPublic.get(`/pets/search?name=${query}`);
        console.log(response)

        setDisplayPets(response.data);

    };

    return (
        <div className='px-4 mt-20'>
            <div className='lg:flex items-center flex-row justify-start w-1/2'>
                <Input type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='search pet here' className='border-black pl-4 p-2 bg-base-300 flex' name="" id="" />
                <button onClick={handleSearch} className='text-xl font-semibold bg-black text-white px-3 py-2  rounded-lg '>Search</button>
                <div className="w-72 mb-6">
                    <Select  className='mb-2 border-none text-center  bg-green-600 text-xl text-blue-500 font-semibold' label='See by Category'>
                        <Option><Link to='/categoryPets/cat'>Cat</Link></Option>
                        <Option><Link to='/categoryPets/dog'>Dog</Link></Option>
                        <Option><Link to='/categoryPets/fish'>Fish</Link></Option>
                        <Option><Link to='/categoryPets/bird'>Bird</Link></Option>
                        
                    </Select>
                </div>
            </div>



            <div className='grid lg:grid-cols-3 gap-4'>

                {
                    displayPets?.map(pet => <div  key={pet._id} className="ml-4 relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white  h-72 rounded-xl bg-clip-border">

                            <img src={pet.image} className='w-3/4 mx-auto h-60 object-cover' alt="profile-picture" />
                        </div>
                        <h2 className='text-xl py-2 ml-4 text-[#aea4af] rounded-xl w-fit px-6 font-semibold bg-[#eaecf0]'>{pet.category}</h2>
                        <div className="px-6 py-3">
                            <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {pet.name}
                            </h4>
                            <p className="block font-sans  antialiased font-medium leading-relaxed text-md bg-clip-text">
                                Pet Age: {pet.age}
                            </p>
                            <div className='flex lg:flex-row flex-col gap-3 items-center justify-between'>

                                <h2 className='flex items-center'><span className='text-3xl mr-2 my-2  rounded-lg'><MdLocationPin></MdLocationPin></span> {pet.pet_location}</h2>
                                <h2>Added On {pet.AddedDate}</h2>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <Link to={`/petlisting/${pet._id}`} className='bg-[#4CAF41] hover:bg-[#4CAF8d] p-3 mb-3 text-white font-semibold rounded-lg'>See Details</Link>

                        </div>

                    </div>)
                }
            </div>

        </div >
    );
};

export default Petlisting;