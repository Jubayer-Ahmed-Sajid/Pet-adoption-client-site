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
                    displayPets?.map(pet => <Link to={`/petlisting/${pet._id}`} key={pet._id} className="relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white  h-80 rounded-xl bg-clip-border">

                            <img src={pet.image} className='w-3/4 mx-auto h-60 object-cover' alt="profile-picture" />
                        </div>
                        <h2 className='text-xl ml-8 py-2 text-[#aea4af] rounded-2xl w-fit px-6 font-semibold bg-[#eaecf0]'>{pet.category}</h2>
                        <div className="px-6 py-4 lg:ml-4">
                            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {pet.name}
                            </h4>
                            <p className="block font-sans  antialiased font-medium leading-relaxed text-xl bg-clip-text">
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

        </div >
    );
};

export default Petlisting;