import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import { Textarea } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../../Components/Hooks/useAuth';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const statusOptions = [
    { value: 'continue', label: 'Continue' },
    { value: 'paused', label: 'Paused' },
]

const AddDonationCampaign = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const formik = useFormik({

        initialValues: {
            max_donation_amount:'',
            pet_name:'',
            last_date:'',
            image:'',
            short_description:'',
            long_description:''
        },
        validationSchema: Yup.object({
            pet_name: Yup.string()
                .required('Required'),
            max_donation_amount: Yup.string()
                .required('Required'),
            last_date: Yup.date()
                .required('Required'),
            short_description: Yup.string()
                .required('No pet_location provided.'),
            long_description: Yup.string()
                .required('No pet_location provided.')

        }),

        onSubmit: async values => {
            console.log(values)
            const image = values.image
            const formData = new FormData();
            formData.append('image', image)
            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const img_url = res.data.data.display_url
            const CampaignInfo = {
                max_donation_amount: values.max_donation_amount,
                pet_name:values.pet_name,
                last_date: new Date(values.last_date).toDateString(),
                image: img_url,
                short_description: values.short_description,
                long_description: values.long_description,
                email: user?.email,
                AddedDate: new Date().toDateString(),
                status:'Continue'

            }
            const campaignRes = await axiosPublic.post('/donations', CampaignInfo)
            if (campaignRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully added the Campaign!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            console.log(campaignRes.data)

        },
    });
    return (
        <div className='w-screen'>
            <form onSubmit={formik.handleSubmit} className=' bg-gray-600 p-4 space-y-2 mx-auto '>
                <h2 className='text-center text-4xl text-yellow-600 my-6'>Add Donation Campaign </h2>

                <div className="w-full lg:flex gap-4">
                <div className='w-full gap-4'>
                   

                   <div className="space-y-2 mx-auto ">
                       <label htmlFor="pet_name" className='text-white font-semibold text-md'>Pet Name</label>
                       <br />
                       <input
                           id="pet_name"
                           name="pet_name"
                           type="text"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.pet_name}
                           className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                       />
                       {formik.touched.pet_name && formik.errors.pet_name ? (
                           <p className='text-red-400 text-md'>{formik.errors.pet_name}</p>
                       ) : null}
                   </div>
               </div>


                    <div className='mx-auto w-full space-y-2'>
                        <label htmlFor="max_donation_amount" className='text-white font-semibold text-md'>Maximum Donation Amount</label>
                        <br />
                        <input
                            id="max_donation_amount"
                            name="max_donation_amount"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.max_donation_amount}

                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <br />
                        {formik.touched.max_donation_amount && formik.errors.max_donation_amount ? (
                            <p className='text-red-400 text-md'>{formik.errors.max_donation_amount}</p>
                        ) : null}
                    </div>


                    <div className=' mx-auto w-full space-y-2'>
                        <label htmlFor="last_date" className='text-white font-semibold text-md'>Last Date </label>
                        <br />

                        <input
                            id="last_date"
                            name="last_date"
                            type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_date}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        {formik.touched.last_date && formik.errors.last_date ? (
                            <p className='text-red-400 text-md'>{formik.errors.last_date}</p>
                        ) : null}
                    </div>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <Select options={statusOptions}
                            id="status"
                            name="status"
                            // value={campaign.status}
                            onChange={(event) => {
                                const status = event.value
                                formik.setFieldValue('status', status)
                            }
                            }
                            onBlur={formik.handleBlur} ></Select>
                </div>


                <div className="w-full mx-auto space-y-2">
                    <label className='text-white font-semibold text-md'>Image</label>
                    <br />

                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            formik.setFieldValue('image', file);
                        }}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className='w-full gap-4'>
                   

                    <div className="space-y-2 mx-auto ">
                        <label htmlFor="short_description" className='text-white font-semibold text-md'>Short Description</label>
                        <br />
                        <input
                            id="short_description"
                            name="short_description"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.short_description}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        {formik.touched.short_description && formik.errors.short_description ? (
                            <p className='text-red-400 text-md'>{formik.errors.short_description}</p>
                        ) : null}
                    </div>
                </div>
                <label htmlFor="long_description" className='text-white font-semibold text-md'>Long Description</label>
                <div className="w-full">
                    <Textarea
                        className='h-40 text-green-400'
                        name='long_description'
                        id='long_description'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.long_description}
                    />
                </div>


                <br />
                <div className='w-1/2 mx-auto'>

                    <button className='w-3/4 btn py-3 rounded-lg  px-3 bg-yellow-600 text-white' type="submit">Create Campaign</button>
                </div>

            </form >
        </div >
    );
};
export default AddDonationCampaign