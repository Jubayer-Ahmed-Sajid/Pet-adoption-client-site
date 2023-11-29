import { useParams } from "react-router-dom";
import usePetDetails from "../Hooks/usePetDetails";
import * as Yup from 'yup'

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { useFormik } from "formik";
import useAuth from "../Hooks/useAuth";
const PetDetails = () => {
    const { user } = useAuth()
    const name = user.displayName
    const email = user.email
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const { id } = useParams()
    const { PetDetails } = usePetDetails(id)
    const formik = useFormik({

        initialValues: {
            name:name,
            email:email,
            phone:'',
            address:''

        },
        validationSchema: Yup.object({
           
        }),

        onSubmit: async values => {
            const adopterInfo = {
                name:user && user?.displayName,
                email: user && user?.email,
                phone:values.phone,
                address:values.address
            }
            console.log(adopterInfo)



        },
    });



    return (
        <div className="w-full">
            <h2>{PetDetails.name}</h2>
            <h2>{PetDetails.age}</h2>
            <Button onClick={handleOpen} variant="gradient" className="text-black">
                Open Dialog
            </Button>
            <Dialog open={open} handler={handleOpen} className=" w-3/4">
                <div className="text-center w-full mt-6">
                    <p>Please Fill up The Form</p>
                </div>
                <DialogBody className=" mx-auto">
                    <form onSubmit={formik.handleSubmit} className='mt-12 p-6 space-y-2 mx-auto'>
                        <div className='mx-auto w-2/4 space-y-2'>
                            <label htmlFor="name">User Name</label>
                            <br />
                            <input
                                name="name"
                                type="text"
                                defaultValue={user?.displayName}
                                disabled
                                className="w-3/4 rounded-[7px]   bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline disabled:outline-transparent"
                            />
                            <br />

                        </div>
                        <div className='w-2/4 mx-auto space-y-2'>
                            <label htmlFor="email">User Email Address </label>
                            <br />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user?.email}
                                disabled
                                className="w-3/4 rounded-[7px]   bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline disabled:outline-transparent"
                               
                            />
                        </div>

                        <div className='mx-auto w-2/4 space-y-2'>
                            <label htmlFor="phone">Phone Number</label>
                            <br />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                className="w-3/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline  transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=' Your full Name'
                            />
                            <br />
                            {formik.touched.phone && formik.errors.phone ? (
                                <p className='text-red-400 text-md'>{formik.errors.phone}</p>
                            ) : null}
                        </div>
                        <div className='mx-auto w-2/4 space-y-2'>
                            <label htmlFor="address">Address</label>
                            <br />
                            <input
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                className="w-3/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=' Your Address'
                            />
                            <br />
                            {formik.touched.address && formik.errors.address ? (
                                <p className='text-red-400 text-md'>{formik.errors.address}</p>
                            ) : null}
                        </div>
                        <div className='w-1/2 mx-auto'>
                            <button className='w-3/4 py-3 rounded-lg  px-3 bg-yellow-600 text-white' type="submit">Submit</button>
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
                    <Button variant="gradient" className="mr-1 text-green-500" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default PetDetails;