import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery(
        {
            queryKey: ['parcels', parcelId],
            queryFn: async () => {
                const res = await axiosSecure.get(`/parcels/${parcelId}`)
                return res.data;
            }
        }
    )
    console.log(parcel)

    if (isLoading) {
        return <Loading></Loading>;
    }

    const handlePayment = async () => {
        const paymentInfo = {
            parcelId:parcel._id,
            senderEmail:parcel.senderEmail,
            cost:parcel.cost,
            parcelName:parcel.parcelName
        }
        console.log(paymentInfo)

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.href=res.data.url;
    }
    return (
        <div>

            Payment for: : {parcel.parcelName}
            <button onClick={handlePayment} className="btn btn-secondary">Pay</button>
        </div>
    );
};

export default Payment;