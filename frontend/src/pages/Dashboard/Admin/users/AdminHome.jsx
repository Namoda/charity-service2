import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import AdminStats from './AdminStats';
import { Fade } from "react-awesome-reveal";
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import image1 from '../../../../assets/dashboard/donation.gif';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosFetch = useAxiosFetch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosFetch('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Fade delay={1e3} cascade damping={1e-1}>
                <h1 className='text-4xl font-bold my-7'>Welcome Back, <span className='text-secondary'>{user?.displayName}</span></h1>
                <AdminStats users={users} />
                <div className='flex justify-center items-center'>
                    <img src={image1} alt="Dashboard" />
                </div>
            </Fade>
        </div>
    );
};

export default AdminHome;
