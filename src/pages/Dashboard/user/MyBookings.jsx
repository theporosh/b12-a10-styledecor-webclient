import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";



const MyBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // const { data: booking = [], refetch } = useQuery({
    //     queryKey: ['bookings', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/bookings?email=${user.email}`);
    //         return res.data;
    //     }
    // })

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchBookings = async () => {
            try {
                const res = await axiosSecure.get(`/bookings/${user.email}`);
                setBookings(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const handleCancelBooking = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure you want to cancel this booking?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/bookings/${id}`);

            if (res.data.deletedCount > 0) {
                //refresh the data in the ui
                // refetch();
                Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
                setBookings(bookings.filter((item) => item._id !== id));
            }
        } catch (error) {
            toast.error("Failed to cancel booking");
        }
    };

    if (loading)
        return <div className="text-center py-20 text-xl">Loading...</div>;

    if (bookings.length === 0)
        return (
            <div className="text-center py-20 text-2xl font-semibold text-gray-500">
                No Bookings Found
            </div>
        );

    const handlePayment = async(booking) => {
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

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Bookings ({bookings.length})</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-md rounded-xl p-5 border border-gray-200 flex flex-col"
                    >
                        <img
                            src={booking.image}
                            className="rounded-lg h-40 w-full object-cover mb-4"
                        />

                        <h3 className="text-xl font-semibold">{booking.serviceTitle}</h3>

                        <p className="text-gray-600 flex items-center gap-2 mt-2">
                            <FaCalendarAlt /> {booking.bookingDate}
                        </p>

                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <FaMapMarkerAlt /> {booking.locations}
                        </p>

                        <p className="text-gray-700 flex items-center gap-2 mt-1">
                            <FaMoneyBillWave /> {booking.price} BDT
                        </p>

                        {/* Status Badge */}
                        <span
                            className={`mt-3 px-3 py-1 rounded-full text-sm w-fit
                                ${booking.status === "Pending" && "bg-yellow-200 text-yellow-700"}
                                ${booking.status === "Paid" && "bg-green-200 text-green-700"}
                                ${booking.status === "Cancelled" && "bg-red-200 text-red-700"}
                            `}
                        >
                            {booking.status}
                        </span>

                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                <FaTrash /> Cancel
                            </button>

                            {/* Payment button (future) */}
                            {booking.status === "Pending" && (
                                //  <Link to={`/dashboard/payment/${booking._id}`}>

                                <button
                                    onClick={() => handlePayment(booking)}
                                    className="bg-[#1E595D] text-white py-2 px-4 rounded-lg hover:bg-[#174648]">
                                    Pay Now
                                </button>
                                // </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
