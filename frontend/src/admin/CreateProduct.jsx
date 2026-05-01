import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
import { createProduct, removeErrors, removeSuccess } from "../features/admin/adminSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dress");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, error, success } = useSelector((state) => state.admin);

  const categories = [
    "Electronics",
    "Shoes",
    "Clothing",
    "Home",
    "Accessories",
  ];

    const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const filteredImagesPreview = imagesPreview.filter((_, i) => i !== index);
    const filteredImages = images.filter((_, i) => i !== index);
    
    setImagesPreview(filteredImagesPreview);
    setImages(filteredImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("mrp", mrp);

    images.forEach((image) => {
      myForm.append("image", image);
    });

    setSubmitted(true);
    dispatch(createProduct(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }

    if (success && submitted) {
      toast.success("Product Created Successfully");
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
  }, [dispatch, error, success, navigate, submitted]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageTitle title="Create Product" />
      <Navbar />

      <main className="flex-1 flex overflow-hidden">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <Link
                  to="/admin/products"
                  className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors mb-2"
                >
                  <ChevronLeft size={16} />
                  Back To Products
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Plus className="text-indigo-600" />
                  Create New Product
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                  Add a new item to your store's catalog
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 space-y-8"
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Package size={16} className="text-gray-400" />
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Premium Cotton T-Shirt"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <AlignLeft size={16} className="text-gray-400" />
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  placeholder="Speak more about your product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="price"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <IndianRupee size={16} className="text-gray-400" />
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    required
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="mrp"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <IndianRupee size={16} className="text-gray-400" />
                    MRP
                  </label>
                  <input
                    type="number"
                    id="mrp"
                    required
                    placeholder="0.00"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="stock"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Box size={16} className="text-gray-400" />
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    required
                    placeholder="e.g. 50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Tag size={16} className="text-gray-400" />
                    Product Category
                  </label>
                  <select
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                  >
                    <option value="">Select a Category</option>
                    {categories.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Upload size={16} className="text-gray-400" />
                  Product Images
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                      Upload Images
                    </span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={createProductImageChange}
                    />
                  </label>

                  {/* Previews */}
                  {imagesPreview.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50"
                    >
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-white/90 shadow-sm rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Product"
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

export default CreateProduct;