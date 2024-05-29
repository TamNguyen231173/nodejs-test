import {Router} from "express";
import userController from "~/controllers/user.controller";
import authenticator from "~/services/authenticator.service";
import {ERole} from "~/enums";
import {validateMiddleware} from "~/middlewares/validate.middleware";
import {updateProfileValidation} from "~/validations/user.validation";

export const userRoute = Router()

userRoute.get("/profile", userController.getProfile)
userRoute.patch("/profile", validateMiddleware(updateProfileValidation),userController.updateUser)

userRoute.use(authenticator.need({
  roles: [ERole.ADMIN]
}))

userRoute.delete("/delete-user/:id", userController.deleteUser)
userRoute.get("/get-user/:id", userController.getUser)
userRoute.get("/get-users", userController.getUsers)
