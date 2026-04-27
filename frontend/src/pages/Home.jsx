import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader"; 
import toast from "react-hot-toast"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice"; // 3. Import removeErrors

const Home = () => {
  const dispatch = useDispatch();
  const { products, productCount, loading, error } = useSelector((state) => state.product);

  // Fetch products on mount
  useEffect(() => {
    dispatch(getProduct({keyword: ""})); 
  }, [dispatch]);

  // 4. Add useEffect to handle error toast notifications
  useEffect(() => {
    if (error) {
      // If error is an object (from your backend payload), you might need error.message
      // If it's a string, just pass error directly. Adjust based on your API response.
      toast.error(error.message || error); 
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  // 5. Conditionally return Loader if loading is true
  return loading ? (
    <Loader />
  ) : (
    <>
      <PageTitle title="Home | E-Commerce" />
      <Navbar />
      <ImageSlider />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-around text-gray-900">
        <h1 className="text-4xl font-semibold mb-8 text-blue-700 text-center drop-shadow-sm">
          Latest Collections
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products && products.map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;