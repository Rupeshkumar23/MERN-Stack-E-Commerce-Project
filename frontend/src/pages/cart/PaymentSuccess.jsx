import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import  toast  from 'react-hot-toast';
import { createOrder, removeErrors, removeSuccess } from '../../features/order/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, success } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
      if (!orderItem) return;

      const orderData = {
        shippingAddress: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          pinCode: shippingInfo.pinCode,
          phoneNo: shippingInfo.phoneNo,
        },
        orderItems: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          product: item.product,
        })),
        paymentInfo: {
          id: reference,
          status: "succeeded",
        },
        itemPrice: orderItem.subtotal,
        taxPrice: orderItem.tax,
        shippingPrice: orderItem.shippingCharges,
        totalPrice: orderItem.total,
      };

      const createOrderData = async () => {
        try {
          dispatch(createOrder(orderData));
        } catch (error) {
          toast.error("Order Creation Error");
        }
      };

      createOrderData();
    } catch (error) {
      toast.error("Error formatting order data");
    }
  }, [dispatch, reference, cartItems, shippingInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center" });
      dispatch(removeErrors());
    }

    if (success) {
      dispatch(removeSuccess());
      dispatch(clearCart());
      sessionStorage.removeItem("orderItem");
    }
  }, [dispatch, error, success]);

  return (
    <>
      <PageTitle title="Payment Success" />
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="h-20 w-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-check text-green-500 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-6">Thank you for your purchase.</p>
          
          {reference && (
             <div className="bg-gray-50 p-3 rounded mb-6 text-sm">
                 <p className="text-gray-500">Transaction Reference</p>
                 <p className="font-semibold">{reference}</p>
             </div>
          )}

          <div className="flex flex-col gap-3">
             <Link to="/products" className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
               Continue Shopping
             </Link>
             <Link to="/orders/user" className="border py-3 rounded-lg text-gray-600 font-semibold hover:bg-gray-50">
               View My Orders
             </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default PaymentSuccess;