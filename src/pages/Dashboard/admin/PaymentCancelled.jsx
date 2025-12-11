import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is Cancelled. Please try again</h2>
            <Link to="/dashboard/bookings"><button className="px-4 py-2 bg-[#C8A870] text-[#1E595D] rounded-lg font-semibold hover:opacity-90">Try again</button></Link>
        </div>
    );
};

export default PaymentCancelled;