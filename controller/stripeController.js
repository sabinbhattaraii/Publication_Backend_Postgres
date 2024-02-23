import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { stripeService } from "../service/index.js";

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
      data: { sessionId: session.id },
    });
  } catch (error) {
    sendErrResponseByMsg(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});