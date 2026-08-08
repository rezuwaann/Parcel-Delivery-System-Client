import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    const handleDelete = (id) => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result)

            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {

                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            })
                        };
                    })
            } else {
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your parcel request was not deleted.",
                    icon: "error"
                })
            }


        });
    }


    const handlePayment = async (parcel) => {
        const paymentInfo = {
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            cost: parcel.cost,
            parcelName: parcel.parcelName
        }
        console.log(paymentInfo)

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url;
    }

    console.log(parcels)
    return (
        <div>
            <div className="flex items-center justify-between mx-5 mt-5 mb-3">
                <h2 className="font-semibold text-2xl md:text-3xl">
                    Total Parcels
                    <span className="ml-2 text-[#7C3AED]">({parcels.length})</span>
                </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-base-200 shadow-sm">
                <table className="table table-zebra">
                    <thead className="bg-base-200 text-sm uppercase tracking-wide">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>Delivery Status Status</th>
                            <th>Created</th>
                            <th className="">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-400 font-medium">
                                    No parcels found.
                                </td>
                            </tr>
                        ) : (
                            parcels.map((p, index) => (
                                <tr key={index} className="text-base hover:bg-base-100/60 transition-colors">
                                    <th className="text-gray-400">{index + 1}</th>

                                    <td className="font-medium">{p.parcelName}</td>

                                    <td>
                                        <span>{p.parcelWeight} kg</span>
                                    </td>

                                    <td className="font-semibold ">
                                        {p.cost}
                                    </td>


                                    <td>
                                        {p.paymentStatus === 'paid' ?
                                            <button className="btn bg-[#7C3AED] text-white">Paid</button>
                                            :
                                            <button onClick={() => handlePayment(p)} className="btn bg-red-500 text-white">Pay</button>

                                        }
                                    </td>

                                    <td>
                                        {p.deliveryStatus === 'delivered' ?
                                            <button className="btn bg-[#7C3AED] text-white">Delivered</button>
                                            : <button className="btn bg-black text-white">Not Delivered</button>
                                        }
                                    </td>


                                    <td className="text-gray-500">
                                        {new Date(p.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div className="">
                                            <button
                                                title="Edit"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                            >
                                                <FiEdit size={16} />
                                            </button>

                                            <button
                                                title="View"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                            >
                                                <FaMagnifyingGlass size={14} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                title="Delete"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <FaTrashCan size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;