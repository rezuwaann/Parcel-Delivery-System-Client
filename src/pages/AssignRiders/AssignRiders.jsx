import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Package, MapPin, ArrowRight, Truck, Bike, Phone, X } from 'lucide-react';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                '/parcels?parcelStatus=pendingPickup&paymentStatus=paid'
            );
            return res.data;
        },
    });

    const { data: riders = [], isLoading: ridersLoading } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders?district=${selectedParcel.senderDistrict}&workStatus=Available`
            );
            return res.data;
        },
    });

    const assignRiderMutation = useMutation({
        mutationFn: async ({ rider }) => {
            const assignInfo = {
                parcelId: selectedParcel._id,
                riderId: rider._id,
                riderName: rider.name,
                riderPhone: rider.phone,
            };
            const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}`, assignInfo);
            return res.data;
        },
        onSuccess: (data, { rider }) => {
            if (data.modifiedCount) {
                queryClient.invalidateQueries({ queryKey: ['parcels', 'pending-pickup'] });
                queryClient.invalidateQueries({ queryKey: ['riders'] });
                closeModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Rider Assigned',
                    text: `${rider.name} has been assigned to this parcel.`,
                    confirmButtonColor: '#7C3AED',
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Assignment failed',
                text: 'Please try again.',
                confirmButtonColor: '#7C3AED',
            });
        },
    });

    const openModal = (parcel) => {
        setSelectedParcel(parcel);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedParcel(null);
    };

    const handleAssign = (rider) => {
        Swal.fire({
            title: `Assign ${rider.name}?`,
            text: `This will assign the parcel to ${rider.name} for pickup.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#7C3AED',
            cancelButtonColor: '#6B6478',
            confirmButtonText: 'Assign',
        }).then((result) => {
            if (result.isConfirmed) {
                assignRiderMutation.mutate({ rider });
            }
        });
    };

    return (
        <div className='mx-auto space-y-6'>
            {/* Header */}
            <div className='space-y-2'>
                <span className='inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest'>
                    Dispatch
                </span>
                <h1 className='text-3xl md:text-4xl font-bold text-[#1E1B2E]'>
                    Assign Riders
                </h1>
                <p className='text-[#6B6478]'>
                    Paid parcels waiting for pickup. Assign an available rider to each one.
                </p>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className='rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]'>
                    Loading pending parcels...
                </div>
            )}

            {/* Empty state */}
            {!isLoading && parcels.length === 0 && (
                <div className='rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3'>
                    <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0FE]'>
                        <Package className='h-6 w-6 text-[#7C3AED]' />
                    </div>
                    <h3 className='font-bold text-[#1E1B2E]'>No pending pickups</h3>
                    <p className='text-sm text-[#6B6478]'>
                        Paid parcels waiting for a rider will show up here.
                    </p>
                </div>
            )}

            {/* Parcels — desktop table */}
            {!isLoading && parcels.length > 0 && (
                <div className='hidden md:block rounded-3xl border border-[#EDE9FE] bg-white overflow-hidden shadow-[0_4px_30px_rgba(124,58,237,0.08)]'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='bg-[#FAF8FF] text-left text-[#6B6478] uppercase text-xs tracking-wide'>
                                <th className='px-6 py-4 font-semibold'>Parcel</th>
                                <th className='px-6 py-4 font-semibold'>From</th>
                                <th className='px-6 py-4 font-semibold'>To</th>
                                <th className='px-6 py-4 font-semibold'>Tracking ID</th>
                                <th className='px-6 py-4 font-semibold text-right'>Cost</th>
                                <th className='px-6 py-4 font-semibold text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr
                                    key={parcel._id}
                                    className='border-t border-[#EEEAF6] hover:bg-[#FAF8FF] transition-colors'
                                >
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-2 font-semibold text-[#1E1B2E]'>
                                            <Package className='h-4 w-4 text-[#7C3AED] shrink-0' />
                                            {parcel.parcelName}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-[#6B6478]'>
                                        {parcel.senderDistrict}, {parcel.senderRegion}
                                    </td>
                                    <td className='px-6 py-4 text-[#6B6478]'>
                                        {parcel.recieverDistrict}, {parcel.recieverRegion}
                                    </td>
                                    <td className='px-6 py-4 font-mono text-xs text-[#6B6478]'>
                                        {parcel.trackingId}
                                    </td>
                                    <td className='px-6 py-4 text-right font-bold text-[#7C3AED]'>
                                        ৳{parcel.cost}
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button
                                            onClick={() => openModal(parcel)}
                                            className='inline-flex items-center gap-1.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 text-xs font-semibold'
                                        >
                                            <Truck className='h-3.5 w-3.5' />
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Parcels — mobile cards */}
            {!isLoading && parcels.length > 0 && (
                <div className='md:hidden space-y-4'>
                    {parcels.map((parcel) => (
                        <div
                            key={parcel._id}
                            className='rounded-2xl border border-[#EDE9FE] bg-white p-5 space-y-3'
                        >
                            <div className='flex items-center gap-2 font-bold text-[#1E1B2E]'>
                                <Package className='h-4 w-4 text-[#7C3AED]' />
                                {parcel.parcelName}
                            </div>

                            <div className='flex items-center gap-2 text-xs text-[#6B6478]'>
                                <MapPin className='h-3.5 w-3.5 shrink-0' />
                                <span>{parcel.senderDistrict}</span>
                                <ArrowRight className='h-3 w-3 shrink-0' />
                                <span>{parcel.recieverDistrict}</span>
                            </div>

                            <p className='text-xs text-[#6B6478]'>
                                Tracking ID:{' '}
                                <span className='font-mono text-[#1E1B2E]'>{parcel.trackingId}</span>
                            </p>

                            <div className='flex items-center justify-between pt-3 border-t border-[#EEEAF6]'>
                                <span className='text-lg font-bold text-[#7C3AED]'>৳{parcel.cost}</span>
                                <button
                                    onClick={() => openModal(parcel)}
                                    className='inline-flex items-center gap-1.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 text-xs font-semibold'
                                >
                                    <Truck className='h-3.5 w-3.5' />
                                    Assign Rider
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Assign rider modal */}
            {isModalOpen && selectedParcel && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
                    <div className='w-full max-w-lg bg-white rounded-3xl shadow-xl max-h-[85vh] flex flex-col'>
                        <div className='flex items-start justify-between p-6 border-b border-[#EEEAF6]'>
                            <div>
                                <h3 className='text-lg font-bold text-[#1E1B2E]'>Assign a Rider</h3>
                                <p className='text-xs text-[#6B6478] mt-1'>
                                    {selectedParcel.parcelName} · {selectedParcel.trackingId}
                                </p>
                                <p className='text-xs text-[#6B6478] mt-0.5'>
                                    Pickup from {selectedParcel.senderDistrict}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className='h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F5F0FE] text-[#6B6478]'
                            >
                                <X className='h-4 w-4' />
                            </button>
                        </div>

                        <div className='p-6 space-y-3 overflow-y-auto'>
                            {ridersLoading && (
                                <p className='text-center text-sm text-[#6B6478] py-8'>
                                    Finding available riders...
                                </p>
                            )}

                            {!ridersLoading && riders.length === 0 && (
                                <div className='text-center py-8 space-y-2'>
                                    <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F0FE]'>
                                        <Bike className='h-5 w-5 text-[#7C3AED]' />
                                    </div>
                                    <p className='text-sm font-semibold text-[#1E1B2E]'>
                                        No available riders
                                    </p>
                                    <p className='text-xs text-[#6B6478]'>
                                        No riders are currently available in {selectedParcel.senderDistrict}.
                                    </p>
                                </div>
                            )}

                            {!ridersLoading &&
                                riders.map((rider) => (
                                    <div
                                        key={rider._id}
                                        className='flex items-center justify-between gap-3 border border-[#EDE9FE] rounded-2xl px-4 py-3 hover:border-[#C4B5FD] transition-colors'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div className='h-10 w-10 rounded-full bg-[#F5F0FE] flex items-center justify-center shrink-0'>
                                                <Bike className='h-5 w-5 text-[#7C3AED]' />
                                            </div>
                                            <div>
                                                <p className='font-semibold text-[#1E1B2E] text-sm'>
                                                    {rider.name}
                                                </p>
                                                <p className='text-xs text-[#6B6478] flex items-center gap-1'>
                                                    <Phone className='h-3 w-3' />
                                                    {rider.phone}
                                                </p>
                                                <p className='text-xs text-[#6B6478]'>
                                                    {rider.vehicleType} · {rider.bikeModel}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleAssign(rider)}
                                            disabled={assignRiderMutation.isPending}
                                            className='rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 text-xs font-semibold disabled:opacity-50 shrink-0'
                                        >
                                            Assign
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRiders;