import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TrendingUp, Edit, Trash2 } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';
import { fetchAdminProducts } from '../features/admin/adminSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);

    // Get data from Redux store
    const { products, loading, productCount, resultsPerPage } = useSelector(
        (state) => state.admin
    );

    // Fetch products whenever the page changes
    useEffect(() => {
        dispatch(fetchAdminProducts(currentPage));
    }, [dispatch, currentPage]);

    // Calculate total pages
    const totalPages = Math.ceil(productCount / resultsPerPage) || 1;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageTitle title="All Products | Admin Dashboard" />
            <Navbar />
            
            <main className="flex-1 flex overflow-hidden">
                <Sidebar />
                
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* Header Section */}
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <TrendingUp className="text-indigo-600" size={28} />
                                All Products
                            </h1>
                            <p className="text-gray-500 mt-2 font-medium">
                                Manage all the products in your store
                            </p>
                        </div>

                        {/* Table Container */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-20 text-center text-gray-500 font-medium">
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                                        <p>Loading Products...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : products?.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-20 text-center text-gray-500 font-medium">
                                                    No Products Found
                                                </td>
                                            </tr>
                                        ) : (
                                            products?.map((product) => (
                                                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-200">
                                                    
                                                    {/* Image and Name */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-12 w-12 rounded-lg border border-gray-100 overflow-hidden shrink-0">
                                                                <img 
                                                                    src={product.image[0]?.url} 
                                                                    alt={product.name} 
                                                                    className="w-full h-full object-cover" 
                                                                />
                                                            </div>
                                                            <Link 
                                                                to={`/product/${product._id}`} 
                                                                className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
                                                            >
                                                                {product.name}
                                                            </Link>
                                                        </div>
                                                    </td>

                                                    {/* Price */}
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            ₹{product.price.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>

                                                    {/* Stock Status Badge */}
                                                    <td className="px-6 py-4">
                                                        {product.stock === 0 ? (
                                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                                                                Out of Stock
                                                            </span>
                                                        ) : product.stock < 10 ? (
                                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                                                                Low Stock: {product.stock}
                                                            </span>
                                                        ) : (
                                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                                In Stock: {product.stock}
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Action Buttons */}
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link 
                                                                to={`/admin/product/${product._id}`} 
                                                                title="Edit Product"
                                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                            >
                                                                <Edit size={18} />
                                                            </Link>
                                                            <button 
                                                                title="Delete Product"
                                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Footer */}
                            {!loading && productCount > 0 && (
                                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                                    <span className="text-sm text-gray-500 font-medium">
                                        Showing {(currentPage - 1) * resultsPerPage + 1} to {Math.min(currentPage * resultsPerPage, productCount)} of {productCount} products
                                    </span>
                                    
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-sm text-gray-700 font-bold px-2">
                                            {currentPage} / {totalPages}
                                        </span>
                                        <button 
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ProductList;