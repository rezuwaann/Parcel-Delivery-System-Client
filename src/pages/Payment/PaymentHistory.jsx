import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Receipt, Package, CalendarDays, CheckCircle2 } from "lucide-react";

const formatDate = (isoString) =>
  new Date(isoString).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className=" mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
          Billing
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E1B2E]">
          Payment History
        </h1>
        <p className="text-[#6B6478]">
          A record of every payment you've made for your parcel bookings.
        </p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center text-[#6B6478]">
          Loading your payment history...
        </div>
      )}

      {/* Empty state */}
      {!isLoading && payments.length === 0 && (
        <div className="rounded-3xl border border-[#EDE9FE] bg-white p-12 text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F0FE]">
            <Receipt className="h-6 w-6 text-[#7C3AED]" />
          </div>
          <h3 className="font-bold text-[#1E1B2E]">No payments yet</h3>
          <p className="text-sm text-[#6B6478]">
            Once you pay for a parcel booking, it'll show up here.
          </p>
        </div>
      )}

      {/* Payments — desktop table */}
      {!isLoading && payments.length > 0 && (
        <div className="hidden md:block rounded-3xl border border-[#EDE9FE] bg-white overflow-hidden shadow-[0_4px_30px_rgba(124,58,237,0.08)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAF8FF] text-left text-[#6B6478] uppercase text-xs tracking-wide">
                <th className="px-6 py-4 font-semibold">Parcel</th>
                <th className="px-6 py-4 font-semibold">Tracking ID</th>
                <th className="px-6 py-4 font-semibold">Paid At</th>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t border-[#EEEAF6] hover:bg-[#FAF8FF] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-semibold text-[#1E1B2E]">
                      <Package className="h-4 w-4 text-[#7C3AED] shrink-0" />
                      {payment.parcelName}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#6B6478]">
                    {payment.trackingId}
                  </td>
                  <td className="px-6 py-4 text-[#6B6478]">
                    {formatDate(payment.paidAt)}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[#6B6478]">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-[#7C3AED]">
                    {payment.cost} {payment.currency?.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-2.5 py-1 text-xs font-semibold capitalize">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payments — mobile cards */}
      {!isLoading && payments.length > 0 && (
        <div className="md:hidden space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="rounded-2xl border border-[#EDE9FE] bg-white p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-bold text-[#1E1B2E]">
                  <Package className="h-4 w-4 text-[#7C3AED]" />
                  {payment.parcelName}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-2.5 py-1 text-xs font-semibold capitalize">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {payment.paymentStatus}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#6B6478]">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(payment.paidAt)}
              </div>

              <div className="text-xs text-[#6B6478] space-y-1">
                <p>
                  Tracking ID:{" "}
                  <span className="font-mono text-[#1E1B2E]">{payment.trackingId}</span>
                </p>
                <p className="truncate">
                  Txn ID:{" "}
                  <span className="font-mono text-[#1E1B2E]">{payment.transactionId}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EEEAF6]">
                <span className="text-xs uppercase tracking-widest text-[#6B6478] font-semibold">
                  Amount paid
                </span>
                <span className="text-lg font-bold text-[#7C3AED]">
                  {payment.cost} {payment.currency?.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;