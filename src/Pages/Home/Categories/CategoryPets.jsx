import { MdLocationPin } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Option, Select,Input } from "@material-tailwind/react";

const CategoryPets = () => {
    const pets = useLoaderData()
    const axiosPublic = useAxiosPublic()
    const [query, setQuery] = useState('')
    const [displayPets, setDisplayPets] = useState([])

    useEffect(() => {
        const petToDisplay = pets.filter(pet => !pet.status)
        setDisplayPets(petToDisplay)

    }, [setDisplayPets])
    console.log(displayPets)


    const handleSearch = async () => {
        const response = await axiosPublic.get(`/pets/search?name=${query}`);
        console.log(response)

        setDisplayPets(response.data);

    };

    return (
        <div>
                <div className='lg:flex items-center flex-row justify-start w-1/2'>
                    <Input type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='search pet here' className='border-black pl-4 p-2 bg-base-300 flex' name="" id="" />
                    <button onClick={handleSearch} className='text-xl font-semibold bg-black text-white px-3 py-2  rounded-lg '>Search</button>
                    <div className="w-72 mb-6">
                        <label htmlFor=""> Select category</label>
                        <Select className='mb-2 border-none text-center h-24 text-xl bg-green-600 font-semibold' defaultValue={'See by Category'}>
                            
                            <Option><Link to='/categoryPets/cat'>Cat</Link></Option>
                            <Option><Link to='/categoryPets/dog'>Dog</Link></Option>
                            <Option><Link to='/categoryPets/fish'>Fish</Link></Option>
                            <Option><Link to='/categoryPets/bird'>Bird</Link></Option>
                        </Select>
                    </div>
                </div>

            <div className='grid lg:grid-cols-3 gap-4'>
                {
                    displayPets.map(pet => <Link to={`/petlisting/${pet._id}`} key={pet._id} class="relative flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
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

export default CategoryPets;