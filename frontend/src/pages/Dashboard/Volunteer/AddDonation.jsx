import React, { useRef, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddDonation = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [image, setImage] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = Object.fromEntries(formData);
        formData.append('file', image);

        toast.promise(
            fetch(API_URL, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.success === true) {
                        console.log(data.data.display_url);
                        newData.image = data.data.display_url;
                        newData.volunteerName = currentUser.name;
                        newData.volunteerEmail = currentUser.email;
                        newData.status = 'pending';
                        newData.submitted = new Date(); 
                        newData.totalEnrolled = 0;
                        axiosSecure.post('/new-donation' , newData)
                        .then(res => {
                            console.log(res.data);
                        });
                    }
                }),
            {
                pending: 'Submitting your donation...',
                success: 'Submitted successfully!',
                error: 'Failed to submit your donation',
            }
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-700">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-secondary">Add Your Donation</h1>
            </div>

            <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Donation Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            type="text"
                            required
                            placeholder="Your Donation Name"
                            name="name"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                            Thumbnail Photo
                        </label>
                        <input
                            type="file"
                            required
                            onChange={handleImageChange}
                            name="image"
                            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-red-400"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="volunteerName">
                            Volunteer Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
                            type="text"
                            value={currentUser?.name}
                            readOnly
                            disabled
                            name="volunteerName"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="volunteerEmail">
                            Volunteer Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary"
                            type="email"
                            value={currentUser?.email}
                            readOnly
                            disabled
                            name="volunteerEmail"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="AmountCanbeDonations">
                            Amount Can Be Donations
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            type="number"
                            required
                            placeholder="How to Donate?"
                            name="AmountCanbeDonations"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            type="number"
                            required
                            placeholder="How much can be donated?"
                            name="price"
                        />
                    </div>
                </div>
              
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                        Description About Your Donation
                    </label>
                    <textarea
                        className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Description about your course"
                        name="description"
                        rows="4"
                    ></textarea>
                </div>
                <div className="text-center">
                    <button
                        className="w-full px-4 py-2 bg-secondary text-white font-bold rounded-md hover:bg-red-400 transition duration-200"
                        type="submit"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDonation;
