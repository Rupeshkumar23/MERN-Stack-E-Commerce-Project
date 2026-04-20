import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import Product from '../components/Product';

import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'; 
import Pagination from '../components/Pagination';

const Products = () => {
    // Extracted resultsPerPage
    const { products, productCount, loading, error, resultsPerPage } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    // URL parameter extraction
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    // Pagination state
    const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const totalPages = Math.ceil(productCount / (resultsPerPage || 8));
    
    const navigate = useNavigate();
    const location = useLocation();

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            const newSearchParams = new URLSearchParams(location.search);
            if (pageNumber === 1) {
                newSearchParams.delete("page");
            } else {
                newSearchParams.set("page", pageNumber);
            }
            navigate(`?${newSearchParams.toString()}`);
        }
    };

    const handleCategory = (cat)=>{
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.delete("page");
        if(cat === "All"){
            newSearchParams.delete("category");
        } else {
            newSearchParams.set("category", cat);
        }
        navigate(`?${newSearchParams.toString()}`);
    }

    // Dispatch getProduct with keyword and page
    useEffect(() => {
        dispatch(getProduct({ keyword, page: currentPage, category }));
    }, [dispatch, keyword, currentPage, category]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <PageTitle title="Products | E-Commerce" />
                <Navbar />

                <main className="grow container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-1/4">
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-slate-200 pb-2">Categories</h3>
                                <ul className="space-y-2">
                                    {["All","Electronics", "Shoes", "Clothing", "Home", "Accessories"].map((cat) => (
                                        <li key={cat}>
                                            <button onClick={()=>handleCategory(cat)} className="text-gray-600 hover:text-blue-600 transition-colors">{cat}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        <section className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">Our Products</h3>
                                <span className="text-gray-500 text-sm">{products?.length || 0} items found</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products && products.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>

                            {/* No Products */}
                            {products?.length === 0 && (
                                <div className="text-center py-20">
                                    <p className="text-gray-500 text-lg">No product found</p>
                                </div>
                            )}

                        </section>
                    </div>

                    {/* Pagination Section */}
                    <div className="mt-12 flex justify-center">
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Products;