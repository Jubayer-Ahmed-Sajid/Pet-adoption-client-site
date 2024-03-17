import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import { Textarea } from "@material-tailwind/react";
import axios from 'axios';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import useAuth from '../../../Components/Hooks/useAuth';
import Compressor from 'compressorjs';
import { Toaster, toast } from 'sonner';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const options = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'fish', label: 'Fish' },
    { value: 'bird', label: 'Bird' },
    { value: 'fox', label: 'Fox' }
]


const AddPet = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const formik = useFormik({

        initialValues: {
            pet_name: '',
            age: '',
            pet_location: '',
            image: '',
            short_description: '',
            long_description: '',
            category: ''
        },
        validationSchema: Yup.object({
            pet_name: Yup.string()
                .required('Required'),
            age: Yup.number()
                .required('Required'),
            pet_location: Yup.string()
                .required('No pet_location provided.')

        }),

        onSubmit: async values => {
            try {
               const petLoading =  toast.loading('Pet is adding')
                const image = values.image;

                // Compress the image
                const compressedImage = await new Promise((resolve, reject) => {
                    new Compressor(image, {
                        quality: 0.8,
                        success(result) {
                            resolve(result);
                        },
                        error(error) {
                            reject(error);
                        }
                    });
                });

                // Create FormData with the compressed image
                const formData = new FormData();
                formData.append('image', compressedImage, compressedImage.name);

                // Upload compressed image to image hosting API
                const imageRes = await axios.post(image_hosting_api, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // Extract image URL
                const img_url = imageRes.data.data.display_url;

                // Prepare pet information
                const petsInfo = {
                    name: values.pet_name,
                    age: values.age,
                    pet_location: values.pet_location,
                    image: img_url,
                    short_description: values.short_description,
                    long_description: values.long_description,
                    category: values.category,
                    adopted: false,
                    email: user?.email,
                    AddedDate: new Date().toDateString()
                };

                // Add pet information to the database
                const petRes = await axiosPublic.post('/pets', petsInfo);

                if (petRes.data.insertedId) {
                    toast.dismiss(petLoading)
                    toast.success('Pet Successfully Added');
                }

                console.log(petRes.data);
            } catch (error) {
                toast.dismiss(petLoading)
                toast.error('error.message')
                console.error('An error occurred:', error);

            }
        }

    });
    
    return (
        <div className='w-screen'>
            {/* Sooner toast  */}
            <Toaster
                richColors
                position='top-right'
            />

            {/* Pet add form starts here */}

            <form onSubmit={formik.handleSubmit} className=' bg-gray-600 h-full p-4 space-y-6 mx-auto '>
                <div className='w-2/4 pb-6 font-bold mx-auto'>

                <h2 className='text-center text-xl lg:text-4xl text-secondary mt-4 lg:mt-6 mb-2'>Add a Pet </h2>
                <hr className="border-t-2 border-white my-2" />
                </div>

                <div className="w-full lg:space-y-0 space-y-6 lg:flex gap-4">


                    <div className='mx-auto w-full space-y-2'>
                        <label htmlFor="pet_name" className='text-white font-semibold text-md'>Pet Name</label>
                        <br />
                        <input
                            id="pet_name"
                            name="pet_name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_name}
                            className="text-gray-200 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Pet Name'
                        />
                        <br />
                        {formik.touched.pet_name && formik.errors.pet_name ? (
                            <p className='text-red-400 text-md'>{formik.errors.pet_name}</p>
                        ) : null}
                    </div>


                    <div className=' mx-auto w-full space-y-2'>
                        <label htmlFor="age" className='text-white font-semibold text-md'>Age </label>
                        <br />

                        <input
                            id="age"
                            name="age"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.age}
                            className="text-gray-200 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder='age Address'
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <p className='text-red-400 text-md'>{formik.errors.age}</p>
                        ) : null}
                    </div>
                </div>
                <div className="w-full mx-auto space-y-2">

                <label htmlFor="category" className='text-white font-semibold text-md'>Categories</label>
                <Select
                    id="category"
                    name="category"
                    options={options}
                    placeholder='Chose category'
                    onChange={(event) => {
                        const category = event.value
                        formik.setFieldValue('category', category)
                    }
                    }
                    onBlur={formik.handleBlur} />
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

                <div className='w-full space-y-6 lg:space-y-0 lg:flex gap-4'>
                    <div className="space-y-2 mx-auto lg:w-2/4">
                        <label htmlFor="locations" className='text-white font-semibold text-md'>Location</label>
                        <br />
                        <input
                            id="pet_location"
                            name="pet_location"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_location}
                            className="text-gray-200 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Address'
                        />
                        {formik.touched.pet_location && formik.errors.pet_location ? (
                            <p className='text-red-400 text-md'>{formik.errors.pet_location}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2 mx-auto lg:w-2/4">
                        <label htmlFor="short_description" className='text-white font-semibold text-md'>Short Description</label>
                        <br />
                        <input
                            id="short_description"
                            name="short_description"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.short_description}
                            className="text-gray-200 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Address'
                        />
                        {formik.touched.short_description && formik.errors.short_description ? (
                            <p className='text-red-400 text-md'>{formik.errors.short_description}</p>
                        ) : null}
                    </div>
                </div>

                <div className="w-full space-y-2">
                <label htmlFor="long_description" className='text-white font-semibold text-md'>Long Description</label>
                    <Textarea
                        className='lg:h-40 h-32 text-gray-200'
                        name='long_description'
                        id='long_description'
                        type='text'
                        placeholder='Long Description'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.long_description}
                    />
                </div>

                <br />
                <div className='w-full flex justify-center '>

                    <button className='w-2/5 btn py-3 rounded-lg  px-3 bg-secondary text-white' type="submit">Add Pet</button>
                 

                </div>
            </form>

            {/* Form ends here */}
           
        </div>
    );
};
export default AddPet