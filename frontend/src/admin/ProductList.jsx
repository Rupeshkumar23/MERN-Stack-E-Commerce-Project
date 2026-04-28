import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';

const ProductList = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageTitle title="Admin Dashboard" />
            <Navbar />
            
            <main className="flex-1 flex overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {/* The content for the Product List goes here */}
                    <div>ProductList</div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ProductList;