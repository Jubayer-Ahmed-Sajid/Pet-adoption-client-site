import { Button } from '@material-tailwind/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosPublic from '../../Components/Hooks/useAxiosPublic';
import Swal from 'sweetalert2';


const CheckOut = () => {
    const axiosPublic = useAxiosPublic()
    const stripe = useStripe('')
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const elements = useElements()
    const [error, setError] = useState('')
    const handleAmount = (e) => {
        e.preventDefault()
        const amount = e.target.value
        const intAmount = parseInt(amount)
        setTotalAmount(intAmount)
        console.log(intAmount)

    }
    console.log(totalAmount)
    useEffect(() => {
        if (totalAmount > 0) {

            axiosPublic.post('/create-payment-intent', { price: totalAmount })
                .then(res => {
                    console.log(res.data)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosPublic, totalAmount])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (methodError) {
            setError(methodError.message)
            console.log(methodError)
            setError
        } else {
            console.log('Payment Method is', paymentMethod);
            setError('')
        }
        const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details:
                {
                    name: user.displayName || 'anonymous',
                    email: user.email || 'anonymous'

                }
            }
        }
        )
        if (confirmError) {
            setError(confirmError.message)
            console.log(confirmError)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            })
        }
        if (paymentIntent) {
            setError('')
            console.log(paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                
                    
                        Swal.fire({
                            
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        })

              
            }

        }

    }
    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Name</label>
            <br />
            <input disabled name='name' defaultValue={user.displayName} type="text" id="" />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input disabled type="email" defaultValue={user.email} name="email" id="" />
            <br />
            <label htmlFor="amount">Amount</label>
            <br />
            <input onBlur={handleAmount} type="number" placeholder='Donation Amount' name="amount" id="" className='mb-8' />

            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}>

            </CardElement>
            <Button size='sm' color="blue" className='text-black' type="submit" disabled={!stripe}>
                Pay
            </Button>
        </form>
    );
};

export default CheckOut;