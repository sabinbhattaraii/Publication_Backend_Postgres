import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { stripeService } from "../service/index.js";
import { signing_secret } from "../config/sconfig.js";

export const createPaymentIntent = catchAsyncErrors(async (req, res) => {
  const { amount, items } = req.body;
  try {
    if (!amount) {
      sendErrResponseByMsg(res, "AMOUNT is required", HttpStatus.BAD_REQUEST);
      return; // Return to prevent further execution
    }
    if (!items) {
      sendErrResponseByMsg(
        res,
        "List of ITEMS is required",
        HttpStatus.BAD_REQUEST
      );
      return; // Return to prevent further execution
    }

    const paymentIntent = await stripeService.createPaymentIntentService(
      amount,
      items
    );

    successResponseData({
      res: res,
      message: "Payment Intent Created Successfully",
      status: HttpStatus.CREATED,
      data: { clientSecret: paymentIntent.client_secret },
    });
  } catch (error) {
    sendErrResponseByMsg(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

export const createCheckoutSession = catchAsyncErrors(async (req, res) => {
  const { amount, items } = req.body;
  try {
    if (!amount) {
      sendErrResponseByMsg(res, "AMOUNT is required", HttpStatus.BAD_REQUEST);
      return; // Return to prevent further execution
    }
    if (!items) {
      sendErrResponseByMsg(
        res,
        "List of ITEMS is required",
        HttpStatus.BAD_REQUEST
      );
      return; // Return to prevent further execution
    }

    const session = await stripeService.createCheckoutSessionService(
      amount,
      items
    );

    successResponseData({
      res: res,
      message: "Checkout Session Created Successfully:",
      status: HttpStatus.CREATED,
      data: { sessionId: session.id, url: session.url },
    });
  } catch (error) {
    sendErrResponseByMsg(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

export const handleWebhook = catchAsyncErrors(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const payload = req.body;
  const endpointSecret = signing_secret;
  try {
    if (!sig) {
      sendErrResponseByMsg(
        res,
        "Signature is required",
        HttpStatus.BAD_REQUEST
      );
      return;
    }
    if (!payload) {
      sendErrResponseByMsg(res, "PayLoad is required", HttpStatus.BAD_REQUEST);
      return;
    }

    const event = stripeService.handleWebhookEvent(
      payload,
      sig,
      endpointSecret
    );
    console.log("Event : ", event);

    switch ((await event).type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // await save to database
        console.log("PaymentIntent was successful:", paymentIntent.id);
        break;
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object;
        console.log("Failed Payment Intent:", failedPaymentIntent.id);
        break;
      default:
        console.log(`Unhandled event type: ${(await event).type}`);
    }

    successResponseData({
      res: res,
      message: "WebHook Created Successfully:",
      status: HttpStatus.CREATED,
      data: event,
    });
  } catch (error) {
    sendErrResponseByMsg(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});