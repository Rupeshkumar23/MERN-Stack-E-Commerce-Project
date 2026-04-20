import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  const [rating, setRating] = useState(product.ratings || 0);
  const productImage =
    product?.image?.[0]?.url ||
    product?.image?.url ||
    product?.images?.[0]?.url ||
    product?.images?.url ||
    "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100 group block">
        <Link to={`/product/${product._id}`} className="group block">
            <img src={productImage} alt={product.name} className="h-56 w-full object-cover group-hover:scale-105 transition" loading="lazy" />
        </Link>
        <div className="p-4 space-y-2">
            <Link to={`/product/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between">
                <Rating value={rating} onRatingChange={(r) => setRating(r)} />
                <span className="text-xs text-gray-500 font-semibold">({product.numOfReviews} reviews)</span>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-blue-600 font-bold text-lg">₹{product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition">Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Product