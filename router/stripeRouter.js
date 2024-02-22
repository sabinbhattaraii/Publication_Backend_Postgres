import { Router } from "express";
import { stripeController } from "../controller/index.js";


const stripeRouter = Router()

stripeRouter
    .route("/create-payment-intent")
    .post(stripeController.createPaymentIntent)


export default stripeRouter;