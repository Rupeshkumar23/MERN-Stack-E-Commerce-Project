import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import CartItem from './CartItem';
import { clearCart } from '../../features/cart/cartSlice';
import Footer from '../../components/Footer';
import PageTitle from '../../components/PageTitle';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
// Import your layout components like Navbar, Footer, etc.

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.18;
    const shippingCharges = cartItems.length === 0 ? 0 : subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + shippingCharges;
    const checkoutHandler = () => {
  navigate("/login?redirect=shipping");
};

    return (
        <div className="min-h-screen bg-gray-50">
            <PageTitle title="Your Cart"/>
        <Navbar/>
            <main className="pt-20 pb-10 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-800">Your Cart</h2>
                                    <button onClick={() => dispatch(clearCart())} className="text-red-500 hover:text-red-700 transition-colors flex items-center text-sm font-semibold">
                                        <Trash2 size={16} className="mr-1"/> Clear Cart
                                    </button>
                                </div>
                                
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">Your cart is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <CartItem item={item} key={item.product} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-bold">₹ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-bold">₹ {shippingCharges.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax 18%</span>
                                        <span className="font-bold">₹ {tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between">
                                            <span className="text-xl font-bold text-slate-800">Total</span>
                                            <span className="text-xl font-bold text-amber-600">₹ {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={checkoutHandler} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-6 transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Cart;