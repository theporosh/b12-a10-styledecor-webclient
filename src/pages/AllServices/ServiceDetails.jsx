import { useLocation, useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ServiceDetails = () => {

    const axiosSecure = useAxiosSecure();

    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const [locations, setLocations] = useState("");

    // Fetch service data by ID
    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axiosSecure.get(`/services/${id}`);
                setService(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load service");
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    const handleBookNow = () => {
        if (!user) {
            // navigate("/login");
            navigate(location.state || '/login');
            return;
        }
        setIsOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!service) return;

        const bookingData = {
            serviceId: service._id,
            serviceTitle: service.title,
            price: service.price,
            duration: service.duration,
            category: service.category,
            image: service.image,
            customerName: user.displayName,
            customerEmail: user.email,
            bookingDate,
            locations,
            status: "Pending",
            
        };

        try {
            const res = await axiosSecure.post("/bookings", bookingData);
            if (res.data.insertedId) {
                toast.success("Booking Successful! Please pay now");
                navigate('/dashboard/bookings')
                setIsOpen(false);
                
            }
        } catch (err) {
            console.error(err);
            toast.success("Booking Failed!");
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!service) return null;

    return (
        <div className="max-w-4xl mx-auto py-10">
            <img src={service.image} className="rounded-lg w-full h-80 object-cover" />
            <h2 className="text-3xl font-bold mt-5">{service.title}</h2>
            <p className="text-lg mt-3">{service.description}</p>
            <div className="mt-5 text-lg space-y-1">
                <p><b>Price:</b> {service.price} TK</p>
                <p><b>Duration:</b> {service.duration}</p>
                <p><b>Category:</b> {service.category}</p>
            </div>
            <button
                onClick={handleBookNow}
                className="mt-6 px-6 py-3 rounded-xl bg-[#1E595D] text-white hover:bg-[#174648]"
            >
                Book Now
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <h3 className="text-xl font-bold text-center mb-4">Confirm Your Booking</h3>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />

                            <input type="email" value={user.email} readOnly className="input input-bordered w-full" />

                            <input type="text" value={service.title} readOnly className="input input-bordered w-full" />

                            <input type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="input input-bordered w-full" />

                            <input type="text" placeholder="Enter location" required value={locations} onChange={e => setLocations(e.target.value)} className="input input-bordered w-full" />

                            <button className="btn bg-[#C8A870] w-full text-white">Confirm Booking</button>
                            <button type="button" onClick={() => setIsOpen(false)} className="btn btn-ghost w-full">Cancel</button>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;
