import { Link } from "react-router";
import { XCircle, RotateCcw, Home, LifeBuoy } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <div className="w-full bg-white min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full rounded-3xl border border-[#EDE9FE] shadow-[0_4px_30px_rgba(124,58,237,0.08)] p-8 md:p-12 text-center">
    
    
        {/* Cancelled icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <XCircle className="h-10 w-10 text-red-500" strokeWidth={2} />
        </div>

        <span className="mt-6 inline-block bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
          Payment cancelled
        </span>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#1E1B2E]">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-[#6B6478]">
          Your payment wasn't completed and no money has been deducted. Your
          parcel booking is still saved — you can retry the payment anytime.
        </p>

      
      



        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/dashboard/my-parcels"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9]"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
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
          <LifeBuoy className="h-3.5 w-3.5" />
          Having trouble? Contact support and we'll help you sort it out.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;