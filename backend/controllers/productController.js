import Product from "../models/productModel.js";
import HandleError from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

// Create Product (POST)
export const addProducts = async (req, res, next) => {
    try {
        req.body.user = req.user.id; 
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Get All Products from DB with Search, Filter, and Pagination (GET)
export const getAllProducts = async (req, res, next) => {
    try {
        // Set how many products you want to display per page
        const resultsPerPage = 6;

        // 1. Apply Search and Filter using APIHelper
        const apiHelper = new APIHelper(Product.find(), req.query).search().filter();

        // 2. Clone the query BEFORE pagination to get the total count of filtered products
        let filteredQuery = apiHelper.query.clone();
        const productCount = await filteredQuery.countDocuments();

        // Calculate Total Pages
        const totalPages = Math.ceil(productCount / resultsPerPage);
        const currentPage = Number(req.query.page) || 1;

        // Error handling: If user enters a page number that doesn't exist
        if (totalPages > 0 && currentPage > totalPages) {
            return next(new HandleError("This page doesn't exist", 404));
        }

        // 3. Apply Pagination and execute the final query
        apiHelper.pagination(resultsPerPage);
        const products = await apiHelper.query;

        // 4. Send the response with products and pagination metadata
        res.status(200).json({
            success: true,
            products,            // The actual product data array
            productCount,       // Total products found
            resultsPerPage,     // How many per page (e.g., 4)
            totalPages,         // Total number of pages
            currentPage,        // The current page the user is on
        });
    } catch (error) {
        next(error);
    }
};

// Get Single Product by ID (GET)
export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new HandleError("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Update Product (PUT)
export const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new HandleError("Product not found", 404));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Delete Product (DELETE)
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new HandleError("Product not found", 404));
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted success"
        });
    } catch (error) {
        next(error);
    }
};

// Create Product Review
export const createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    if (!req.user) {
        return next(new HandleError("User not authenticated", 401));
    }

    const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar.url,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    if (!product) {
        return next(new HandleError("Product not found", 400));
    }

    const reviewExists = product.reviews.find((review) => review.user && review.user.toString() === req.user.id);
    if (reviewExists) {
        //Update Review
        product.reviews.forEach((review) => {
            if (review.user && review.user.toString() === req.user.id) {
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        //Add / Push review
        product.reviews.push(review);
    }

    //Update Review Count
    product.numOfReviews = product.reviews.length;
    //Update Rating
    let sum = 0;
    product.reviews.forEach((review) => {
        sum = sum + review.rating;
    });

    product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;
    //Save Details
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product,
    });
};

// View Product Reviews
export const viewProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new HandleError("Product not found", 400));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
};

//Delete Reviews
export const adminDeleteReview = async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new HandleError("Product not found", 400));
    }

    const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());

    let sum = 0;
    reviews.forEach((review) => {
        sum += review.rating;
    });

    const ratings = reviews.length > 0 ? sum / reviews.length : 0;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        message: "Review Deleted Successfully",
    });
};

// Admin View all products
export const getAllProductsByAdmin = async (req, res, next) => {
    const resultsPerPage = 10;
    const products = await Product.find();
    
    const productCount = await Product.countDocuments();
    const outOfStock = await Product.countDocuments({ stock: 0 });

    res.status(200).json({
        success: true,
        products,
        productCount,
        outOfStock,
        resultsPerPage
    });
};

// Get All Reviews
export const getAllReviewsByAdmin = async (req, res, next) => {
    const products = await Product.find();

    let allReviews = [];

    products.forEach((product) => {
        product.reviews.forEach((review) => {
            allReviews.push({
                ...review.toObject(),
                productName: product.name,
                productImage: product.images[0]?.url,
                productId: product._id
            });
        });
    });

    allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
        success: true,
        reviews: allReviews
    });
};