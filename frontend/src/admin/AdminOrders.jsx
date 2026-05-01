import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';
import { fetchAllOrders } from '../features/admin/adminSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageTitle title="All Orders | Admin Dashboard" />
      <Navbar />

      <main className="flex-1 flex overflow-hidden">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {orders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-4 py-2">{order._id}</td>
                          <td className="px-4 py-2">{order.user?.name || 'N/A'}</td>
                          <td className="px-4 py-2">{order.orderStatus}</td>
                          <td className="px-4 py-2">₹{order.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;