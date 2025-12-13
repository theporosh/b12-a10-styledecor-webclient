import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';

const Payment = () => {

    const { bookingId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: booking } = useQuery({
        queryKey: ['bookings', bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/id/${bookingId}`);
            return res.data;
        }
    })

    const handlePayment = async() => {
        const paymentInfo = {
            price: booking.price,
            serviceId: booking._id,
            customerEmail: booking.customerEmail,
            serviceTitle: booking.serviceTitle
        }

        const res = await axiosSecure.post('/create-checkout-session' , paymentInfo);
        // console.log(res.data)
        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                Please Pay for: {booking.serviceTitle}
            </h2>
            <p className="text-lg">Amount: {booking.price} BDT</p>
            <button
                onClick={handlePayment}
                className="mt-6 px-6 py-3 rounded-xl bg-[#1E595D] text-white hover:bg-[#174648]"
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;