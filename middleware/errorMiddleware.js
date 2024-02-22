import { HttpStatus } from "../constant/constant.js";

let errorMiddleware = (error, req, res, next) => {

  //just pass error and attach statusCode and message
  // for all
  // like error.statusCode=400
  // like error.message=400 //it can change the error message
  
  let statusCode = "";
  let message = "";
  if (error.code === 11000) {
    statusCode = HttpStatus.CONFLICT;
    message = `Duplicate key error`;
  } else {
    message = error.message || "Internal server error";
    statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }
  res.status(statusCode).json({
    success: false,
    ...(message && { message }),
  });
};

export function sendErrResponseByMsg(res, err, status) {
  if (err instanceof Error) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  } else if (typeof err === "object") {
    res.status(err.status).send({
      success: false,
      message: err.message,
    });
  } else {
    res.status(status | HttpStatus.BAD_REQUEST).send({
      success: false,
      message: err,
    });
  }
}

export default errorMiddleware;