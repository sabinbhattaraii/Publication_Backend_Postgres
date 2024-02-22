import Stripe from "stripe";
import { stripe_key } from "../config/sconfig.js";

const stripe = new Stripe(stripe_key, {
    apiVersion : '2023-10-16',
})