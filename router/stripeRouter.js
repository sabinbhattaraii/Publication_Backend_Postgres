import { Router } from "express";
import { stripeController } from "../controller/index.js";
import bodyParser from "body-parser";


const stripeRouter = Router()

stripeRouter
    .route("/create-payment-intent")
    .post(stripeController.createPaymentIntent)

stripeRouter
    .route("/create-checkout-session")
    .post(stripeController.createCheckoutSession)

stripeRouter
    .route("/webhook")
    .post(bodyParser.raw({ type : 'application/json'}),stripeController.handleWebhook)

export default stripeRouter;