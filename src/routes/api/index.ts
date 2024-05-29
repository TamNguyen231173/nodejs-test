import {Router} from "express";
import {authRouter} from "~/routes/api/auth.route";
import {userRoute} from "~/routes/api/user.route";
import authMiddleware from "~/middlewares/auth.middleware";
import {gameRoute} from "~/routes/api/game.rotue";

export const apiRouter = Router()

apiRouter.use("/auth", authRouter)

apiRouter.use(authMiddleware)
apiRouter.use("/user", userRoute)
apiRouter.use('/game', gameRoute)
