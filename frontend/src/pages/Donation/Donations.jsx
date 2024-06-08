import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Donations = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledDonations, setEnrolledDonations] = useState([]);
    const [donations, setDonations] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosFetch.get('/donations')
            .then(res => setDonations(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleHover = (index) => {
        setHoveredCard(index);
    };

    const handleSelect = (id) => {
        axiosSecure.get(`/enrolled-donations/${currentUser?.email}`)
            .then(res => setEnrolledDonations(res.data))
            .catch(err => console.log(err));

        if (!currentUser) {
            return alert("Please Login First!");
        }

        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
            .then(res => {
                if (res.data.donationId === id) {
                    return alert('Already Selected');
                } else if (enrolledDonations.find(item => item.donations._id === id)) {
                    return alert('Already Enrolled');
                } else {
                    const data = {
                        donationId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    };

                    toast.promise(
                        axiosSecure.post('/add-to-cart', data)
                            .then(res => {
                                console.log(res.data);
                            }),
                        {
                            pending: 'Selecting...',
                            success: 'Selected Successfully!',
                            error: {
                                render({ data }) {
                                    return `Error: ${data.message}`;
                                }
                            }
                        }
                    );
                }
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-black mb-10 my-24">Donations</h1>
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {donations.map((don, index) => (
                        <div
                            key={index}
                            className={`relative transform transition-transform duration-300 hover:scale-105 bg-white rounded-lg shadow-lg overflow-hidden ${don.AmountCanbeDonations < 1 ? 'bg-red-300' : 'bg-white'}`}
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(null)}
                        >
                            <div className="relative h-48">
                                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''}`} />
                                <img
                                    src={don.image}
                                    alt="Donor Image"
                                    className="object-cover w-full h-full"
                                />
                                <Transition
                                    show={hoveredCard === index}
                                    enter="transition-opacity duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => handleSelect(don._id)}
                                            title={role === 'admin' || role === 'volunteers' ? 'Volunteers/Admin cannot select' : don.AmountCanbeDonations < 1 ? 'No seats available' : 'You can select this donation'}
                                            disabled={role === 'admin' || role === 'volunteers' || don.AmountCanbeDonations < 1}
                                            className="px-4 py-2 text-white bg-secondary rounded hover:bg-red-700 disabled:bg-red-300">
                                            Select
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                            <div className="p-6">
                                <h3 className={`font-bold ${don.name.length > 25 ? 'text-sm' : 'text-lg'}`}>{don.name}</h3>
                                <p className="text-gray-500 text-xs">Volunteers: {don.volunteersName}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-gray-600 text-xs">Available Donations: <span className="text-[#f59e0b]">{don.AmountCanbeDonations}</span></span>
                                    <span className="text-green-500 font-semibold">${don.price}</span>
                                </div>
                                <Link to={`/donations/${don._id}`}>
                                    <button className="px-4 py-2 mt-4 w-full text-white bg-secondary rounded hover:bg-red-400">
                                        View
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Donations;
