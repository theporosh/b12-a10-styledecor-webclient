import React from "react";
import { Paintbrush, CalendarCheck, Users } from "lucide-react";

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1E595D] mb-4">
                        About StyleDecor
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        StyleDecor is a modern appointment management system designed for a
                        professional decoration company offering both in-studio consultations
                        and on-site decoration services.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <Paintbrush className="w-12 h-12 text-[#C8A870] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Creative Decoration</h3>
                        <p className="text-gray-600">
                            From weddings to home interiors, we provide elegant and customized
                            decoration packages that suit your style and budget.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <CalendarCheck className="w-12 h-12 text-[#C8A870] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                        <p className="text-gray-600">
                            Users can explore services, check availability, select date & time,
                            and book instantly with secure online payments.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <Users className="w-12 h-12 text-[#C8A870] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Expert Decorators</h3>
                        <p className="text-gray-600">
                            Our skilled decorators ensure premium quality service and real-time
                            project status tracking for complete transparency.
                        </p>
                    </div>

                </div>

                {/* Mission */}
                <div className="mt-16 bg-[#1E595D] text-white rounded-2xl p-10 text-center">
                    <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                    <p className="max-w-3xl mx-auto">
                        Our mission is to simplify decoration service management through
                        technology while delivering stunning experiences for every special
                        occasion.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
