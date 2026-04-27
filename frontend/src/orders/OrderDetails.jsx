import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../features/order/orderSlice';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, id]);

    if (loading) return <div className="text-center py-20 text-xl font-bold">Loading...</div>;

    return (
        <>
            <PageTitle title="Order Details" />
            <Navbar />
            <main className="container mx-auto px-4 py-10 max-w-6xl min-h-screen">
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                    <Link to="/orders/user" className="text-blue-600 hover:underline text-sm">Back to orders</Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Items Table */}
                    <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-6">
                        <h2 className="font-semibold text-gray-800 mb-4">Items Ordered</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="py-3 px-4">Product</th>
                                    <th className="py-3 px-4">Price</th>
                                    <th className="py-3 px-4">Qty</th>
                                    <th className="py-3 px-4">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {order?.orderItems?.map((item) => (
                                    <tr key={item._id}>
                                        <td className="py-3 px-4 flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                            <span className="font-medium">{item.name}</span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">₹{item.price}</td>
                                        <td className="py-3 px-4 text-gray-600">{item.quantity}</td>
                                        <td className="py-3 px-4 font-medium">₹{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Right: Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white border rounded-xl shadow-sm p-6">
                            <h2 className="font-semibold text-gray-800 mb-3">Shipping Information</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {order?.shippingAddress?.address},<br/>
                                {order?.shippingAddress?.city}, {order?.shippingAddress?.state}<br/>
                                Pin: {order?.shippingAddress?.pinCode}<br/>
                                Ph: {order?.shippingAddress?.phoneNo}
                            </p>
                        </div>

                        <div className="bg-white border rounded-xl shadow-sm p-6 space-y-3 text-sm">
                            <h2 className="font-semibold text-gray-800 mb-3">Summary</h2>
                            <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span>{order?._id}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className="text-green-600 font-medium">Paid</span></div>
                            <div className="flex justify-between border-b pb-3"><span className="text-gray-500">Status</span><span className="text-blue-600 font-medium">{order?.orderStatus}</span></div>
                            
                            <div className="flex justify-between pt-2"><span className="text-gray-500">Subtotal</span><span>₹{order?.itemPrice}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>₹{order?.taxPrice?.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{order?.shippingPrice === 0 ? 'Free' : `₹${order?.shippingPrice}`}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-3"><span>Total</span><span>₹{order?.totalPrice}</span></div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default OrderDetails;