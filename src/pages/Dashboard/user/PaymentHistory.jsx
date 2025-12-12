import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-6 lg:p-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Payment History ({payments.length})
            </h2>

            {payments.length === 0 ? (
                <p className="text-gray-400 text-lg">No payments found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((payment) => (
                        <div
                            key={payment._id}
                            className="p-5 bg-white rounded-xl shadow-lg border hover:shadow-2xl transition"
                        >
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {payment.serviceTitle}
                            </h3>

                            <div className="mb-2">
                                <span className="font-semibold">Amount:</span>{" "}
                                <span className="text-[#C8A870] font-bold">
                                    ${payment.amount}
                                </span>
                            </div>

                            <div className="mb-1">
                                <span className="font-semibold">Email:</span>{" "}
                                {payment.customerEmail}
                            </div>

                            <div className="mb-1">
                                <span className="font-semibold">Payment Date:</span>{" "}
                                {new Date(payment.paidAt).toLocaleDateString()}
                            </div>

                            <div className="mb-1">
                                <span className="font-semibold">Transaction ID:</span>
                                <p className="text-sm text-gray-600 break-all">
                                    {payment.transactionId}
                                </p>
                            </div>

                            <div className="mb-1">
                                <span className="font-semibold">Tracking ID:</span>
                                <p className="text-sm text-gray-600 break-all">
                                    {payment.trackingId}
                                </p>
                            </div>

                            <div className="mt-3">
                                <span
                                    className={`px-3 py-1 text-sm rounded-lg ${payment.paymentStatus === "paid"
                                            ? "bg-green-200 text-green-700"
                                            : "bg-red-600"
                                        }`}
                                >
                                    {payment.paymentStatus.toUpperCase()}
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
