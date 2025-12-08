import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Amina Rahman",
        location: "Dhaka, Bangladesh",
        rating: 5,
        review:
            "StyleDecor completely transformed my home! Their attention to detail and elegant decoration style exceeded my expectations."
    },
    {
        id: 2,
        name: "Sajid Ahmed",
        location: "Chattogram, Bangladesh",
        rating: 4,
        review:
            "The decorators were highly professional and perfectly understood what I wanted for my event. Loved the result!"
    },
    {
        id: 3,
        name: "Nupur Das",
        location: "Sylhet, Bangladesh",
        rating: 5,
        review:
            "Amazing experience! The booking process was smooth, and the decoration team delivered exactly what they promised."
    },
    {
        id: 4,
        name: "Rafiul Hasan",
        location: "Rajshahi, Bangladesh",
        rating: 5,
        review:
            "Very organized and creative! I booked for my sister’s wedding, and the setup was absolutely beautiful."
    }
];

const CustomerReviews = () => {
    return (
        <section className="py-20 bg-white">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E595D]">
                    Happy <span className="text-[#C8A870]">Customer Reviews</span>
                </h2>

                <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                    What our clients say after booking decoration services from StyleDecor.
                </p>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 3500 }}
                    pagination={{ clickable: true }}
                    className="mt-14 max-w-3xl mx-auto"
                >
                    {reviews.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="p-10 rounded-2xl shadow-md border border-gray-200 bg-white">
                                <div className="flex justify-center mb-4 text-[#C8A870] text-xl">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                                    “{item.review}”
                                </p>

                                <h4 className="mt-6 text-xl font-semibold text-[#1E595D]">
                                    {item.name}
                                </h4>

                                <p className="text-gray-500">{item.location}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CustomerReviews;
