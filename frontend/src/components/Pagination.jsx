import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Do not show pagination if only 1 page
    if (totalPages <= 1) return null;

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageWindow = 2;
        for (let i = Math.max(1, currentPage - pageWindow); i <= Math.min(totalPages, currentPage + pageWindow); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const btnBase = "relative inline-flex items-center justify-center w-10 h-10 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full mx-1";
    const activeBtn = "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-600 ring-offset-2 scale-110";
    const inactiveBtn = "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 border border-transparent";
    const controlBtn = "bg-white border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 shadow-sm";

    return (
        <div className="flex flex-col items-center justify-center gap-4 my-12">
            <div className="flex items-center p-2 bg-white rounded-full shadow-md border border-gray-100">
                {/* First & Prev */}
                <div className="flex gap-1 mr-2 border-r pr-2 border-gray-100">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                        className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
                        title="First Page"
                    >
                        <ChevronsLeft size={20} />
                    </button>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
                        title="Previous"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Page Number */}
                <div className="flex gap-1">
                    {getPageNumbers().map((number) => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`${btnBase} ${currentPage === number ? activeBtn : inactiveBtn}`}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                {/* Next & Last */}
                <div className="flex gap-1 ml-2 border-l pl-2 border-gray-100">
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
                        title="Next"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}
                        title="Last Page"
                    >
                        <ChevronsRight size={20} />
                    </button>
                </div>
            </div>
            
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );
};

export default Pagination;