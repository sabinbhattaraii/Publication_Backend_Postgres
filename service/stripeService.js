import Stripe from "stripe";
import { stripe_key, website_base_url } from "../config/sconfig.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { HttpStatus } from "../constant/constant.js";

const stripe = new Stripe(stripe_key, {
  apiVersion: "2023-10-16",
});

async function generateLineItemsService(items) {
  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    console.log("Line items:", lineItems);
    return lineItems;
  } catch (error) {
    console.error("Error generating line items:", error);
    throw new Error("Failed to generate line items");
  }
}

export async function createPaymentIntentService(amount, items) {
  try {
    const lineItems = await generateLineItemsService(items);

    if (!lineItems) {
      sendErrResponseByMsg(
        res,
        "Failed to retrive line items",
        HttpStatus.NOT_FOUND
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: "usd",
      payment_method_types: ["card"],
      line_items: lineItems,
    });

    console.log("Payment Intent:", paymentIntent);
    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

export async function createCheckoutSessionService(amount, items) {
  try {
    const lineItems = await generateLineItemsService(items);

    if (!lineItems) {
      sendErrResponseByMsg(
        res,
        "Failed to retrive line items",
        HttpStatus.NOT_FOUND
      );
    }

    console.log("line items --------------------",lineItems)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url:"https://www.google.com",
      cancel_url: "https://www.google.com",
    });

    console.log(" CheckOut Session:", session);
    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

export async function handleWebhookEvent(payload,sig,endpointSecret) {
  try {
     if (!payload) {
      sendErrResponseByMsg(
        res,
        "Payload Not Found or Not Provided",
        HttpStatus.NOT_FOUND
      );
    }

     if (!sig) {
      sendErrResponseByMsg(
        res,
        "Signature Not Found or Not Provided..",
        HttpStatus.NOT_FOUND
      );
    }

     if (!endpointSecret) {
      sendErrResponseByMsg(
        res,
        "End Point Secret Not Found or Not Provided",
        HttpStatus.NOT_FOUND
      );
    }
    const event = await stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    console.log("Event :",event);
    return event;
  } catch (error) {
    console.error('Webhook Error:', error.message);
    throw error;
  }
}