import { useParams } from "react-router-dom";
import usePetDetails from "../Hooks/usePetDetails";
import * as Yup from 'yup'

import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { useFormik } from "formik";
import useAuth from "../Hooks/useAuth";
import { MdFavorite, MdLocationPin } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useFavorites from "../Hooks/useFavorites";
const PetDetails = () => {
    const { user } = useAuth()
    const [favorites,refetch] = useFavorites()
    const axiosPublic = useAxiosPublic()
    const name = user?.displayName
    const email = user?.email
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const { id } = useParams()
    const { PetDetails } = usePetDetails(id)
 

    const formik = useFormik({

        initialValues: {
            requester_name: name,
            requester_email: email,
            phone: '',
            address: '',
            email: PetDetails.email


        },
        validationSchema: Yup.object({

        }),

        onSubmit: async values => {

            const adopterInfo = {
                requester_name: name,
                requester_email: email,
                email: PetDetails.email,
                pet_name: PetDetails.name,
                phone: values.phone,
                address: values.address,
                image: PetDetails.image,
                id: PetDetails._id
            }
            
            const reqInfo = await axiosPublic.post('/adoption/request', adopterInfo)
            console.log(reqInfo.data.insertedId)
            
            if (reqInfo.data.insertedId) {
               handleOpen()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Adoption Request has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                    
                    
                    
                });
            }



        },
    });
    const handleFavorites = async () => {
        const { _id, ...restOfPetDetails } = PetDetails;
        const favPet = { ...restOfPetDetails, email: email }
        console.log(favorites)

        const existingPet = favorites.find(favorite => favorite.name === favPet.name)
        if (existingPet) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }

        else {
            
            const favInfo = await axiosPublic.post('/pets/favorites', favPet)
            console.log(favInfo)
            if (favInfo.data.insertedId) {
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${favPet.name} has been added to the favorites`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
            }

        }



    }



    return (
        <div className="w-full">
            <div className="space-y-2 my-4 mx-6">
                <h2 className='text-xl  py-2 text-[#aea4af] rounded-2xl w-fit px-6 font-semibold bg-[#eaecf0]'>{PetDetails.category}</h2>
                <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {PetDetails.name}
                </h4>
                <h2 className='flex text-xl items-center'><span className='text-3xl mr-2 my-2  rounded-lg'><MdLocationPin></MdLocationPin></span> {PetDetails.pet_location}</h2>
                <div className="flex items-center justify-between text-xl font-semibold">
                    <h2 className="xl ml-4">Details</h2>
                    <button className="flex btn items-center gap-2" onClick={handleFavorites}><MdFavorite className="text-3xl"></MdFavorite> Add to Favorite</button>

                </div>
                <hr />
                <div className="lg:flex gap-4 my-4">
                    <img src={PetDetails.image} className="lg:w-2/4 w-full h-[70vh]  object-cover" alt="" />
                    <div>
                        <h2 className="text-xl font-semibold">{PetDetails.short_description}</h2><br />
                        <h2 className="text-md  ">{PetDetails.long_description}</h2>
                    </div>
                </div>
            </div>
            <div className="w-1/2 mx-auto">

                <Button onClick={handleOpen} variant="gradient" className="mb-8 text-center bg-red-500 text-white">
                    Adopt Pet
                </Button>
            </div>
            <Dialog open={open} handler={handleOpen} className="-z-10 w-2/4">
                <div className="text-center w-full mt-6">
                    <p>Please Fill up The Form</p>
                </div>
                <DialogBody className=" mx-auto">
                    <form onSubmit={formik.handleSubmit} className='mt-12 p-6 space-y-2 mx-auto'>
                        <div className='mx-auto w-full lg:w-2/4 space-y-2'>
                            <label htmlFor="name">User Name</label>
                            <br />
                            <input
                                name="name"
                                type="text"
                                defaultValue={name}
                                disabled
                                className="lg:w-3/4 w-full rounded-[7px]  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline disabled:outline-transparent"
                            />
                            <br />

                        </div>
                        <div className='lg:w-2/4 w-full mx-auto space-y-2'>
                            <label htmlFor="email">User Email Address </label>
                            <br />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={email}
                                disabled
                                className="lg:w-3/4 w-full rounded-[7px] bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline disabled:outline-transparent"

                            />
                        </div>

                        <div className='mx-auto w-full lg:w-2/4 space-y-2'>
                            <label htmlFor="phone">Phone Number</label>
                            <br />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                className="lg:w-3/4 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline  transition-all  focus:border-pink-base-300 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=' Your Phone Number'
                            />
                            <br />
                            {formik.touched.phone && formik.errors.phone ? (
                                <p className='text-red-400 text-md'>{formik.errors.phone}</p>
                            ) : null}
                        </div>
                        <div className='mx-auto w-full lg:w-2/4 space-y-2'>
                            <label htmlFor="address">Address</label>
                            <br />
                            <input
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                className="lg:w-3/4 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=' Your Address'
                            />
                            <br />
                            {formik.touched.address && formik.errors.address ? (
                                <p className='text-red-400 text-md'>{formik.errors.address}</p>
                            ) : null}
                        </div>
                        <div className='w-1/2 mx-auto'>
                            <button className='w-3/4 py-3 rounded-lg  px-3 bg-red-500 text-white' type="submit">Submit</button>
                        </div>

                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" className="mr-1 bg-red-500 text-white" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default PetDetails;