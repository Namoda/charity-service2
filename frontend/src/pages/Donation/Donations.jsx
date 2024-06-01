import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useUser } from '../../hooks/useUser';

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const { currentUser } = useUser();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosFetch.get('/donations')
            .then(res => setDonations(res.data))
            .catch(err => console.error(err));
    }, [axiosFetch]);

    const handleSelect = (id, amount) => {
        if (!currentUser) {
            return alert("Please Login First!");
        }

        if (amount < 1) {
            return alert('No seats available');
        }

        axiosSecure.get(`/enrolled-donations/${currentUser.email}`)
            .then(res => {
                if (res.data.find(item => item.donations._id === id)) {
                    return alert('Already Select');
                } else {
                    const data = {
                        donationId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    };

                    toast.promise(
                        axiosSecure.post('/add-to-cart', data)
                            .then(() => {
                                setDonations(prevDonations => prevDonations.map(donation => {
                                    if (donation._id === id) {
                                        return {
                                            ...donation,
                                            AmountCanbeDonations: donation.AmountCanbeDonations - 1
                                        };
                                    }
                                    return donation;
                                }));
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
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center text-black mb-10 my-24">Donations</h1>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {donations.map(donation => (
                        <div key={donation._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={donation.image} alt="Donation" className="object-cover w-full h-56" />
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-2">{donation.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">Available Donations: <span className="text-[#f59e0b]">{donation.AmountCanbeDonations}</span></p>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-500 font-semibold">${donation.price}</span>
                                    <button
                                        onClick={() => handleSelect(donation._id, donation.AmountCanbeDonations)}
                                        disabled={!currentUser || donation.AmountCanbeDonations < 1}
                                        className={`px-4 py-2 text-white bg-${donation.AmountCanbeDonations < 1 ? 'gray' : 'secondary'} rounded hover:bg-red-700 disabled:bg-red-300`}
                                    >
                                        {donation.AmountCanbeDonations < 1 ? 'No seats available' : 'Select'}
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <Link to={`/donations/${donation._id}`}>
                                    <button className="px-4 py-2 w-full text-white bg-secondary rounded hover:bg-red-400">
                                        View Details
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
