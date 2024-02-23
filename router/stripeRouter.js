import { Router } from "express";
import { stripeController } from "../controller/index.js";


const stripeRouter = Router()

stripeRouter
    .route("/create-payment-intent")
    .post(stripeController.createPaymentIntent)

stripeRouter
    .route("/create-checkout-session")
    .post(stripeController.createCheckoutSession)


export default stripeRouter;