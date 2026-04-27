import express from "express";
import { verifyUser } from "../helper/userAuth.js";
import { paymentVerification, processPayment, sendApiKey } from "../controllers/paymentController.js";

const router = express.Router();

router.route("/payment/process").post(verifyUser, processPayment);
router.route("/getkey").get(sendApiKey);
router.route("/paymentVerification").post(verifyUser, paymentVerification);

export default router;