import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1E595D] mb-4">
                        Contact Us
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to book a decoration service? Reach out to us
                        and our team will get back to you shortly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">

                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl shadow p-8 space-y-6">

                        <div className="flex items-center gap-4">
                            <Mail className="w-6 h-6 text-[#C8A870]" />
                            <div>
                                <h4 className="font-semibold">Email</h4>
                                <p className="text-gray-600">support@styledecor.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Phone className="w-6 h-6 text-[#C8A870]" />
                            <div>
                                <h4 className="font-semibold">Phone</h4>
                                <p className="text-gray-600">+880 1234-567890</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <MapPin className="w-6 h-6 text-[#C8A870]" />
                            <div>
                                <h4 className="font-semibold">Office Address</h4>
                                <p className="text-gray-600">
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow p-8">
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows="5"
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#1E595D] text-white rounded-xl font-semibold hover:bg-[#174648] transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
