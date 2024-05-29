import { Request, Response } from 'express'
import authService from '~/services/auth.service'
import {ResetPasswordInput} from "~/types/auth.type";

class AuthController {
  public async login(req: Request, res: Response) {
    const data = await authService.login(req.body)
    res.json({
      message: 'Login successfully!',
      data
    })
  }

  public async logout(req: Request, res: Response) {
    await authService.logout(req.user, req.body.refreshToken)
    res.json({
      message: 'Logout successfully!'
    })
  }

  public async refresh(req: Request, res: Response) {
    const data = await authService.refreshToken(req.body.refreshToken)
    res.json({
      message: 'Refresh token successfully!',
      data
    })
  }

  public async verify(req: Request, res: Response) {
    await authService.verifyUser(req.body.code)
    res.json({
      message: 'Verify successfully!'
    })
  }

  public async resendVerify(req: Request, res: Response) {
    await authService.resendVerifiedCode(req.body)
    res.json({
      message: 'Resend verify successfully!'
    })
  }

  public async forgotPassword(req: Request, res: Response) {
    await authService.forgotPassword(req.body.email)
    res.json({
      message: 'Please check your email to reset password!'
    })
  }

  public async resetPassword(req: Request, res: Response) {
    await authService.resetPassword(req.body)
    res.json({
      message: 'Reset password successfully!'
    })
  }

  public async register(req: Request, res: Response) {
    await authService.register(req.body)
    res.json({
      message: 'Register successfully! Please check your email to verify your account!'
    })
  }

  public async verifyForgotPasswordCode(req: Request, res: Response) {
    const forgotPasswordToken = await authService.verifyForgotPasswordCode(req.body.code)

    return res.json({
      message: 'Verify successfully!',
      data: {forgotPasswordToken}
    })
  }

  public async changePassword(req: Request, res: Response) {
    await authService.changePassword(req.user.id, req.body)
    res.json({
      message: 'Change password successfully!'
    })
  }
}

const authController = new AuthController()
export default authController
