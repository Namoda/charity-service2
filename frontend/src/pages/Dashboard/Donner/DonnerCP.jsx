import React from 'react';
import { useUser } from '../../../hooks/useUser';
import welcome from '../../../assets/dashboard/Uimage.webp';
import { Link } from 'react-router-dom';

const DonnerCP = () => {
    const { currentUser } = useUser();
    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-r from-red-200 to-red-100'>
            <div className="bg-white p-10 rounded-lg shadow-xl max-w-3xl w-full animate-fade-in">
                <div className="flex justify-center items-center mb-6">
                    <img
                        onContextMenu={e => e.preventDefault()}
                        className='h-48 w-auto rounded-full shadow-md'
                        src={welcome}
                        alt="Welcome"
                    />
                </div>
                <h1 className='text-4xl font-bold text-center mb-6'>
                    Hi, <span className='text-red-500 italic'>{currentUser?.name}</span>! Welcome to your dashboard.
                </h1>
                <p className='text-lg text-center text-gray-700 mb-6'>
                    Hey Dear, this is a simple dashboard home. Our developer is working on updating the Dashboard.
                </p>
                <h2 className='text-2xl font-semibold text-center mb-6'>You can jump to any page you want from here:</h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link to='/dashboard/enrolled-donation' className="border border-red-500 rounded-lg hover:bg-red-500 hover:text-white duration-200 px-4 py-2 text-center">
                        My Donation
                    </Link>
                    <Link to='/dashboard/my-selected' className="border border-red-500 rounded-lg hover:bg-red-500 hover:text-white duration-200 px-4 py-2 text-center">
                        My Selected
                    </Link>
                    <Link to='/dashboard/my-payments' className="border border-red-500 rounded-lg hover:bg-red-500 hover:text-white duration-200 px-4 py-2 text-center">
                        Payment History
                    </Link>
                    <Link to='/dashboard/apply-volunteer' className="border border-red-500 rounded-lg hover:bg-red-500 hover:text-white duration-200 px-4 py-2 text-center">
                        Join as a Volunteer
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DonnerCP;
