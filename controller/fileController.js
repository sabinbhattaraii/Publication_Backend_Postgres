import { serverBaseUrl } from "../config/sconfig.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import successResponseData from "../helper/successResponseData.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { HttpStatus } from "../constant/constant.js";

export const createFile = catchAsyncErrors(async(req,res,next) => {
    try{
        if(req.file) {
            let fileName = req.file.filename;
            let path = { path: `${serverBaseUrl}/${fileName}` }

            successResponseData({
                res,
                message : "File uploaded Successfully.",
                statusCode : HttpStatus.CREATED,
                data : path,
            });
        } else {
            let paths = req.files.map((file)=> {
                let fileName = file.filename;
                let path = `${serverBaseUrl}/${fileName}`
                return {
                    path : path
                }
            });
            successResponseData({
                res,
                message : " Files Uploaded Successfully.",
                statusCode : HttpStatus.CREATED,
                data : paths
            })
        }
    } catch ( error ) {
        sendErrResponseByMsg(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
})