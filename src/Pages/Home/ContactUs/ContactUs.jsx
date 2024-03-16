import { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Title from '../../../Components/Title/Title';
import { Button, Input, Textarea } from "@material-tailwind/react";
const ContactUs = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_lzgtoes', 'template_ipthqvd', form.current, '5UJTYFKudy-2MtPvP')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div className='mb-20'>
            <Title title={'Contact us'} />
            <div id='contacts' className=' mt-12   text-white'>
                <div className='border-secondary  bg-primary border-2 mx-4 py-8 rounded-xl flex items-center justify-center'>

                    <form className='space-y-4' ref={form} onSubmit={sendEmail}>
                        <div>

                        <label>Name</label>
                        <br />
                        <Input size='lg' type="text" required name="user_name" placeholder="Type your Name " className="text-black bg-white/70 input mb-2 input-bordered input-accent w-full" />
                        </div>
                        <div>

                        <label>Email</label>
                        <br />
                        <Input size='lg' type="email" required name="user_email" placeholder='Enter your Email' className="input mb-2 text-black bg-white/70 input-bordered input-accent w-full" />
                        </div>
                   <div>

                        <label>Message</label>
                        <Textarea size='lg' name="message" required placeholder='Enter your Message' className="textarea mb-2 text-black bg-white/70 border-accent  w-full" />
                        <br />
                   </div>
                        <Button className='btn bg-secondary px-4 py-3 rounded-lg w-full' value='send' type="submit"> Send</Button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;