import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
    Search,
    Package,
    CreditCard,
    PackageSearch,
    UserCheck,
    PackageCheck,
    Truck,
    Home,
    XCircle,
    User,
    Phone,
} from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const STEP_ORDER = ['pendingPickup', 'rider-assigned', 'picked-up', 'in-transit', 'delivered'];

const STEPS = [
    { key: 'payment', label: 'Payment Confirmed', icon: CreditCard },
    { key: 'pendingPickup', label: 'Pickup Requested', icon: PackageSearch },
    { key: 'rider-assigned', label: 'Rider Assigned', icon: UserCheck },
    { key: 'picked-up', label: 'Picked Up', icon: PackageCheck },
    { key: 'in-transit', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
];

const Track = () => {
    const axiosPublic = useAxiosSecure();
    const [trackingId, setTrackingId] = useState('');
    const [searchedId, setSearchedId] = useState(null); // the id actually submitted, for display

    const trackMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosPublic.get(`/track/${id}`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = trackingId.trim();
        if (!trimmed) return;
        setSearchedId(trimmed);
        trackMutation.mutate(trimmed);
    };

    const parcel = trackMutation.data;
    const notFound = trackMutation.isError;

    const isFailed = parcel?.parcelStatus === 'failed-attempt';
    const currentStepIndex = parcel ? STEP_ORDER.indexOf(parcel.parcelStatus) : -1;
    const paymentDone = parcel?.paymentStatus === 'paid';

    const getNodeStatus = (stepKey) => {
        if (stepKey === 'payment') {
            return paymentDone ? 'done' : 'upcoming';
        }
        const stepIndex = STEP_ORDER.indexOf(stepKey);
        if (isFailed) {
            return stepIndex <= 1 && paymentDone ? 'done' : 'upcoming';
        }
        if (currentStepIndex === -1) return 'upcoming';
        if (stepIndex < currentStepIndex) return 'done';
        if (stepIndex === currentStepIndex) return 'current';
        return 'upcoming';
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
                <span className="inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                    Track Your Parcel
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1E1B2E]">
                    Where's my parcel?
                </h1>
                <p className="text-[#6B6478]">
                    Enter your tracking ID to see live delivery status.
                </p>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9B93AC]" />
                    <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="e.g. DX-20260815-A1B2C3"
                        className="w-full rounded-2xl border border-[#EDE9FE] bg-white pl-11 pr-4 py-3 text-sm font-medium text-[#1E1B2E] placeholder:text-[#B9AEDD] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    disabled={trackMutation.isPending || !trackingId.trim()}
                    className="shrink-0 rounded-2xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6D28D9] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {trackMutation.isPending ? 'Searching...' : 'Track'}
                </button>
            </form>

            {/* Not found state */}
            {notFound && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="font-bold text-[#1E1B2E]">No parcel found</h3>
                    <p className="text-sm text-[#6B6478]">
                        We couldn't find a parcel with tracking ID <span className="font-semibold">{searchedId}</span>.
                        Double check the ID and try again.
                    </p>
                </div>
            )}

            {/* Result */}
            {parcel && (
                <div className="space-y-6">
                    {/* Minimal summary card */}
                    <div className="rounded-3xl border border-[#EDE9FE] bg-white p-6 md:p-8 space-y-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] flex items-center gap-1.5">
                                    <Package className="h-3.5 w-3.5" />
                                    {parcel.parcelType || 'Parcel'}
                                </span>
                                <h2 className="mt-1 text-xl font-bold text-[#1E1B2E]">{parcel.parcelName}</h2>
                                <p className="mt-1 text-sm font-mono text-[#6B6478]">{parcel.trackingId}</p>
                            </div>
                            <p className="shrink-0 text-xl font-bold text-[#7C3AED]">{parcel.cost} TK</p>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-semibold text-[#1E1B2E] truncate">{parcel.senderRegion}</p>
                                <p className="text-xs text-[#6B6478]">Pickup</p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 px-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                                <span className="h-px w-8 bg-[#DCD3F5]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#14121F]" />
                            </div>
                            <div className="flex-1 min-w-0 text-right">
                                <p className="text-base font-semibold text-[#1E1B2E] truncate">{parcel.recieverRegion}</p>
                                <p className="text-xs text-[#6B6478]">Drop-off</p>
                            </div>
                        </div>

                        {/* Rider info, only once assigned */}
                        {parcel.riderName && (
                            <div className="flex items-center gap-3 rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] px-4 py-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F0FE]">
                                    <User className="h-4 w-4 text-[#7C3AED]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-[#6B6478]">Your rider</p>
                                    <p className="font-semibold text-[#1E1B2E] truncate">{parcel.riderName}</p>
                                </div>
                                {parcel.riderPhone && (
                                    <div className="flex items-center gap-1.5 text-sm text-[#6B6478] shrink-0">
                                        <Phone className="h-3.5 w-3.5" />
                                        {parcel.riderPhone}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Status timeline */}
                    <div className="rounded-3xl border border-[#EDE9FE] bg-white p-6 md:p-8">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-6">
                            Delivery Progress
                        </h3>

                        <div className="space-y-0">
                            {STEPS.map((step, index) => {
                                const status = getNodeStatus(step.key);
                                const isLast = index === STEPS.length - 1;
                                const Icon = step.icon;

                                return (
                                    <div key={step.key} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                                    status === 'done'
                                                        ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                                                        : status === 'current'
                                                        ? 'bg-white border-[#7C3AED] text-[#7C3AED] ring-4 ring-[#EDE9FE]'
                                                        : 'bg-white border-[#E4DFF2] text-[#C7BEDD]'
                                                }`}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            {!isLast && (
                                                <div
                                                    className={`w-0.5 flex-1 min-h-[2.5rem] ${
                                                        status === 'done' ? 'bg-[#7C3AED]' : 'bg-[#E4DFF2]'
                                                    }`}
                                                />
                                            )}
                                        </div>

                                        <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                                            <p
                                                className={`font-semibold ${
                                                    status === 'upcoming' ? 'text-[#C7BEDD]' : 'text-[#1E1B2E]'
                                                }`}
                                            >
                                                {step.label}
                                            </p>
                                            {status === 'current' && (
                                                <p className="text-xs font-medium text-[#7C3AED] mt-0.5">In progress</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {isFailed && (
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-red-50 border-red-400 text-red-500">
                                            <XCircle className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-red-500">Delivery Attempt Failed</p>
                                        <p className="text-xs text-[#6B6478] mt-0.5">
                                            The rider was unable to complete this delivery.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Track;