import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Package, MapPin, User, Phone, Navigation, Truck, PackageCheck, PackageX, X, Copy, Check } from 'lucide-react';

const STEP_ORDER = ['rider-assigned', 'picked-up', 'in-transit', 'delivered'];

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'delivered'
    const [callModalParcel, setCallModalParcel] = useState(null); // holds the parcel whose number is being shown
    const [copied, setCopied] = useState(false);

    const { data: rider = {}, isLoading: isRiderLoading } = useQuery({
        queryKey: ['rider', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?email=${user?.email}`);
            return res.data[0] || {};
        }
    });

    const { data: deliveries = [], isLoading: isDeliveriesLoading } = useQuery({
        queryKey: ['deliveries', rider?._id],
        enabled: !!rider?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?riderId=${rider._id}`);
            return res.data;
        }
    });

    const isLoading = isRiderLoading || isDeliveriesLoading;

    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/parcels/${id}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['deliveries', rider?._id] });
        }
    });

    const handleStatusUpdate = (id, status) => {
        statusMutation.mutate({ id, status });
    };

    const isButtonPending = (id, status) =>
        statusMutation.isPending &&
        statusMutation.variables?.id === id &&
        statusMutation.variables?.status === status;

    const filteredDeliveries = deliveries.filter(parcel => {
        if (filter === 'pending') {
            return parcel.parcelStatus !== 'delivered' && parcel.parcelStatus !== 'failed-attempt';
        }
        if (filter === 'delivered') {
            return parcel.parcelStatus === 'delivered';
        }
        return true;
    });

    const pendingCount = deliveries.filter(
        p => p.parcelStatus !== 'delivered' && p.parcelStatus !== 'failed-attempt'
    ).length;
    const deliveredCount = deliveries.filter(p => p.parcelStatus === 'delivered').length;

    const filterTabs = [
        { key: 'all', label: 'All', count: deliveries.length },
        { key: 'pending', label: 'Pending', count: pendingCount },
        { key: 'delivered', label: 'Delivered', count: deliveredCount },
    ];

    // 5. Call Receiver modal handlers
    const openCallModal = (parcel) => {
        setCopied(false);
        setCallModalParcel(parcel);
    };

    const closeCallModal = () => {
        setCallModalParcel(null);
        setCopied(false);
    };

    const handleCopyNumber = async () => {
        if (!callModalParcel?.recieverPhone) return;
        try {
            await navigator.clipboard.writeText(callModalParcel.recieverPhone);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    return (
        <div className="mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <span className="inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                    My Deliveries
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1E1B2E]">
                    Assigned Deliveries
                </h1>
                <p className="text-[#6B6478]">
                    View all parcels currently assigned to you for delivery.
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {filterTabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                            filter === tab.key
                                ? 'bg-[#7C3AED] text-white'
                                : 'bg-[#F5F0FE] text-[#7C3AED] hover:bg-[#EDE9FE]'
                        }`}
                    >
                        {tab.label}
                        <span
                            className={`px-1.5 py-0.5 rounded-md text-xs ${
                                filter === tab.key ? 'bg-white/20' : 'bg-white'
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {isLoading && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]">
                    Loading your assigned deliveries...
                </div>
            )}

            {!isLoading && filteredDeliveries.length === 0 && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0FE]">
                        <Package className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="font-bold text-[#1E1B2E]">
                        {filter === 'all' ? 'No assigned deliveries' : `No ${filter} deliveries`}
                    </h3>
                    <p className="text-sm text-[#6B6478]">
                        {filter === 'all'
                            ? "You don't have any parcels assigned to you at the moment."
                            : `You don't have any ${filter} parcels right now.`}
                    </p>
                </div>
            )}

            {!isLoading && filteredDeliveries.length > 0 && (
                <div className="space-y-6">
                    {filteredDeliveries.map(parcel => {
                        const currentIndex = STEP_ORDER.indexOf(parcel.parcelStatus);
                        const isDelivered = parcel.parcelStatus === 'delivered';
                        const isFailed = parcel.parcelStatus === 'failed-attempt';
                        const isClosed = isDelivered || isFailed;

                        return (
                            <div
                                key={parcel._id}
                                className="rounded-2xl border border-[#EDE9FE] bg-white p-6 space-y-5 hover:shadow-[0_4px_30px_rgba(124,58,237,0.08)] transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1E1B2E] flex items-center gap-2">
                                            <Package className="h-5 w-5 text-[#7C3AED]" />
                                            {parcel.parcelName}
                                        </h3>
                                        <span className="inline-block mt-2 bg-[#F5F0FE] text-[#7C3AED] px-2 py-1 rounded text-xs font-semibold">
                                            {parcel.parcelStatus}
                                        </span>
                                    </div>
                                    <div className="sm:text-right">
                                        <p className="text-xl font-bold text-[#7C3AED]">৳{parcel.cost}</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 py-4 border-y border-[#EEEAF6]">
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#9B93AC]">
                                            From
                                        </p>
                                        <div className="flex items-start gap-2 text-sm text-[#1E1B2E]">
                                            <User className="h-4 w-4 shrink-0 mt-0.5 text-[#7C3AED]" />
                                            <p className="font-semibold">{parcel.senderName}</p>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-[#6B6478]">
                                            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                            <p className="text-xs leading-relaxed">
                                                {parcel.senderAddress}, {parcel.senderRegion}, {parcel.senderDistrict}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#6B6478]">
                                            <Phone className="h-4 w-4 shrink-0" />
                                            <p className="text-xs">{parcel.senderPhone}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#9B93AC]">
                                            To
                                        </p>
                                        <div className="flex items-start gap-2 text-sm text-[#1E1B2E]">
                                            <User className="h-4 w-4 shrink-0 mt-0.5 text-[#7C3AED]" />
                                            <p className="font-semibold">{parcel.recieverName}</p>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-[#6B6478]">
                                            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                            <p className="text-xs leading-relaxed">
                                                {parcel.recieverAddress}, {parcel.recieverRegion}, {parcel.recieverDistrict}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#6B6478]">
                                            <Phone className="h-4 w-4 shrink-0" />
                                            <p className="text-xs">{parcel.recieverPhone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-1">
                                    <button
                                        onClick={() => handleStatusUpdate(parcel._id, 'picked-up')}
                                        disabled={currentIndex >= 1 || isClosed || isButtonPending(parcel._id, 'picked-up')}
                                        className="flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#7C3AED]"
                                    >
                                        <Navigation className="h-4 w-4" />
                                        {isButtonPending(parcel._id, 'picked-up') ? 'Updating...' : 'Mark Picked Up'}
                                    </button>

                                    <button
                                        onClick={() => handleStatusUpdate(parcel._id, 'in-transit')}
                                        disabled={currentIndex !== 1 || isClosed || isButtonPending(parcel._id, 'in-transit')}
                                        className="flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#7C3AED]"
                                    >
                                        <Truck className="h-4 w-4" />
                                        {isButtonPending(parcel._id, 'in-transit') ? 'Updating...' : 'Mark In Transit'}
                                    </button>

                                    <button
                                        onClick={() => handleStatusUpdate(parcel._id, 'delivered')}
                                        disabled={currentIndex !== 2 || isClosed || isButtonPending(parcel._id, 'delivered')}
                                        className="flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#7C3AED]"
                                    >
                                        <PackageCheck className="h-4 w-4" />
                                        {isButtonPending(parcel._id, 'delivered') ? 'Updating...' : 'Mark Delivered'}
                                    </button>

                                    <button
                                        onClick={() => handleStatusUpdate(parcel._id, 'failed-attempt')}
                                        disabled={isClosed || isButtonPending(parcel._id, 'failed-attempt')}
                                        className="flex items-center gap-2 bg-[#FEF2F2] text-[#DC2626] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#FEE2E2] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FEF2F2]"
                                    >
                                        <PackageX className="h-4 w-4" />
                                        {isButtonPending(parcel._id, 'failed-attempt') ? 'Updating...' : 'Failed Attempt'}
                                    </button>

                                    <button
                                        onClick={() => openCallModal(parcel)}
                                        className="flex items-center gap-2 bg-[#F5F0FE] text-[#7C3AED] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#EDE9FE] transition-colors"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Call Receiver
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Call Receiver modal */}
            {callModalParcel && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={closeCallModal}
                >
                    <div
                        className="w-full max-w-sm rounded-3xl bg-white p-6 space-y-5 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <div className="flex justify-end">
                            <button
                                onClick={closeCallModal}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6478] hover:bg-[#F5F0FE] hover:text-[#7C3AED] transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Avatar + name */}
                        <div className="flex flex-col items-center text-center -mt-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0FE]">
                                <User className="h-7 w-7 text-[#7C3AED]" />
                            </div>
                            <h3 className="mt-3 text-lg font-bold text-[#1E1B2E]">
                                {callModalParcel.recieverName}
                            </h3>
                            <p className="text-sm text-[#6B6478]">Receiver</p>
                        </div>

                        {/* Phone number display */}
                        <div className="flex items-center justify-between rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#7C3AED]" />
                                <span className="text-base font-semibold text-[#1E1B2E] tracking-wide">
                                    {callModalParcel.recieverPhone || 'No number on file'}
                                </span>
                            </div>
                            {callModalParcel.recieverPhone && (
                                <button
                                    onClick={handleCopyNumber}
                                    title="Copy number"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7C3AED] hover:bg-[#EDE9FE] transition-colors"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </button>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2"
                            
                                href={callModalParcel.recieverPhone ? `tel:${callModalParcel.recieverPhone}` : undefined}
                                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                    callModalParcel.recieverPhone
                                        ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                                        : 'bg-[#F5F0FE] text-[#B9AEDD] pointer-events-none'
                                }`}
                            >
                                <Phone className="h-4 w-4" />
                                Call Now
                           
                            <button
                                onClick={closeCallModal}
                                className="rounded-xl border border-[#DCD3F5] bg-white px-4 py-3 text-sm font-semibold text-[#1E1B2E] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignedDeliveries;