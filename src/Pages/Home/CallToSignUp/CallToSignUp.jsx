import React from 'react';
import Title from '../../../Components/Title/Title';
import signup from '../../../assets/others/12146524_Wavy_Lst-12_Single-09.jpg'
import { Link } from 'react-router-dom';

const CallToSignUp = () => {
    const buttonStyle ="lg:block lg:mt-6 w-24 mt-3 lg:py-2 p-2 lg:px-3 p-3 rounded-lg text-xl bg-secondary text-white  lg:text-xl font-medium"
    return (
        <div className='my-20'>
            <Title title={'Join the Pet Loving Community'}/>
            <div className='mb-12 flex lg:flex-row-reverse flex-col-reverse justify-center gap-24 items-center'>
                <div className='lg:w-1/2 mx-4'>

            <h1 className='text-4xl py-2 font-semibold '>We ensure the hustle free <br /><span className="text-secondary">experience</span> </h1>
            <p className='text-[#333333] mb-4 lg:mb-0'>Don't miss out on your dream pet! Sign up for customized pet alerts, save your favorites, and be the first to know when new fur babies arrive. Make finding your new best friend easy and rewarding. </p>
            <Link className={buttonStyle} to='/signup'>Sign Up</Link>

                </div>
            <img src={signup} className='lg:w-1/3 lg:mt-0 mt-6' alt="" />
            </div>
        </div>
    );
};

export default CallToSignUp;