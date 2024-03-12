import { Router } from "express";
import stripeRouter from "./stripeRouter.js";
import fileUploadRouter from "./fileuploadRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: `/stripe`,
    router: stripeRouter,
  },
  {
    path: `/file`,
    router: fileUploadRouter,
  },
];
ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
