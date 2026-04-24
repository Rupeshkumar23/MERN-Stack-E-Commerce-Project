import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCartItem, removeItemFromCart } from '../../features/cart/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.quantity);

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const newQty = quantity - 1;
        setQuantity(newQty);
        dispatch(addToCartItem({ id: item.product, quantity: newQty }));
    };

    const increaseQuantity = () => {
        if (item.stock <= quantity) return;
        const newQty = quantity + 1;
        setQuantity(newQty);
        dispatch(addToCartItem({ id: item.product, quantity: newQty }));
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="font-bold text-amber-600 mt-2">₹ {item.price}</p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center gap-2">
                    <button onClick={decreaseQuantity} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={increaseQuantity} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Plus size={16} />
                    </button>
                </div>
                <button onClick={() => dispatch(removeItemFromCart(item.product))} className="text-red-500 hover:text-red-700 transition-colors ml-2">
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;