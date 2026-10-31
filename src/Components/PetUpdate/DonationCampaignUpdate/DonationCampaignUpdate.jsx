import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
];

const selectStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "var(--color-paper-2)",
        borderColor: "var(--color-rule)",
        borderRadius: "var(--radius-input)",
        color: "var(--color-ink)",
        padding: "2px 4px",
    }),
    singleValue: (base) => ({
        ...base,
        color: "var(--color-ink)",
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-rule)",
        color: "var(--color-ink)",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "var(--color-paper-2)" : "transparent",
        color: "var(--color-ink)",
    }),
};

const DonationCampaignUpdate = () => {
    const [campaign, setCampaign] = useState({});
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        axiosPublic.get(`/donations/${id}`)
            .then(res => {
                setCampaign(res.data);
            });
    }, [axiosPublic, id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pet_name: campaign?.pet_name || '',
            max_donation_amount: campaign?.max_donation_amount || '',
            last_date: campaign?.last_date || '',
            image: '',
            short_description: campaign?.short_description || '',
            long_description: campaign?.long_description || '',
            status: campaign?.status || 'active',
        },
        validationSchema: Yup.object({
            pet_name: Yup.string().required('Pet name is required'),
            max_donation_amount: Yup.number().required('Target amount is required'),
            last_date: Yup.date().required('End date is required'),
        }),

        onSubmit: async (values) => {
            let photo_url = campaign?.pet_image;
            const image = values.image;

            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                const res = await axios.post(image_hosting_api, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (res.data?.data?.display_url) {
                    photo_url = res.data.data.display_url;
                }
            }

            const updatedInfo = {
                pet_name: values.pet_name,
                max_donation_amount: values.max_donation_amount,
                last_date: values.last_date,
                pet_image: photo_url,
                short_description: values.short_description,
                long_description: values.long_description,
                status: values.status,
            };

            const result = await axiosPublic.put(`/donations/${id}`, updatedInfo);
            if (result.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Campaign updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
    });

    return (
        <div className='w-full max-w-4xl mx-auto py-4'>
            <form onSubmit={formik.handleSubmit} className='bg-card rounded-card border border-rule p-6 sm:p-10 shadow-card space-y-6 text-ink'>
                <div className='text-center pb-4 border-b border-rule'>
                    <span className='text-xs uppercase tracking-wider font-semibold text-accent-3'>
                        Campaign Settings
                    </span>
                    <h2 className='text-2xl sm:text-3xl font-display font-semibold text-ink mt-1'>
                        Edit Medical Campaign
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pet_name" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Companion Name
                        </label>
                        <input
                            id="pet_name"
                            name="pet_name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_name}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                        {formik.touched.pet_name && formik.errors.pet_name && (
                            <p className='text-xs text-accent-3 mt-1'>{formik.errors.pet_name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="max_donation_amount" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Funding Goal ($)
                        </label>
                        <input
                            id="max_donation_amount"
                            name="max_donation_amount"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.max_donation_amount}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                        {formik.touched.max_donation_amount && formik.errors.max_donation_amount && (
                            <p className='text-xs text-accent-3 mt-1'>{formik.errors.max_donation_amount}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="last_date" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Deadline Date
                        </label>
                        <input
                            id="last_date"
                            name="last_date"
                            type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_date}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Campaign Status
                        </label>
                        <Select
                            id="status"
                            name="status"
                            options={statusOptions}
                            value={statusOptions.find(o => o.value === formik.values.status)}
                            onChange={(event) => {
                                formik.setFieldValue('status', event.value);
                            }}
                            onBlur={formik.handleBlur}
                            styles={selectStyles}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Replace Photo (Optional)
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            formik.setFieldValue('image', file);
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full text-xs text-muted file:mr-3 file:py-2 file:px-3 file:rounded-pill file:border-0 file:text-xs file:font-semibold file:bg-paper-2 file:text-ink hover:file:bg-paper-3"
                    />
                </div>

                <div>
                    <label htmlFor="short_description" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Summary Headline
                    </label>
                    <input
                        id="short_description"
                        name="short_description"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.short_description}
                        className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="long_description" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Full Medical Description
                    </label>
                    <textarea
                        id="long_description"
                        name="long_description"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.long_description}
                        className="w-full px-4 py-3 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors resize-none"
                    />
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        className="py-3 px-8 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors"
                    >
                        Save Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationCampaignUpdate;
