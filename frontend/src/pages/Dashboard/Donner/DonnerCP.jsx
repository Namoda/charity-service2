import React from 'react';
import { useUser } from '../../../hooks/useUser';
import welcome from '../../../assets/dashboard/Uimage.webp';
import { Link } from 'react-router-dom';

const DonnerCP = () => {
    const { currentUser } = useUser();
    return (
        <div className='h-screen flex justify-center items-center bg-red-100'>
            <div className=" bg-red-100 p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <div className="flex justify-center items-center mb-4">
                    <img
                        onContextMenu={e => e.preventDefault()}
                        className='h-[200px] w-auto'
                        placeholder='blur'
                        src={welcome}
                        alt="Welcome"
                    />
                </div>
                <h1 className='text-4xl capitalize font-bold text-center mb-4'>
                    Hi, <span className='text-secondary italic'>{currentUser?.name}</span>! Welcome to your dashboard.
                </h1>
                <p className='text-base text-center mb-4'>
                    Hey Dear, this is a simple dashboard home. Our developer is working on updating the Dashboard.
                </p>
                <h2 className='font-bold text-center mb-4'>You can jump to any page you want from here:</h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link to='/dashboard/enrolled-donation' className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2 text-center">
                        My Enroll
                    </Link>
                    <Link to='/dashboard/my-selected' className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2 text-center">
                        My Selected
                    </Link>
                    <Link to='/dashboard/my-payments' className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2 text-center">
                        Payment History
                    </Link>
                    <Link to='/dashboard/apply-volunteer' className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-4 py-2 text-center">
                        Join as a Volunteer
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DonnerCP;
