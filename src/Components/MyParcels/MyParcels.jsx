import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    const handleDelete = (e, id) => {
        e.stopPropagation(); // don't trigger row navigation
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

    const handlePayment = async (e, parcel) => {
        e.stopPropagation(); // don't trigger row navigation
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

    const goToDetails = (id) => {
        navigate(`/dashboard/my-parcels/${id}`);
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

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-base-200 shadow-sm">
                <table className="table table-zebra">
                    <thead className="bg-base-200 text-base uppercase tracking-wide">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>Delivery Status Status</th>
                            <th>Tracking Id</th>
                            <th>Created</th>
                            <th className="">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-10 text-gray-400 font-medium text-lg">
                                    No parcels found.
                                </td>
                            </tr>
                        ) : (
                            parcels.map((p, index) => (
                                <tr
                                    key={index}
                                    onClick={() => goToDetails(p._id)}
                                    className="text-base hover:bg-base-100/60 transition-colors cursor-pointer"
                                >
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
                                            <button className="btn bg-[#7C3AED] text-white" onClick={(e) => e.stopPropagation()}>Paid</button>
                                            :
                                            <button onClick={(e) => handlePayment(e, p)} className="btn bg-red-500 text-white">Pay</button>
                                        }
                                    </td>

                                    <td>
                                        {p.paymentStatus !== 'paid' && (
                                            <span className="badge bg-black text-white">Payment Pending</span>
                                        )}

                                        {p.paymentStatus === 'paid' && p.parcelStatus === 'pendingPickup' && (
                                            <span className="badge bg-gray-400 text-white">Pickup Pending</span>
                                        )}
                                        {p.parcelStatus === 'rider-assigned' && (
                                            <span className="badge bg-blue-500 text-white">Rider Assigned</span>
                                        )}
                                        {p.parcelStatus === 'picked-up' && (
                                            <span className="badge bg-indigo-500 text-white">Picked Up</span>
                                        )}
                                        {p.parcelStatus === 'in-transit' && (
                                            <span className="badge bg-[#7C3AED] text-white">In Transit</span>
                                        )}
                                        {p.parcelStatus === 'delivered' && (
                                            <span className="badge bg-green-600 text-white">Delivered</span>
                                        )}
                                        {p.parcelStatus === 'failed-attempt' && (
                                            <span className="badge bg-red-500 text-white">Delivery Failed</span>
                                        )}
                                    </td>

                                    <td>
                                        {p.trackingId ?
                                            <p className='font-semibold'>  {p.trackingId}</p> : <p>Payment Not Completed</p>}
                                    </td>

                                    <td className="text-gray-500">
                                        {new Date(p.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div className="">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(e, p._id); }}
                                                title="Delete"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <FaTrashCan size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4 mx-5">
                {parcels.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 font-medium text-lg rounded-xl border border-base-200">
                        No parcels found.
                    </div>
                ) : (
                    parcels.map((p, index) => (
                        <div
                            key={index}
                            onClick={() => goToDetails(p._id)}
                            className="rounded-xl border border-base-200 shadow-sm p-4 space-y-3 text-base cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">#{index + 1}</p>
                                    <p className="font-medium">{p.parcelName}</p>
                                </div>
                                <p className="font-semibold text-[#7C3AED]">{p.cost}</p>
                            </div>

                            <div className="flex items-center justify-between text-base">
                                <span className="text-gray-500">{p.parcelWeight} kg</span>
                                <span className="text-gray-500">
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {p.paymentStatus === 'paid' ?
                                    <button className="btn btn-sm bg-[#7C3AED] text-white" onClick={(e) => e.stopPropagation()}>Paid</button>
                                    :
                                    <button onClick={(e) => handlePayment(e, p)} className="btn btn-sm bg-red-500 text-white">Pay</button>
                                }

                                {p.parcelStatus === 'delivered' ?
                                    <button className="btn btn-sm bg-[#7C3AED] text-white" onClick={(e) => e.stopPropagation()}>Delivered</button>
                                    : <button className="btn btn-sm bg-black text-white" onClick={(e) => e.stopPropagation()}>Not Delivered</button>
                                }
                            </div>

                            <div className="flex items-center justify-end gap-1 pt-2 border-t border-base-200">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(e, p._id); }}
                                    title="Delete"
                                    className="btn btn-sm btn-square btn-ghost hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <FaTrashCan size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyParcels;