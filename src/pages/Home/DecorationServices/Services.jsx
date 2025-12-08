import { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/packages")
        // axios.get("/public/demo.json")
            .then(res => setServices(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="py-20 bg-gray-50" id="services">
            <div className="w-11/12 mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-[#1E595D] mb-10">
                    Our Decoration Services
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">{service.category}</p>

                                <p className="text-[15px] text-gray-600 mt-3">
                                    {service.description}
                                </p>

                                <div className="flex justify-between items-center mt-5">
                                    <span className="text-lg font-bold text-[#1E595D]">
                                        ৳ {service.price}
                                    </span>

                                    <button className="px-4 py-2 bg-[#1E595D] text-white rounded-lg hover:bg-[#17494c] transition">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
