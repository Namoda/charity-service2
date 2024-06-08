import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useUser } from '../../../../hooks/useUser';
import jsPDF from 'jspdf';

const CheckoutPayment = ({ price, cartItm }) => {
    const URL = `http://localhost:3000/payment-info?${cartItm && `donationId=${cartItm}`}`;
    console.log(URL);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState([]);

    // Return the amount is less than 0 or not provided
    if (price < 0 || !price) {
        return <Navigate to="/dashboard/my-selected" replace />;
    }

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`)
            .then((res) => {
                // SET donations ID IN STATE
                const donationsId = res.data.map(item => item._id);
                setCart(donationsId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
                console.log(res.data);
            });
    }, []);

    const handleSubmit = async (event) => {
        setMessage('');
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setMessage(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: currentUser.name || 'Unknown',
                        email: currentUser.email || 'Anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            console.log('[error]', confirmError);
            setMessage(confirmError.message);
        }
        else {
            console.log('[PaymentIntent]', paymentIntent);

            // PAYMENT LOGIC HERE WHEN PAYMENT IS SUCCESSFUL
            if (paymentIntent.status === 'succeeded') {
                const transactionId = paymentIntent.id;
                const paymentMethod = paymentIntent.payment_method;
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency;
                const paymentStatus = paymentIntent.status;
                const userName = currentUser.name;
                const userEmail = currentUser.email;
                const data = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userEmail,
                    donationsId: cartItm ? [cartItm] : cart,
                    date: new Date()
                };

                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId && res.updatedResult.modifiedCount > 0) {
                            setSucceeded('Payment Successful, Thank You for Your Donation!');

                            // Generate PDF
                            const doc = new jsPDF();
                            doc.text("Payment Receipt", 20, 10);
                            doc.text(`Transaction ID: ${transactionId}`, 20, 20);
                            doc.text(`Payment Method: ${paymentMethod}`, 20, 30);
                            doc.text(`Amount: ${amount} ${currency.toUpperCase()}`, 20, 40);
                            doc.text(`Status: ${paymentStatus}`, 20, 50);
                            doc.text(`Name: ${userName}`, 20, 60);
                            doc.text(`Email: ${userEmail}`, 20, 70);
                            doc.text(`Date: ${new Date().toLocaleString()}`, 20, 80);
                            doc.save('receipt.pdf');
                        }
                        else {
                            setSucceeded('Payment Failed, Please try again');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };

    return (
        <>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Payment Amount: <span className='text-secondary'>{price}$</span></h1>
            </div>
            <form onSubmit={handleSubmit}>
                <CardElement
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
                <button type="submit" disabled={!stripe || !clientSecret || isLoading} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Pay
                </button>
                {message && <p className="text-red-500">{message}</p>}
                {succeeded && <p className="text-green-500">{succeeded}</p>}
            </form>
        </>
    );
};

export default CheckoutPayment;
