import React from 'react'
import { useUser } from '../src/hooks/useUser';
import { Navigate } from 'react-router-dom';

const DashboardNavigate = () => {
    const {currentUser , isloading} = useUser();
    const role =currentUser?.role;
    if(isloading) {
       
        return <div>Loading...</div>
    }
 if(role === 'admin') return <Navigate to="/dashboard/admin-home" replace/>
 if(role === 'volunteer') return <Navigate to="/dashboard/volunteer-cp" replace/>
 if(role === 'user') return <Navigate to="/dashboard/donner-cp" replace/>
}

export default DashboardNavigate
