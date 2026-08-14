import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
    Bike,
    Phone,
    MapPin,
    CalendarDays,
    CheckCircle2,
    XCircle,
    IdCard,
} from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";

const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

const ApproveRiders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [], isLoading } = useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=pending`);
            return res.data;
        },
    });

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
            if (res.data.modifiedCount) {
                refetch();
                // close the modal if it was open for this rider
                document.getElementById(`rider_modal_${rider._id}`)?.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `The rider was ${status}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const handleApprove = (rider) => updateRiderStatus(rider, "approved");
    const handleReject = (rider) => updateRiderStatus(rider, "rejected");

    return (
        <div className="mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <span className="inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-widest">
                    Riders
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1E1B2E]">
                    Pending Rider Applications
                </h1>
                <p className="text-[#6B6478]">
                    Review applications and approve or reject riders.
                </p>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]">
                    Loading rider applications...
                </div>
            )}

            {/* Empty state */}
            {!isLoading && riders.length === 0 && (
                <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0FE]">
                        <Bike className="h-6 w-6 text-[#7C3AED]" />
                    </div>
                    <h3 className="font-bold text-[#1E1B2E]">No pending applications</h3>
                    <p className="text-base text-[#6B6478]">
                        New rider applications will show up here for review.
                    </p>
                </div>
            )}

            {/* Riders — desktop table (casual summary only) */}
            {!isLoading && riders.length > 0 && (
                <div className="hidden md:block rounded-3xl border border-[#EDE9FE] bg-white overflow-hidden shadow-[0_4px_30px_rgba(124,58,237,0.08)]">
                    <table className="w-full text-base">
                        <thead>
                            <tr className="bg-[#FAF8FF] text-left text-[#6B6478] uppercase text-sm tracking-wide">
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Region</th>
                                <th className="px-6 py-4 font-semibold">Vehicle</th>
                                <th className="px-6 py-4 font-semibold">Applied At</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.map((rider) => (
                                <tr
                                    key={rider._id}
                                    className="border-t border-[#EEEAF6] hover:bg-[#FAF8FF] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-[#1E1B2E]">{rider.name}</div>
                                        <div className="text-sm text-[#6B6478] mt-0.5">{rider.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478]">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {rider.region}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478]">
                                        {rider.vehicleType}
                                    </td>
                                    <td className="px-6 py-4 text-[#6B6478]">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarDays className="h-4 w-4" />
                                            {formatDate(rider.appliedAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() =>
                                                    document.getElementById(`rider_modal_${rider._id}`).showModal()
                                                }
                                                title="View"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                            >
                                                <FaMagnifyingGlass size={14} />
                                            </button>

                                            <button
                                                onClick={() => handleApprove(rider)}
                                                title="Approve"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-green-500 hover:text-white transition-colors"
                                            >
                                                <CheckCircle2 size={16} />
                                            </button>

                                            <button
                                                onClick={() => handleReject(rider)}
                                                title="Reject"
                                                className="btn btn-sm btn-square btn-ghost hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Riders — mobile cards (casual summary only) */}
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
                                    <div className="text-sm text-[#6B6478]">{rider.email}</div>
                                </div>
                                <div className="text-sm text-[#6B6478] flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {rider.region}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-[#6B6478]">
                                <span>{rider.vehicleType}</span>
                                <div className="flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4" />
                                    {formatDate(rider.appliedAt)}
                                </div>
                            </div>

                            <div className="flex items-center gap-1 justify-end pt-3 border-t border-[#EEEAF6]">
                                <button
                                    onClick={() =>
                                        document.getElementById(`rider_modal_${rider._id}`).showModal()
                                    }
                                    title="View"
                                    className="btn btn-sm btn-square btn-ghost hover:bg-[#7C3AED] hover:text-white transition-colors"
                                >
                                    <FaMagnifyingGlass size={14} />
                                </button>

                                <button
                                    onClick={() => handleApprove(rider)}
                                    title="Approve"
                                    className="btn btn-sm btn-square btn-ghost hover:bg-green-500 hover:text-white transition-colors"
                                >
                                    <CheckCircle2 size={16} />
                                </button>

                                <button
                                    onClick={() => handleReject(rider)}
                                    title="Reject"
                                    className="btn btn-sm btn-square btn-ghost hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <XCircle size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals — rendered ONCE per rider, outside the desktop/mobile split above,
                so a hidden ancestor on either breakpoint never blocks it from opening */}
            {riders.map((rider) => (
                <dialog key={rider._id} id={`rider_modal_${rider._id}`} className="modal">
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
                                    <span className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
                                        Rider application
                                    </span>
                                    <h3 className="mt-1 text-2xl font-bold text-[#1E1B2E]">{rider.name}</h3>
                                </div>
                                <span className="shrink-0 rounded-full bg-[#F5F0FE] text-[#7C3AED] px-3 py-1 text-sm font-semibold capitalize">
                                    {rider.status || "pending"}
                                </span>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8FF] border border-[#EDE9FE] px-3 py-1 text-sm text-[#6B6478]">
                                    <Bike className="h-4 w-4" />
                                    {rider.vehicleType}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8FF] border border-[#EDE9FE] px-3 py-1 text-sm text-[#6B6478]">
                                    <MapPin className="h-4 w-4" />
                                    {rider.region}, {rider.district}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8FF] border border-[#EDE9FE] px-3 py-1 text-sm text-[#6B6478]">
                                    <CalendarDays className="h-4 w-4" />
                                    {formatDate(rider.appliedAt)}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-[#EEEAF6]" />

                        {/* Body */}
                        <div className="max-h-[60vh] overflow-y-auto px-6 py-6 md:px-8 space-y-6 bg-white">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Personal */}
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-3">
                                        Personal details
                                    </h4>
                                    <div className="space-y-2 text-base">
                                        <p className="font-semibold text-[#1E1B2E]">{rider.name}</p>
                                        <p className="text-[#6B6478]">{rider.email}</p>
                                        <p className="text-[#6B6478] flex items-center gap-1.5">
                                            <Phone className="h-4 w-4" />
                                            {rider.phone}
                                        </p>
                                        {rider.nid && (
                                            <p className="text-[#6B6478] flex items-center gap-1.5">
                                                <IdCard className="h-4 w-4" />
                                                NID: {rider.nid}
                                            </p>
                                        )}
                                        {rider.address && (
                                            <p className="text-[#6B6478]">{rider.address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Vehicle & coverage */}
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-3">
                                        Vehicle & coverage
                                    </h4>
                                    <div className="space-y-2 text-base">
                                        <p className="font-semibold text-[#1E1B2E]">{rider.vehicleType}</p>
                                        {rider.bikeModel && (
                                            <p className="text-[#6B6478]">Model: {rider.bikeModel}</p>
                                        )}
                                        {rider.bikeRegNo && (
                                            <p className="text-[#6B6478]">Reg No: {rider.bikeRegNo}</p>
                                        )}
                                        {rider.licenseNo && (
                                            <p className="text-[#6B6478] flex items-center gap-1.5">
                                                <IdCard className="h-4 w-4" />
                                                License: {rider.licenseNo}
                                            </p>
                                        )}
                                        <p className="text-[#6B6478]">
                                            {rider.region}, {rider.district}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {rider.note && (
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-[#6B6478] mb-2">
                                        Note from applicant
                                    </h4>
                                    <p className="text-base text-[#6B6478] border-l-2 border-[#DCD3F5] pl-3">
                                        {rider.note}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer — Approve / Reject / Close, all reachable from the modal too */}
                        <div className="flex flex-col sm:flex-row justify-end gap-2 border-t border-[#EEEAF6] px-6 py-4 md:px-8">
                            <button
                                onClick={() => handleReject(rider)}
                                className="btn border-none bg-red-50 text-red-600 hover:bg-red-100"
                            >
                                <XCircle className="h-4 w-4" />
                                Reject
                            </button>
                            <button
                                onClick={() => handleApprove(rider)}
                                className="btn border-none bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                Approve
                            </button>
                            <form method="dialog">
                                <button className="btn w-full sm:w-auto border border-[#DCD3F5] bg-white text-[#1E1B2E] hover:border-[#7C3AED] hover:text-[#7C3AED]">
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

export default ApproveRiders;