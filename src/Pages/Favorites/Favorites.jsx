import { Link } from "react-router-dom";
import useFavorites from "../../Components/Hooks/useFavorites";
import { MdLocationPin } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { Toaster, toast } from "sonner";
const Favorites = () => {
    const [favorites, refetch] = useFavorites()
    const axiosPublic = useAxiosPublic()
    const handleRemove =async(id)=>{
        const RemoveFavorites = toast.loading('Removing Pet')
        const deleteFav = await axiosPublic.delete(`/pets/favorites/${id}`)
        console.log(deleteFav.data)
        if(deleteFav.data.deletedCount){
            setTimeout(() => {
                toast.dismiss(RemoveFavorites);
                toast.success('Pet Removed from the Favorite list');
            }, 500);
            refetch()
        }

    }
    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-6">Favorites</h2>
            <Toaster richColors position="top-right"/>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                {favorites.length < 1 ? (
                    <div className="h-screen w-screen flex items-center justify-center">
                        <p className="text-3xl text-secondary">You have not added any pet to favorites.</p>
                    </div>
                ):(
                    <div>
                        {
                            favorites?.map(pet => <div key={pet._id} class="relative space-y-2 flex flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                                <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white  h-80 rounded-xl bg-clip-border">
                                    <div onClick={()=>handleRemove(pet._id)} className="text-xl  flex justify-end text-center my-4"><button className="btn" data-tooltip-id={`${pet._id}`}><FaMinus className="text-center"></FaMinus></button></div>
                                    <ReactTooltip id={`${pet._id}`} type='error'>
                                        <span>Remove from Favorite</span>
                                    </ReactTooltip>
        
                                    <img src={pet.image} className='w-3/4 mx-auto h-60 object-cover' alt="profile-picture" />
                                </div>
                                <h2 className='text-xl ml-8 py-2 text-[#aea4af] rounded-2xl w-fit px-6 font-semibold bg-[#eaecf0]'>{pet.category}</h2>
                                <div class="py-4 ml-2">
                                    <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {pet.name}
                                    </h4>
                                    <p class="block font-sans  antialiased font-medium leading-relaxed text-xl bg-clip-text">
                                        Pet Age: {pet.age}
                                    </p>
                                    <div className='flex items-center gap-4 justify-between'>
        
                                        <h2 className='flex items-center'><span className='text-2xl mr-2 my-2  rounded-lg'><MdLocationPin></MdLocationPin></span> {pet.pet_location}</h2>
                                        <h2>Added On {pet.AddedDate}</h2>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center">
                                    <Link to={`/petlisting/${pet._id}`} className='bg-secondary p-3 my-3 btn text-white font-semibold rounded-lg'>See Details</Link>
        
                                </div>
        
                            </div>)
                        }

                    </div>
                )
            }
            </div>
        </div>

    );
};

export default Favorites;