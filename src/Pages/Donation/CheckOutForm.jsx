import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [secret, setClientSecret] = useState('')
    const [error, setError] = useState('')
    // useEffect(() => {
    //     axiosSecure.post('/create-payment-intent', { price: 43 })
    //         .then(res => {
    //             console.log(res.data)
    //             setClientSecret(res.data.clientSecret)
    //         })

    // }, [])

    const handleSubmit = async event => {
        event.preventDefault()
        const amount = event.target.amount.value
        console.log(amount)
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)

            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }


    }
    return (
        <div>
            <h2 className="text-3xl text-center my-8 font-bold text-[#333333]">Donation Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="donationAmount">Donation Amount</label>
                <Input size="md" name="amount" placeholder="Enter Donation Amount" className=" mb-4" />
                <CardElement
                    className="mt-4"
                    options={{
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
                    }}
                />

                <button type="submit" disabled={!stripe} className="text-white bg-blue-500 rounded-md px-4 mt-4 py-2 border-none">Pay</button>
                
                <p className="text-red-400">{error}</p>

            </form>
        </div>

    );
};

export default CheckOutForm;