import express from "express";
import {
    addProducts,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    viewProductReviews,
    createProductReview,
    adminDeleteReview,
    getAllProductsByAdmin,
    getAllReviewsByAdmin
} from "../controllers/productController.js";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

const router = express.Router();

//User Side
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verifyUser, createProductReview);

//Admin
router.route("/admin/product/create").post(verifyUser, roleBasedAccess("admin"), addProducts);
router.route("/admin/product/product/:id").put(verifyUser, roleBasedAccess("admin"), updateProduct).delete(verifyUser, roleBasedAccess("admin"), deleteProduct);
router.route("/admin/reviews").get(verifyUser, roleBasedAccess("admin"), viewProductReviews).delete(verifyUser, roleBasedAccess("admin"), adminDeleteReview);

//AdminView All Products
router.route("/admin/products").get(verifyUser, roleBasedAccess("admin"), getAllProductsByAdmin);
router.route("/admin/all-reviews").get(verifyUser, roleBasedAccess("admin"), getAllReviewsByAdmin);

export default router;