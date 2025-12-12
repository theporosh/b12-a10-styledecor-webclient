import React from "react";
import { Link } from "react-router";
import { XCircle } from "lucide-react"; 

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <XCircle className="w-20 h-20 text-red-600" />
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Cancelled
                </h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. You can try again anytime.
                </p>

                {/* Button */}
                <Link to="/dashboard/bookings">
                    <button className="px-6 py-3 bg-[#C84A4A] text-white rounded-xl font-semibold shadow hover:bg-red-700 transition">
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;
