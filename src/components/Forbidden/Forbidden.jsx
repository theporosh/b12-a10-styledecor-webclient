import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-4xl">
                    🚫
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    403 – Access Forbidden
                </h1>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    You don’t have permission to access this page.
                    Please contact the administrator if you think this is a mistake.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="px-5 py-2 rounded-lg bg-[#1E595D] text-white font-semibold hover:opacity-90 transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
