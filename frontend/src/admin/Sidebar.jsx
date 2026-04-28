import React from 'react';
import { LayoutDashboard, ShoppingBag, PlusCircle, ClipboardList, Users, MessageSquare, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        {
            title: "Dashboard",
            path: "/admin/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            title: "All Products",
            path: "/admin/products",
            icon: <ShoppingBag size={20} />,
        },
        {
            title: "Add Product",
            path: "/admin/product/create",
            icon: <PlusCircle size={20} />,
        },
        {
            title: "All Orders",
            path: "/admin/orders",
            icon: <ClipboardList size={20} />,
        },
        {
            title: "All Users",
            path: "/admin/users",
            icon: <Users size={20} />,
        },
        {
            title: "All Reviews",
            path: "/admin/reviews",
            icon: <MessageSquare size={20} />,
        }
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] hidden md:block shrink-0">
            <div className="flex flex-col h-full py-6">
                <div className="px-6 mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</p>
                </div>
                <nav className="flex-1 space-y-1 px-3">
                    {menuItems.map((item) => (
                        <NavLink 
                            key={item.path} 
                            to={item.path} 
                            className={({isActive}) => {
                                const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200";
                                const activeStateClasses = isActive 
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
                                return `${baseClasses} ${activeStateClasses}`;
                            }}
                        >
                            <span>{item.icon}</span>
                            <span>{item.title}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="px-3 mt-auto border-t border-gray-100 pt-4">
                    <NavLink to="/logout" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;