import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
    Bike,
    Phone,
    MapPin,
    CalendarDays,
    ShieldCheck,
    UserX,
    IdCard,
    Eye,
} from "lucide-react";
import Swal from "sweetalert2";

const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

const modalId = (rider) => `rider_modal_${rider._id}`;

const CurrentRiders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [], isLoading } = useQuery({
        queryKey: ["riders", "approved"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved`);
            return res.data;
        },
    });

    const handleDeactivate = (rider) => {
        Swal.fire({
            title: `Deactivate ${rider.name}?`,
            text: "They'll lose access to rider features until reactivated.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B6478",
            confirmButtonText: "Deactivate",
        }).then((result) => {
            if (result.isConfirmed) {
                const updateInfo = { status: "deactivated", email: rider.email };
                axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
                    if (res.data.modifiedCount) {
                        document.getElementById(modalId(rider))?.close();
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Rider deactivated",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <span className="inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                    Riders
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1E1B2E]">
                    Active Riders
                </h1>
                <p className="text-[#6B6478]">
                    Riders currently approved and delivering on the platform.
                </p>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]">
                    Loading active riders...
                </div>
            )}

            {/* Empty state */}
            {!isLoading && riders.length === 0 && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0FE]">
                        <Bike className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="font-bold text-[#1E1B2E]">No active riders yet</h3>
                    <p className="text-sm text-[#6B6478]">
                        Approved riders will show up here once they're onboarded.
                    </p>
                </div>
            )}

            {/* Riders — desktop table (casual info only) */}
            {!isLoading && riders.length > 0 && (
                <div className="hidden md:block rounded-3xl border border-[#EDE9FE] bg-white overflow-hidden shadow-[0_4px_30px_rgba(124,58,237,0.08)]">
                    <table className="w-full text-lg">
                        <thead>
                            <tr className="bg-[#FAF8FF] text-left text-[#6B6478] uppercase text-xs tracking-wide">
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Contact</th>
                                <th className="px-6 py-4 font-semibold">Region</th>
                                <th className="px-6 py-4 font-semibold">Vehicle</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                            {riders.map((rider) => (
                                <tr
                                    key={rider._id}
                                    className="border-t border-[#EEEAF6] hover:bg-[#FAF8FF] transition-colors"
                                >
                                    <td className="px-6 py-4 font-semibold text-[#1E1B2E]">
                                        {rider.name}
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478]">
                                        <div className="flex items-center gap-1 text-xs">
                                            <Phone className="h-3.5 w-3.5" />
                                            {rider.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478]">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {rider.region}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478]">{rider.vehicleType}</td>
                                    <td className="px-6 py-4 text-[#6B6478]">
                                        <div className="flex items-center gap-1.5 text-lg">
                                            {rider.workStatus}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-3 py-1.5 text-xs font-semibold">
                                                <ShieldCheck className="h-3.5 w-3.5" />
                                                Active
                                            </span>
                                            <button
                                                onClick={() => document.getElementById(modalId(rider)).showModal()}
                                                title="View full details"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeactivate(rider)}
                                                title="Deactivate"
                                                className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 text-xs font-semibold"
                                            >
                                                <UserX className="h-3.5 w-3.5" />
                                                Deactivate
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Riders — mobile cards (casual info only) */}
            {!isLoading && riders.length > 0 && (
                <div className="md:hidden space-y-4">
                    {riders.map((rider) => (
                        <div
                            key={rider._id}
                            className="rounded-2xl border border-[#EDE9FE] bg-white p-5 space-y-3"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="font-bold text-[#1E1B2E]">{rider.name}</div>
                                    <div className="text-xs text-[#6B6478]">{rider.vehicleType}</div>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-2.5 py-1 text-xs font-semibold">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Active
                                </span>
                            </div>

                            <div className="text-xs text-[#6B6478] space-y-1">
                                <p className="flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" />
                                    {rider.phone}
                                </p>
                                <p className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {rider.region}
                                </p>
                                <p className="flex items-center gap-1.5">
                                    {rider.workStatus}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#EEEAF6]">
                                <button
                                    onClick={() => document.getElementById(modalId(rider)).showModal()}
                                    className="inline-flex items-center justify-center gap-1 rounded-full border border-[#DCD3F5] text-[#1E1B2E] px-3 py-2 text-xs font-semibold"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    View
                                </button>
                                <button
                                    onClick={() => handleDeactivate(rider)}
                                    className="inline-flex items-center justify-center gap-1 rounded-full bg-red-50 text-red-600 px-3 py-2 text-xs font-semibold"
                                >
                                    <UserX className="h-3.5 w-3.5" />
                                    Deactivate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals — rendered ONCE per rider, outside the desktop/mobile split,
                so a hidden ancestor on either breakpoint never blocks it from opening */}
            {riders.map((rider) => (
                <dialog key={modalId(rider)} id={modalId(rider)} className="modal">
                    <div className="modal-box max-w-xl p-0 overflow-hidden rounded-3xl">
                        {/* Header */}
                        <div className="px-6 pt-6 pb-5 md:px-8">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-[#6B6478] hover:bg-[#F5F0FE] hover:text-[#7C3AED]">
                                    ✕
                                </button>
                            </form>

                            <div className="flex items-center justify-between pr-8">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] flex items-center gap-1.5">
                                        <Bike className="h-3.5 w-3.5" />
                                        {rider.vehicleType}
                                    </span>
                                    <h3 className="mt-1 text-2xl font-bold text-[#1E1B2E]">{rider.name}</h3>
                                </div>
                                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-3 py-1 text-xs font-semibold">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Active
                                </span>
                            </div>

                            {/* Coverage */}
                            <div className="mt-5 flex items-center gap-2 text-sm text-[#6B6478]">
                                <MapPin className="h-4 w-4 text-[#7C3AED] shrink-0" />
                                {rider.region}{rider.district ? `, ${rider.district}` : ''}
                            </div>
                        </div>

                        <div className="border-t border-[#EEEAF6]" />

                        {/* Body */}
                        <div className="max-h-[55vh] overflow-y-auto px-6 py-6 md:px-8 space-y-6 bg-white">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Personal details */}
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#6B6478] mb-3">
                                        Personal details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-[#6B6478]">{rider.email}</p>
                                        <p className="text-[#6B6478] flex items-center gap-1.5">
                                            <Phone className="h-3.5 w-3.5" />
                                            {rider.phone}
                                        </p>
                                        {rider.nid && (
                                            <p className="text-[#6B6478] flex items-center gap-1.5">
                                                <IdCard className="h-3.5 w-3.5" />
                                                NID: {rider.nid}
                                            </p>
                                        )}
                                        {rider.address && (
                                            <p className="text-[#6B6478]">{rider.address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Vehicle details */}
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#6B6478] mb-3">
                                        Vehicle
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="font-semibold text-[#1E1B2E]">{rider.vehicleType}</p>
                                        {(rider.bikeModel || rider.bikeRegNo) && (
                                            <p className="text-[#6B6478]">
                                                {rider.bikeModel}{rider.bikeModel && rider.bikeRegNo ? ' · ' : ''}{rider.bikeRegNo}
                                            </p>
                                        )}
                                        {rider.licenseNo && (
                                            <p className="text-[#6B6478]">License: {rider.licenseNo}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {rider.note && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#6B6478] mb-2">
                                        Applicant note
                                    </h4>
                                    <p className="text-sm text-[#6B6478] border-l-2 border-[#DCD3F5] pl-3">
                                        {rider.note}
                                    </p>
                                </div>
                            )}

                            {/* Meta row */}
                            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#FAF8FF] border border-[#EDE9FE] px-5 py-4">
                                <div>
                                    <p className="text-xs text-[#6B6478]">Applied</p>
                                    <p className="mt-0.5 font-semibold text-[#1E1B2E]">
                                        {formatDate(rider.appliedAt)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#6B6478]">Status</p>
                                    <p className="mt-0.5 font-semibold text-green-600 capitalize">
                                        {rider.status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end border-t border-[#EEEAF6] px-6 py-4 md:px-8">
                            <button
                                onClick={() => handleDeactivate(rider)}
                                className="btn border border-red-200 bg-white text-red-600 hover:bg-red-50"
                            >
                                <UserX size={16} />
                                Deactivate
                            </button>
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

export default CurrentRiders;