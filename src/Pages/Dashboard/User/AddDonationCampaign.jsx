import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import useAuth from '../../../Components/Hooks/useAuth';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' }
];

const AddDonationCampaign = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const formik = useFormik({
        initialValues: {
            pet_name: '',
            max_donation_amount: '',
            last_date: '',
            image: '',
            short_description: '',
            long_description: '',
            status: 'active',
        },
        validationSchema: Yup.object({
            pet_name: Yup.string()
                .required('Pet name is required'),
            max_donation_amount: Yup.number()
                .required('Target funding amount is required'),
            last_date: Yup.date()
                .required('End date is required'),
        }),

        onSubmit: async (values, { resetForm }) => {
            let photo_url = "https://i.ibb.co/RgXFFJW/2c791441-ac9f-411f-85a8-9fb6e8b834f0.jpg";
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

            const CampaignInfo = {
                pet_name: values.pet_name,
                max_donation_amount: values.max_donation_amount,
                last_date: values.last_date,
                pet_image: photo_url,
                short_description: values.short_description,
                long_description: values.long_description,
                status: values.status || 'active',
                date_time: new Date(),
                donated_amount: 0,
                user_email: user?.email,
                user_name: user?.displayName,
            };

            const campaignRes = await axiosPublic.post('/donations', CampaignInfo);
            if (campaignRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Campaign published successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm();
            }
        },
    });

    return (
        <div className='w-full max-w-4xl mx-auto py-4'>
            <form onSubmit={formik.handleSubmit} className='bg-card rounded-card border border-rule p-6 sm:p-10 shadow-card space-y-6 text-ink'>
                <div className='text-center pb-4 border-b border-rule'>
                    <span className='text-xs uppercase tracking-wider font-semibold text-accent-3'>
                        Emergency Medical Relief
                    </span>
                    <h2 className='text-2xl sm:text-3xl font-display font-semibold text-ink mt-1'>
                        Start a Veterinary Relief Campaign
                    </h2>
                    <p className='text-xs sm:text-sm text-ink-2 mt-1'>
                        Raise direct crowdfunding for emergency surgeries, medications, and clinical stays
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pet_name" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Companion / Patient Name
                        </label>
                        <input
                            id="pet_name"
                            name="pet_name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_name}
                            placeholder="e.g. Barnaby"
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                        {formik.touched.pet_name && formik.errors.pet_name && (
                            <p className='text-xs text-accent-3 mt-1'>{formik.errors.pet_name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="max_donation_amount" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Target Goal Amount ($ USD)
                        </label>
                        <input
                            id="max_donation_amount"
                            name="max_donation_amount"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.max_donation_amount}
                            placeholder="e.g. 1500"
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
                            Campaign Deadline
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
                        {formik.touched.last_date && formik.errors.last_date && (
                            <p className='text-xs text-accent-3 mt-1'>{formik.errors.last_date}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="status" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Campaign Status
                        </label>
                        <Select
                            id="status"
                            name="status"
                            options={statusOptions}
                            defaultValue={statusOptions[0]}
                            onChange={(event) => {
                                formik.setFieldValue('status', event.value);
                            }}
                            onBlur={formik.handleBlur}
                            styles={{
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
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Patient / Companion Photo
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
                        Medical Need Headline
                    </label>
                    <input
                        id="short_description"
                        name="short_description"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.short_description}
                        placeholder="e.g. Emergency cruciate ligament repair and rehabilitation"
                        className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor="long_description" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Full Clinical Story & Itemized Breakdown
                    </label>
                    <textarea
                        id="long_description"
                        name="long_description"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.long_description}
                        placeholder="Detail the veterinary diagnosis, hospital quotes, surgical timeline, and expected recovery outcome…"
                        className="w-full px-4 py-3 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors resize-none"
                    />
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        className="py-3 px-8 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors"
                    >
                        Publish Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDonationCampaign;
