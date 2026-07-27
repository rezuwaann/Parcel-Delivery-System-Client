import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyParcels = () => {
const {}=useAuth;
    const {}=useQuery({
        queryKey:['myParcels']
    })
    return (
        <div>
            hi
        </div>
    );
};

export default MyParcels;