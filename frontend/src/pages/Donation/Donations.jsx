import React, { useContext,useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
const Donations = () => {

    const [hoveredCard, setHoveredCard] = useState(null);
    const { currentUser } = useUser();
   // console.log(currentUser)
    const role = currentUser?.role;
    const [enrolledDonations, setEnrolledDonations] = useState([]);

    const handleHover = (index) => {
        setHoveredCard(index);
    };

    const [donations, setDonations] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosFetch.get('/donations')
            .then(res => setDonations(res.data))
            .catch(err => console.log(err))
    }, [])
//handle add to cart
    const handelSelect = (id) => {
    //   console.log(id)
    axiosSecure
    .get(`/enrolled-donations/${currentUser?.email}`)
    .then(res => setEnrolledDonations(res.data))
    .catch(err => console.log(err));

            if(!currentUser){
                return alert("please Login First!")
            }

            axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
            .then(res => {
                if (res.data.donationId === id) {
                    return alert('Already Selected');
                }
                else if (enrolledDonations.find(item => item.donations._id === id)) {
                    return alert('Already Enrolled');
                }
                else {
                    const data = {
                        donationId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    }
                    
                  
                }
            })
    }


    return (
        <div>

            <div className="mt-20 pt-3">
                <h1 className="text-4xl font-bold text-center text-dark-primary">Donations</h1>
            </div>


            <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {donations.map((don, index) => (
                    <div
                        key={index}
                        className={`relative hover:-translate-y-2  duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[350px] mx-auto ${don.AmountCanbeDonations < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => handleHover(null)}
                    >
                        <div className="relative h-48">
                            <div
                                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''
                                    }`}
                            />
                            <img
                                src={don.image}
                                alt="Dorneer Image"
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

                                    <button onClick={() => handelSelect(don._id)} title={role === 'admin' || role === 'volunteers' ? 'Volunteers/Admin Can not be able to select ' ? don.AmountCanbeDonations <1 : 'No seat avalible' : 'You can select this donations' } disabled={role === 'admin' || role === 'volunteers' || don.AmountCanbeDonations < 1} className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                                        Select
                                    </button>

                                </div>
                            </Transition>
                        </div>
                        <div className="px-6 py-2">
                            <h3 className={`${don.name.length > 25 ? 'text-[14px]' : 'text-[16px]'}  font-bold`}>{don.name}</h3>
                            <p className="text-gray-500 text-xs">Volunteers : {don.volunteersName}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-gray-600 text-xs">Amount Can be Donations: <span className='text-secondary'>{don.AmountCanbeDonations}</span> </span>
                                <span className="text-green-500 font-semibold">${don.price}</span>
                            </div>
                            
                            <Link to={`/donations/${don._id}`}><button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">
                                        View
                                    </button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Donations;
