import {Router} from "express";
import authController from "~/controllers/auth.controller";
import {validateMiddleware} from "~/middlewares/validate.middleware";
import {
  changePasswordValidation,
  codeValidation,
  emailValidation,
  loginValidation,
  logoutValidation,
  refreshTokenValidation, registerValidation, resetPasswordValidation
} from "~/validations/auth.validation";
import authMiddleware from "~/middlewares/auth.middleware";

export const authRouter = Router()

authRouter.post('/login', validateMiddleware(loginValidation), authController.login)
authRouter.post('/register', validateMiddleware(registerValidation), authController.register)
authRouter.post('/refresh', validateMiddleware(refreshTokenValidation), authController.refresh)
authRouter.post('/verify', validateMiddleware(codeValidation), authController.verify)
authRouter.post('/resend-verify', validateMiddleware(emailValidation), authController.resendVerify)
authRouter.post('/forgot-password', validateMiddleware(emailValidation), authController.forgotPassword)
authRouter.post('/reset-password', validateMiddleware(resetPasswordValidation), authController.resetPassword)
authRouter.post('/verify-forgot-password', validateMiddleware(codeValidation), authController.verifyForgotPasswordCode)

authRouter.use(authMiddleware)
authRouter.post('/logout', validateMiddleware(logoutValidation), authController.logout)
authRouter.post('/change-password',validateMiddleware(changePasswordValidation), authController.changePassword)
