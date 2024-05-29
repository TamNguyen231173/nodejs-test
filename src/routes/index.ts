import {Router} from "express";
import {apiRouter} from "~/routes/api";

export const mainRouter = Router()

mainRouter.use("/api/v1", apiRouter)
