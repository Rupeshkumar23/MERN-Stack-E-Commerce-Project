import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Navbar from '../../components/Navbar';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");

    return (
        <>
        <PageTitle title="Payment Success" />
        <Navbar />
        <div className="container mx-auto px-4 w-full flex justify-center mt-20">
            <div className="bg-white rounded shadow p-6 max-w-md w-full text-center">
                <div className="flex flex-col items-center justify-center h-24 w-24 rounded-full bg-emerald-50 mb-6 border-8 border-emerald-100 shadow-sm mx-auto relative">
                    <i className="fa-solid fa-check text-emerald-500 text-5xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Payment Successful!</h2>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm md:text-base">Thank you for your purchase. Your payment was processed successfully.</p>
                <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 shadow-inner">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Transaction Reference</p>
                    <p className="text-sm font-mono text-slate-700 break-all select-all">{reference}</p>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                    <Link to="/" className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 focus:ring-4 focus:ring-emerald-500/20 outline-none flex items-center justify-center gap-2">
                        Continue Shopping <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <Link to="/orders/users" className="w-full py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors focus:ring-4 focus:ring-slate-100 outline-none block">
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default PaymentSuccess;