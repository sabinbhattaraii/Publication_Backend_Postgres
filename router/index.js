import { Router } from "express";
import stripeRouter from "./stripeRouter.js";

const apiRouter = Router()

const ourRoutes = [
    {
        path : `/stripe`,
        router : stripeRouter
    },
]
ourRoutes.forEach((route) => {
    apiRouter.use(route.path,route.router)
})

export default apiRouter