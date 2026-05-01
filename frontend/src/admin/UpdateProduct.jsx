import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import {
  AlignLeft,
  Box,
  ChevronLeft,
  IndianRupee,
  Package,
  Plus,
  Tag,
  Upload,
  X,
  Loader2
} from "lucide-react";
import { getProductDetails, removeErrors } from "../features/products/productSlice";
import { updateProduct, removeErrors as removeAdminErrors, removeSuccess } from "../features/admin/adminSlice";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dress");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading: productLoading, error: productError, product } = useSelector((state) => state.product);
  const { loading: adminLoading, error: adminError, success } = useSelector((state) => state.admin);

  const categories = [
    "Electronics",
    "Shoes",
    "Clothing",
    "Home",
    "Accessories",
  ];

  // Fetch product details when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  // Populate form when product data is loaded
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setMrp(product.mrp || "");
      setDescription(product.description || "");
      setCategory(product.category || "Dress");
      setStock(product.stock || "");
      if (product.images) {
        setImagesPreview(product.images.map(img => img.url));
      }
    }
  }, [product]);

  // Handle errors
  useEffect(() => {
    if (productError) {
      toast.error(productError.message || productError);
      dispatch(removeErrors());
    }
    if (adminError) {
      toast.error(adminError.message || adminError);
      dispatch(removeAdminErrors());
    }
  }, [dispatch, productError, adminError]);

  // Handle success
  useEffect(() => {
    if (success && submitted) {
      toast.success("Product updated successfully!");
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
  }, [dispatch, success, submitted, navigate]);

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !mrp || !description || !category || !stock) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("mrp", mrp);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);

    // Only append images if new ones were selected
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("image", image);
      });
    }

    setSubmitted(true);
    dispatch(updateProduct({ id, productData: formData }));
  };

  const removeImage = (index) => {
    setImagesPreview(imagesPreview.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageTitle title="Update Product | Admin Dashboard" />
      <Navbar />

      <main className="flex-1 flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link
                to="/admin/products"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to Products
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Box className="text-indigo-600" size={28} />
                Update Product
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Modify product details and images
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="e.g. Premium Cotton T-Shirt"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* MRP */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      MRP (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        placeholder="0.00"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Stock <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        placeholder="e.g. 50"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <AlignLeft className="absolute left-3 top-3 text-gray-400" size={20} />
                      <textarea
                        placeholder="Speak more about your product..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Product Images */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Product Images
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={createProductImageChange}
                          />
                        </label>
                      </div>

                      {/* Image Previews */}
                      {imagesPreview.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                          {imagesPreview.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={adminLoading || productLoading}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {adminLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Update Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpdateProduct;