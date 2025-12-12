import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    });
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="w-20 h-20 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your booking and transaction details are
                    below:
                </p>

                <div className="bg-gray-50 border rounded-xl p-5 text-left">
                    <p className="mb-2">
                        <span className="font-semibold">Transaction ID:</span>
                        <br />
                        <span className="text-gray-700 break-all">
                            {paymentInfo.transactionId}
                        </span>
                    </p>

                    <p>
                        <span className="font-semibold">Booking Tracking ID:</span>
                        <br />
                        <span className="text-gray-700 break-all">
                            {paymentInfo.trackingId}
                        </span>
                    </p>
                </div>

                <Link
                    to="/dashboard/payments"
                    className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
                >
                    View Payment History
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
