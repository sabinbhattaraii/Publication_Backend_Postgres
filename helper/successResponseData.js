import { HttpStatus } from "../constant/constant.js";

const successResponseData = ({
  res,
  data = null,
  message = "",
  statusCode = HttpStatus.OK,
}) => {
  res.status(statusCode).json({
    success: true,
    ...(data && { data }),
    ...(message && { message }),
  });
};

export default successResponseData;