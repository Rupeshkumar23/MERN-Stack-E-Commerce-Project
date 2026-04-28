import React, { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    PlusCircle, 
    ClipboardList, 
    Users, 
    MessageSquare, 
    TrendingUp,
    IndianRupee,
    PackageCheck,
    PackageX,
    Star
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, fetchAdminProducts, fetchUsers, fetchAllReviews } from '../features/admin/adminSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { 
        totalAmount, 
        orders, 
        productCount, 
        outOfStock, 
        users, 
        reviews 
    } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAllOrders());
        dispatch(fetchAdminProducts());
        dispatch(fetchUsers());
        dispatch(fetchAllReviews());
    }, [dispatch]);

    const stats = [
        {
            title: "Total Revenue",
            value: `₹${totalAmount ? totalAmount.toFixed(2) : 0}`,
            icon: <IndianRupee size={20} />,
            bg: "bg-emerald-50 text-emerald-600",
            border: "border-emerald-100",
        },
        {
            title: "Total Orders",
            value: orders?.length || 0,
            icon: <ClipboardList size={20} />,
            bg: "bg-blue-50 text-blue-600",
            border: "border-blue-100",
        },
        {
            title: "Products",
            value: productCount || 0,
            icon: <ShoppingBag size={20} />,
            bg: "bg-indigo-50 text-indigo-600",
            border: "border-indigo-100",
        },
        {
            title: "Active Users",
            value: users?.length || 0,
            icon: <Users size={20} />,
            bg: "bg-purple-50 text-purple-600",
            border: "border-purple-100",
        },
        {
            title: "In Stock",
            value: (productCount - outOfStock) || 0,
            icon: <PackageCheck size={20} />,
            bg: "bg-amber-50 text-amber-600",
            border: "border-amber-100",
        },
        {
            title: "Out Of Stock",
            value: outOfStock || 0,
            icon: <PackageX size={20} />,
            bg: "bg-rose-50 text-rose-600",
            border: "border-rose-100",
        },
        {
            title: "Total Reviews",
            value: reviews?.length || 0,
            icon: <Star size={20} />,
            bg: "bg-orange-50 text-orange-600",
            border: "border-orange-100",
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageTitle title="Admin Dashboard" />
            <Navbar />
            <main className="flex-1 flex overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-10 flex items-center justify-between border-b border-gray-200 pb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <TrendingUp size={24} className="text-indigo-600" />
                                    Dashboard Overview
                                </h1>
                                <p className="text-sm text-gray-500 font-medium mt-1">Real-time statistics for your store performance</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${stat.bg} shrink-0 ${stat.border} border`}>
                                            {stat.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</span>
                                            <span className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-lg font-bold text-gray-900">Your store is doing great!</h2>
                                <p className="text-sm text-gray-500 mt-1 font-medium">Keep monitoring these stats to optimize your business operations.</p>
                            </div>
                            <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
                                <TrendingUp size={24} className="text-indigo-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard;