import { Link, useLocation, useSearchParams } from "react-router";
import { CheckCircle2, PackageCheck, Home, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {


  const [paymentInfo, setPaymentInfo] = useState('');

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id')
  const axiosSecure = useAxiosSecure();
  console.log(sessionId)


  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
            cost: res.data.cost
          })
        })
    }
  }, [searchParams, sessionId, axiosSecure])

  return (
    <div className="w-full bg-white min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full rounded-3xl border border-[#EDE9FE] shadow-[0_4px_30px_rgba(124,58,237,0.08)] p-8 md:p-12 text-center">

        {/* Success icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EDE9FE]">
          <CheckCircle2 className="h-10 w-10 text-[#7C3AED]" strokeWidth={2} />
        </div>

        <span className="mt-6 inline-block bg-[#EDE9FE] text-[#6D28D9] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
          Payment confirmed
        </span>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#1E1B2E]">
          Payment Successful
        </h1>
        <p className="mt-3 text-[#6B6478]">
          Thanks for booking with us. Your pickup request has been confirmed
          and an agent will be assigned shortly.
        </p>

        {/* Order summary */}
        {(paymentInfo.cost || paymentInfo.trackingId || paymentInfo.transactionId) && (
          <div className="mt-8 rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] p-5 text-left space-y-3">
            {paymentInfo.trackingId && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B6478]">Tracking ID</span>
                <span className="font-semibold text-[#1E1B2E]">{paymentInfo.trackingId}</span>
              </div>
            )}
            {paymentInfo.transactionId && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B6478]">Transaction ID</span>
                <span className="font-mono font-semibold text-[#1E1B2E]">{paymentInfo.transactionId}</span>
              </div>
            )}
            {paymentInfo.cost && (
              <div className="flex items-center justify-between text-sm pt-3 border-t border-[#EDE9FE]">
                <span className="text-[#6B6478]">Amount paid</span>
                <span className="font-bold text-[#7C3AED] text-lg">{paymentInfo.cost} TK</span>
              </div>
            )}
          </div>
        )}






        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/dashboard/my-parcels"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9]"
          >
            <PackageCheck className="h-4 w-4" />
            View my parcels
          </Link>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#DCD3F5] px-6 py-3 text-sm font-semibold text-[#1E1B2E] transition-colors hover:border-[#7C3AED] hover:text-[#7C3AED]"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#6B6478]">
          <Receipt className="h-3.5 w-3.5" />
          A receipt has been sent to your email.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;