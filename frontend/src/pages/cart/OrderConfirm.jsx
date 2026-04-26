import React from "react";
import PageTitle from "../../components/PageTitle";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutPath from "./CheckoutPath";

const OrderConfirm = () => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharges = cartItems.length === 0 ? 0 : subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCharges + tax;

  const processToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      total,
    };
    sessionStorage.setItem("orderItem", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <PageTitle title="Confirm Order" />
      <Navbar />
      <main className="min-h-screen pt-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <CheckoutPath activeStep={2} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Order Confirmation</h2>
                <Link to="/shipping" className="text-blue-600 hover:text-blue-700 text-sm">
                  Go Back
                </Link>
              </div>

              <div className="bg-white rounded shadow p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Name</p>
                    <p className="text-slate-800 font-medium capitalize">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Phone</p>
                    <p className="text-slate-800 font-medium">{shippingInfo.phoneNumber}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-slate-500 mb-1">Address</p>
                    <p className="text-slate-800 font-medium">
                      {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
                      {shippingInfo.country} - {shippingInfo.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
                  Your Cart Items
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:border-slate-200 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md border border-slate-200"
                          />
                          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-800 font-medium line-clamp-1">
                            {item.name}
                          </span>
                          <span className="text-sm text-slate-500">
                            ₹{item.price} each
                          </span>
                        </div>
                      </div>
                      <div className="text-slate-800 font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-800">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping Charges</span>
                    <span className="font-semibold text-emerald-600">
                      {shippingCharges === 0 ? "Free" : `₹${shippingCharges.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-4">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-semibold text-slate-800">
                      ₹{tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-bold text-slate-800">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={processToPayment}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-lg shadow-blue-600/30 py-3.5 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Proceed to payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirm;