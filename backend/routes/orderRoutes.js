import express from "express";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";
import { createNewOrder, getAllOrders, getAllOrdersByAdmin, getOrderDetails, deleteOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.route("/new/order").post(verifyUser, createNewOrder);
router.route("/order/:id").get(verifyUser, getOrderDetails);
router.route("/orders/user").get(verifyUser, getAllOrders);

//admin
router.route("/admin/orders").get(verifyUser, roleBasedAccess("admin"), getAllOrdersByAdmin);
router.route("/admin/order/:id").delete(verifyUser, roleBasedAccess("admin"), deleteOrder).put(verifyUser, roleBasedAccess("admin"), updateOrderStatus);

export default router;