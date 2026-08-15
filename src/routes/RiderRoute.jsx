import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../Components/Forbidden/Forbidden';

const RiderRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    

    if (loading||!user || roleLoading) {
        return <Loading></Loading>;
    }

    if (role !== 'rider') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default RiderRoute;