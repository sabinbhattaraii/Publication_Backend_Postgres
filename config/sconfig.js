import { config } from "dotenv";

config()

export const port = process.env.PORT
export const base_url = process.env.BASE_URL || "localhost:5000";
export const apiVersion = process.env.API_VERSION
export const serverBaseUrl = process.env.SERVER_BASE_URL

export const staticFolder = "./public";

// Stripe Configurations 
export const stripe_key = process.env.STRIPE_KEY
export const website_base_url = process.env.WEBSITE_BASE_URL || "localhost:5000"
export const signing_secret = process.env.SIGNING_SECRET || "whsec_d77ae3df212a63cabf2c2d7cfc61d78d0ea965d81be3e8c663e5189add47a6ee"