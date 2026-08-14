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

    // unique, stable id for a parcel's modal — falls back to index only if _id is missing
    const modalId = (p, index) => `my_modal_${p._id ?? index}`;

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
                                                onClick={() => document.getElementById(modalId(p, index)).showModal()}
                                                title="View"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                            >
                                                <FaMagnifyingGlass size={16} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(p._id)}
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
                            className="rounded-xl border border-base-200 shadow-sm p-4 space-y-3 text-base"
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
                                    <button className="btn btn-sm bg-[#7C3AED] text-white">Paid</button>
                                    :
                                    <button onClick={() => handlePayment(p)} className="btn btn-sm bg-red-500 text-white">Pay</button>
                                }

                                {p.deliveryStatus === 'delivered' ?
                                    <button className="btn btn-sm bg-[#7C3AED] text-white">Delivered</button>
                                    : <button className="btn btn-sm bg-black text-white">Not Delivered</button>
                                }
                            </div>

                            <div className="flex items-center justify-end gap-1 pt-2 border-t border-base-200">
                                <button
                                    onClick={() => document.getElementById(modalId(p, index)).showModal()}
                                    title="View"
                                    className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                >
                                    <FaMagnifyingGlass size={16} />
                                </button>

                                <button
                                    onClick={() => handleDelete(p._id)}
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

            {/* Modals — rendered ONCE per parcel, outside the hidden/visible split above,
                so a hidden ancestor on either breakpoint never blocks it from opening */}
            {parcels.map((p, index) => (
                <dialog key={modalId(p, index)} id={modalId(p, index)} className="modal">
                    <div className="modal-box max-w-xl p-0 overflow-hidden rounded-3xl">
                        {/* Header — route line */}
                        <div className="px-6 pt-6 pb-5 md:px-8">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-[#6B6478] hover:bg-[#F5F0FE] hover:text-[#7C3AED]">
                                    ✕
                                </button>
                            </form>

                            <div className="flex items-center justify-between pr-8">
                                <div>
                                    <span className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
                                        {p.parcelType}
                                    </span>
                                    <h3 className="mt-1 text-2xl font-bold text-[#1E1B2E]">{p.parcelName}</h3>
                                </div>
                                {p.paymentStatus === 'paid' ? (
                                    <span className="shrink-0 rounded-full bg-[#EDE9FE] text-[#7C3AED] px-3 py-1 text-sm font-semibold">
                                        Paid
                                    </span>
                                ) : (
                                    <span className="shrink-0 rounded-full bg-red-50 text-red-500 px-3 py-1 text-sm font-semibold">
                                        Payment due
                                    </span>
                                )}
                            </div>

                            {/* Route */}
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-semibold text-[#1E1B2E] truncate">{p.senderRegion}</p>
                                    <p className="text-sm text-[#6B6478]">Pickup</p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 px-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                                    <span className="h-px w-8 bg-[#DCD3F5]" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#14121F]" />
                                </div>
                                <div className="flex-1 min-w-0 text-right">
                                    <p className="text-base font-semibold text-[#1E1B2E] truncate">{p.recieverRegion}</p>
                                    <p className="text-sm text-[#6B6478]">Drop-off</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#EEEAF6]" />

                        {/* Body */}
                        <div className="max-h-[60vh] overflow-y-auto px-6 py-6 md:px-8 space-y-6 bg-white">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Sender */}
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-3">
                                        Sender
                                    </h4>
                                    <div className="space-y-2 text-base">
                                        <p className="font-semibold text-[#1E1B2E]">{p.senderName}</p>
                                        <p className="text-[#6B6478]">{p.senderEmail}</p>
                                        <p className="text-[#6B6478]">{p.senderPhone}</p>
                                        <p className="text-[#6B6478]">
                                            {p.senderAddress}
                                            {p.senderDistrict ? `, ${p.senderDistrict}` : ''}, {p.senderRegion}
                                        </p>
                                    </div>
                                    {p.pickupInstruction && (
                                        <p className="mt-3 text-sm text-[#6B6478] border-l-2 border-[#DCD3F5] pl-3">
                                            {p.pickupInstruction}
                                        </p>
                                    )}
                                </div>

                                {/* Receiver */}
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-3">
                                        Receiver
                                    </h4>
                                    <div className="space-y-2 text-base">
                                        <p className="font-semibold text-[#1E1B2E]">{p.recieverName}</p>
                                        <p className="text-[#6B6478]">{p.recieverPhone}</p>
                                        <p className="text-[#6B6478]">
                                            {p.recieverAddress}
                                            {p.recieverDistrict ? `, ${p.recieverDistrict}` : ''}, {p.recieverRegion}
                                        </p>
                                    </div>
                                    {p.deliveryInstruction && (
                                        <p className="mt-3 text-sm text-[#6B6478] border-l-2 border-[#DCD3F5] pl-3">
                                            {p.deliveryInstruction}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Meta row */}
                            <div className="grid grid-cols-3 gap-4 rounded-2xl bg-[#FAF8FF] border border-[#EDE9FE] px-5 py-4">
                                <div>
                                    <p className="text-sm text-[#6B6478]">Weight</p>
                                    <p className="mt-0.5 font-semibold text-[#1E1B2E]">{p.parcelWeight} kg</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B6478]">Booked</p>
                                    <p className="mt-0.5 font-semibold text-[#1E1B2E]">
                                        {new Date(p.createdAt).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B6478]">Cost</p>
                                    <p className="mt-0.5 font-bold text-[#7C3AED]">{p.cost} TK</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end border-t border-[#EEEAF6] px-6 py-4 md:px-8">
                            <form method="dialog">
                                <button className="btn border border-[#DCD3F5] bg-white text-[#1E1B2E] hover:border-[#7C3AED] hover:text-[#7C3AED]">
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            ))}
        </div>
    );
};

export default MyParcels;