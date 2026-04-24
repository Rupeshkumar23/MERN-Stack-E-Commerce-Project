import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
// Make sure you have your Rating component imported correctly based on your project structure
import Rating from '../components/Rating'; 
import { PackageCheck, ShoppingCart, Minus, Plus, MessageSquare, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, removeErrors } from '../features/products/productSlice';
import { addToCartItem, removeErrors as removeCartErrors, removeMessage as removeCartMessage, removeSuccess as removeCartSuccess } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import { calculateDiscount, formatDate } from '../utils/formatter';

const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Local state for tracking quantity
  const [quantity, setQuantity] = useState(1);

  // Redux state for product and cart
  const { loading, error, product } = useSelector((state) => state.product);
  const { loading: cartLoading, error: cartError, success: cartSuccess, message: cartMessage } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
        dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  // Handle Product Errors
  useEffect(() => {
    if (error) {
        toast.error(error.message || error);
        dispatch(removeErrors());
    }
  }, [dispatch, error]);

  // Handle Cart Success/Errors
  useEffect(() => {
    if (cartSuccess && cartMessage) {
        toast.success(cartMessage);
        dispatch(removeCartMessage());
        dispatch(removeCartSuccess());
    }
    if (cartError) {
        toast.error(cartError);
        dispatch(removeCartErrors());
    }
  }, [dispatch, cartError, cartSuccess, cartMessage]);

  // Increase Quantity Handler
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
        toast.error("Cannot exceed available stock!");
        return;
    }
    setQuantity(quantity + 1);
  };

  // Decrease Quantity Handler
  const decreaseQuantity = () => {
    if (quantity <= 1) {
        toast.error("Quantity cannot be less than 1");
        return;
    }
    setQuantity(quantity - 1);
  };

  // Add to Cart Handler
  const addToCartHandler = () => {
    dispatch(addToCartItem({ id: product._id, quantity }));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-gray-50">
        <PageTitle title={`${product?.name || 'Product'} | Details`} />
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            
            {/* Top Section: Image & Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8">
                
                {/* Image Gallery */}
                <div className="aspect-square overflow-hidden rounded-xl">
                    {product?.image && product.image.length > 0 && (
                        <img 
                            src={product.image[0].url} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" 
                        />
                    )}
                </div>
                
                {/* Product Info */}
                <div>
                    <h3 className="text-3xl font-semibold text-gray-900 mb-2">{product?.name}</h3>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <Rating value={product?.ratings || 0} disabled={true} />
                        <span className="text-gray-500 font-medium">
                            {product?.numOfReviews || 0} Verified Reviews
                        </span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-3xl font-bold text-amber-600">₹ {product?.price}</span>
                        <span className="text-lg text-gray-400 line-through">₹ {product?.mrp}</span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                            {calculateDiscount(product?.price, product?.mrp)}% OFF
                        </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                        {product?.description}
                    </p>

                    <div className="border-t border-gray-100 pt-8 mb-8">
                        {product?.stock > 0 ? (
                            <>
                                <div className="flex items-center gap-2 mb-6">
                                    <PackageCheck className="text-green-600 w-5 h-5" />
                                    <span className="text-green-700 font-semibold text-sm">
                                        IN STOCK <span className="font-normal">({product?.stock} AVAILABLE)</span>
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    {/* Quantity Selectors */}
                                    <div className="flex items-center border-2 border-gray-100 rounded-xl bg-white overflow-hidden">
                                        <button onClick={decreaseQuantity} className="p-4 hover:bg-gray-50 text-gray-600 transition-colors">
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                        <button onClick={increaseQuantity} className="p-4 hover:bg-gray-50 text-gray-600 transition-colors">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    
                                    {/* Add To Cart Button */}
                                    <button 
                                        disabled={cartLoading}
                                        onClick={addToCartHandler}
                                        className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-100 ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <ShoppingCart /> 
                                        {cartLoading ? 'Adding...' : 'Add to Cart'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-red-600 font-bold text-lg">X</span>
                                <span className="text-red-700 font-semibold text-sm">OUT OF STOCK</span>
                            </div>
                        )}
                    </div>

                    {/* Review Form UI */}
                    <div className="mt-12 border-t border-gray-100 pt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageSquare size={18} className="text-amber-500" /> Share your feedback
                        </h3>
                        <div>
                            <div className="mb-4">
                                {/* Static value for UI purposes as shown in video */}
                                <Rating value={0} disabled={false} />
                            </div>
                            <textarea
                                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-amber-400 focus:ring-0 outline-none resize-none mb-4 text-sm bg-gray-50 transition-all"
                                rows="3"
                                placeholder="How was the product quality and delivery?"
                            ></textarea>
                            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200">
                                Post Review
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Section: Customer Reviews */}
            <div className="mt-20">
                <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-amber-500 pl-4 mb-10">
                    Customer Stories
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {product?.reviews?.map((rev, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-200 transition-colors group">
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={rev.avatar} 
                                        alt={rev.name} 
                                        className="w-14 h-14 rounded-full object-cover" 
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{rev.name}</h4>
                                        <div className="flex items-center gap-1.5">
                                            <Rating value={rev.rating} disabled={true} />
                                            <span className="text-xs text-gray-500 font-medium">Verified Reviews</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Calendar size={12} className="text-gray-400" />
                                    <span className="text-sm">{formatDate(rev.createdAt)}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-sm">
                                "{rev.comment}"
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        </main>
        <Footer />
    </div>
  );
}

export default ProductDetails;