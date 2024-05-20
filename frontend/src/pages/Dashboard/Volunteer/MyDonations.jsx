import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useUser } from '../../../hooks/useUser';
import { Fade, Slide } from "react-awesome-reveal";
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyDonations = () => {
    const [donations, setDonations] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/donations/${currentUser?.email}`)
        .then(res => setDonations(res.data))
        .catch(err => console.log(err))
    }, [isLoading])
    
    const handleFeedback = (id) => {
        const theDonation = donations.find(cls => cls._id === id);
        if (theClass.reason) {
            Swal.fire(
                'Reason For Rejected',
                theDonation.reason,
                'info'
            )
        }
        else {
            Swal.fire(
                'Wow Looks Good',
                'Your donation is approved',
                'success'
            )
        }
    }


    return (
        <div>
            <div className="my-9">
                <h1 className='text-4xl font-bold text-center '>My <span className='text-secondary'>Donations</span></h1>
                <div className="text-center">

                    <Fade duration={100} className='text-[12px]  text-center' cascade>Here you can see how many donations added by you and all donations status</Fade>
                </div>


                <div className="">
                    {
                        donations.length === 0 ? <div className='text-center text-2xl font-bold mt-10'>You have not added any donation yet</div> :
                            <div className="mt-9">
                                {
                                    donations.map((don, index) => <Slide duration={1000} key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
                                        <div className="bg-white flex  rounded-lg gap-8  shadow p-4">
                                            <div className="">
                                                <img className='max-h-[200px] max-w-[300px]' src={don.image} alt="" />
                                            </div>
                                            <div className="w-full">
                                                <h1 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{don.name}</h1>
                                                <div className="flex gap-5">
                                                    <div className="">
                                                        <h1 className='font-bold mb-3'>Some Info : </h1>
                                                        <h1 className='text-secondary my-2'><span className='text-black '>Total Donner</span> : {don.totalEnrolled ? cls.totalEnrolled : 0}</h1>
                                                        <h1 className='text-secondary'><span className='text-black '>Total Donations</span> : {don.AmountCanbeDonations}</h1>
                                                        <h1 className='text-secondary my-2'><span className='text-black '>Status</span> : <span className={`font-bold ${don.status === 'pending' ? 'text-orange-400' : don.status === 'checking' ? 'text-yellow-300' : don.status === 'approved' ? 'text-green-500' : 'text-red-600'}`}>{don.status}</span></h1>
                                                    </div>
                                                    <div className="">
                                                        <h1 className='font-bold mb-3'>.....</h1>
                                                        <h1 className='text-secondary my-2'><span className='text-black '>Price</span> : {don.price} <span className='text-black'>$</span></h1>
                                                        <h1 className='text-secondary my-2'><span className='text-black '>Submitted</span> : <span className=''>{don.submitted ? moment(don.submitted).format('MMMM Do YYYY') : 'Not Get Data'}</span></h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Slide>)}
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MyDonations