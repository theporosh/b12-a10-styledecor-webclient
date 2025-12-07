import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaPinterestP, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-[#1E595D] text-white py-14 mt-20">
            <div className="w-11/12 mx-auto grid md:grid-cols-4 gap-10">

                {/* Logo + Description */}
                <div>
                    <Logo size="lg" />
                    <p className="mt-4 text-sm leading-relaxed text-gray-200">
                        StyleDecor is your trusted partner for home & ceremony decoration.
                        Book consultations, explore packages, choose service mode,
                        and track your decoration journey effortlessly.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="footer-title mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link className="footer-link" to="/">Home</Link></li>
                        <li><Link className="footer-link" to="/services">Services</Link></li>
                        <li><Link className="footer-link" to="/about">About Us</Link></li>
                        <li><Link className="footer-link" to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Business Hours */}
                <div>
                    <h3 className="footer-title mb-4">Business Hours</h3>
                    <ul className="space-y-2 text-gray-200 text-sm">
                        <li>🕒 Monday – Friday: 9:00 AM – 8:00 PM</li>
                        <li>🕒 Saturday: 10:00 AM – 6:00 PM</li>
                        <li>🛑 Sunday: Closed</li>
                    </ul>
                </div>

                {/* Contact + Social */}
                <div>
                    <h3 className="footer-title mb-4">Contact Us</h3>

                    <p className="text-gray-200 text-sm">📍 Dhaka, Bangladesh</p>
                    <p className="text-gray-200 text-sm">📞 +880 1234-567890</p>
                    <p className="text-gray-200 text-sm">📧 support@styledecor.com</p>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4">
                        <Link className="footer-icon"><FaFacebookF /></Link>
                        <Link className="footer-icon"><FaInstagram /></Link>
                        <Link className="footer-icon"><FaLinkedinIn /></Link>
                        <Link className="footer-icon"><FaPinterestP /></Link>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="text-center border-t border-gray-500 mt-10 pt-6 text-sm text-gray-300">
                © {new Date().getFullYear()} StyleDecor. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;


