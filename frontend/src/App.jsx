import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./User/Register";
import Login from "./User/Login";
import Profile from "./User/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./features/user/userSlice";
import UpdateProfile from "./User/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePassword from "./User/UpdatePassword";
import ForgetPassword from "./User/ForgetPassword";
import ResetPassword from "./User/ResetPassword";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/Shipping";
import OrderConfirm from "./pages/cart/OrderConfirm";
import Payment from "./pages/cart/Payment";
import PaymentSuccess from "./pages/cart/PaymentSuccess";
import MyOrders from "./orders/MyOrders";
import OrderDetails from "./orders/OrderDetails";
import Dashboard from "./admin/Dashboard";
import ProductList from "./admin/ProductList";



const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<OrderConfirm />} />} />
        <Route path="/process/payment" element={<ProtectedRoute element={<Payment />} />} />
        <Route path="/payment/success" element={<ProtectedRoute element={<PaymentSuccess />} />} />
        <Route path="/orders/user" element={<ProtectedRoute element={<MyOrders />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails/>} />} />
         <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true} element={<Dashboard />} />} />
        <Route path="/admin/products" element={<ProtectedRoute adminOnly={true} element={<ProductList />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;