import { Router } from "express";
import upload from "../middleware/uploadFile.js";
import { fileController } from "../controller/index.js";

const fileUploadRouter = Router();

fileUploadRouter
  .route("/single")
  .post(upload.single("file"), fileController.createFile)
  .get()
  .delete();

fileUploadRouter
  .route("/multiple")
  .post(upload.array("files", 10), fileController.createFile);

export default fileUploadRouter;
