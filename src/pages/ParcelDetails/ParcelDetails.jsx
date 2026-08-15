import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
    ArrowLeft,
    CreditCard,
    PackageSearch,
    UserCheck,
    PackageCheck,
    Truck,
    Home,
    XCircle,
} from 'lucide-react';

// order defines the "happy path" — a parcel's parcelStatus lands on one of these
const STEP_ORDER = ['pendingPickup', 'rider-assigned', 'picked-up', 'in-transit', 'delivered'];

const STEPS = [
    { key: 'payment', label: 'Payment Confirmed', icon: CreditCard },
    { key: 'pendingPickup', label: 'Pickup Requested', icon: PackageSearch },
    { key: 'rider-assigned', label: 'Rider Assigned', icon: UserCheck },
    { key: 'picked-up', label: 'Picked Up', icon: PackageCheck },
    { key: 'in-transit', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
];

const ParcelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: p, isLoading } = useQuery({
        queryKey: ['parcel', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]">
                Loading parcel details...
            </div>
        );
    }

    if (!p) {
        return (
            <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]">
                Parcel not found.
            </div>
        );
    }

    const isFailed = p.parcelStatus === 'failed-attempt';
    const currentStepIndex = STEP_ORDER.indexOf(p.parcelStatus); // -1 if not on happy path (e.g. failed)
    const paymentDone = p.paymentStatus === 'paid';

    // status of each timeline node: 'done' | 'current' | 'upcoming'
    const getNodeStatus = (stepKey) => {
        if (stepKey === 'payment') {
            return paymentDone ? 'done' : 'upcoming';
        }
        const stepIndex = STEP_ORDER.indexOf(stepKey);
        if (isFailed) {
            // once failed, nothing past "rider-assigned" onward reads as done — everything just stops
            return stepIndex <= 1 && paymentDone ? 'done' : 'upcoming';
        }
        if (currentStepIndex === -1) return 'upcoming';
        if (stepIndex < currentStepIndex) return 'done';
        if (stepIndex === currentStepIndex) return 'current';
        return 'upcoming';
    };

    return (
        <div className="mx-auto space-y-6 max-w-2xl">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-semibold text-[#6B6478] hover:text-[#7C3AED] transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to parcels
            </button>

            {/* Minimal header card */}
            <div className="rounded-3xl border border-[#EDE9FE] bg-white p-6 md:p-8 space-y-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                            {p.parcelType || 'Parcel'}
                        </span>
                        <h1 className="mt-1 text-2xl font-bold text-[#1E1B2E]">{p.parcelName}</h1>
                        {p.trackingId && (
                            <p className="mt-1 text-sm font-mono text-[#6B6478]">{p.trackingId}</p>
                        )}
                    </div>
                    <p className="shrink-0 text-xl font-bold text-[#7C3AED]">{p.cost} TK</p>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-[#1E1B2E] truncate">{p.senderRegion}</p>
                        <p className="text-xs text-[#6B6478]">Pickup</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 px-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                        <span className="h-px w-8 bg-[#DCD3F5]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#14121F]" />
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                        <p className="text-base font-semibold text-[#1E1B2E] truncate">{p.recieverRegion}</p>
                        <p className="text-xs text-[#6B6478]">Drop-off</p>
                    </div>
                </div>
            </div>

            {/* Status timeline */}
            <div className="rounded-3xl border border-[#EDE9FE] bg-white p-6 md:p-8">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-6">
                    Delivery Progress
                </h2>

                <div className="space-y-0">
                    {STEPS.map((step, index) => {
                        const status = getNodeStatus(step.key);
                        const isLast = index === STEPS.length - 1;
                        const Icon = step.icon;

                        // rider info shows inline once a rider has been assigned
                        const showRiderInfo = step.key === 'rider-assigned' && p.riderName && status !== 'upcoming';

                        return (
                            <div key={step.key} className="flex gap-4">
                                {/* Node + connecting line */}
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
                                    {showRiderInfo && (
                                        <p className="text-xs text-[#6B6478] mt-0.5">
                                            {p.riderName}{p.riderPhone ? ` · ${p.riderPhone}` : ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Failed-attempt branch, shown only when relevant */}
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
    );
};

export default ParcelDetails;