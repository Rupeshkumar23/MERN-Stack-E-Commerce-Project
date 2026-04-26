import React from "react";
import PageTitle from "../../components/PageTitle";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link } from "react-router-dom";

const Payment = () => {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));

  return (
    <>
      <PageTitle title="Payment" />
      <Navbar />
      <main className="min-h-screen pt-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <CheckoutPath activeStep={3} />
            <div className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-800">Payment Information</h2>
                <Link to="/order/confirm" className="text-blue-600 hover:text-blue-700 text-sm">
                  Go Back
                </Link>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Payment</h2>
                <button className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                  Pay (Rs.{orderItem?.total})
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;