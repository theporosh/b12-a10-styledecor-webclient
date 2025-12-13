import React from "react";
import { Link, useRouteError } from "react-router";
import { Home, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <AlertTriangle className="w-20 h-20 text-[#C8A870]" />
                </div>

                {/* Status */}
                <h1 className="text-6xl font-extrabold text-[#1E595D] mb-2">
                    {error?.status || 404}
                </h1>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-600 mb-6">
                    The page you are looking for doesn’t exist or an unexpected error has occurred.
                </p>

                {/* Error message */}
                {error?.statusText || error?.message ? (
                    <div className="bg-gray-100 text-sm text-gray-700 p-3 rounded-lg mb-6">
                        {error.statusText || error.message}
                    </div>
                ) : null}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1E595D] text-white rounded-xl font-semibold hover:bg-[#174648] transition"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="px-6 py-3 border-2 border-[#C8A870] text-[#C8A870] rounded-xl font-semibold hover:bg-[#C8A870] hover:text-[#1E595D] transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
