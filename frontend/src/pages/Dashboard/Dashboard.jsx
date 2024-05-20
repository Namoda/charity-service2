import React from 'react';
import { useUser } from '../../hooks/useUser';

import { ClimbingBoxLoader, ClockLoader} from 'react-spinners';
import DashboardNavigate from '../../../routes/DashboardNavigate';
const Dashboard = () => {


   const { currentUser, isLoading } = useUser();

   const role = currentUser?.role;


    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>
        <ClockLoader color="#36d7b7" 
         size={50}
         />
    </div>
    }
    return (
    <div>
        <DashboardNavigate/>
    </div>

    )
};

export default Dashboard;