import React from 'react';
import { MdCalendarMonth, MdFavorite } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)

const DonationDetails = () => {
    const donationDetails = useLoaderData()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    console.log(donationDetails)
    return (
        <div>
            <div className="space-y-2 my-4 mx-6">
                <h2 className='text-xl  py-2 text-[#aea4af] rounded-2xl w-fit px-6 font-semibold bg-[#eaecf0]'>{donationDetails.pet_name}</h2>
                <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {donationDetails.max_donation_amount}
                </h4>
                <h2 className='flex text-xl items-center'><span className='text-3xl mr-2 my-2  rounded-lg'><MdCalendarMonth></MdCalendarMonth></span> {donationDetails.last_date}</h2>
                <div className="flex items-center justify-between text-xl font-semibold">
                    <h2 className="xl ml-4">Details</h2>
                    <h2 className="flex items-center gap-2"><MdFavorite className="text-3xl"></MdFavorite> Add to Favorite</h2>

                </div>
                <hr />
                <div className="flex gap-4 my-4">
                    <img src={donationDetails.image} className="w-2/4 h-[70vh]  object-cover" alt="" />
                    <div>
                        <h2 className="text-xl font-semibold">{donationDetails.short_description}</h2><br />
                        <h2 className="text-md  ">{donationDetails.long_description}</h2>
                    </div>
                </div>
            </div>
            <div>
            <Button disabled={donationDetails.status !=='continue' || donationDetails.max_donation_amount <=  donationDetails.donated_Amount}  onClick={handleOpen} variant="gradient" className="mb-8 text-center bg-yellow-600 text-white">
                    Adopt Pet
                </Button>
                <Dialog open={open} handler={handleOpen} className=" w-3/4">
                    <DialogBody className=" mx-auto">
                        <Elements stripe={stripePromise}>
                            <CheckOutForm></CheckOutForm>
                        </Elements>
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
        </div>
    );
};

export default DonationDetails;