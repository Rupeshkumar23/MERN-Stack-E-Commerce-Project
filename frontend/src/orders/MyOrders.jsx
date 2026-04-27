import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../features/order/orderSlice';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { orders, loading } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <>
            <PageTitle title="My Orders" />
            <Navbar />
            <main className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">My Orders</h1>
                    <p className="text-gray-500 mb-8">View and manage your recent purchases</p>

                    {loading ? (
                         <div className="text-center py-10">Loading...</div>
                    ) : (
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders && orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-600">#{order._id.substring(0, 8)}...</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{order.orderItems.length}</td>
                                            <td className="px-6 py-4 text-sm font-medium">₹{order.totalPrice.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline text-sm font-medium">
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default MyOrders;