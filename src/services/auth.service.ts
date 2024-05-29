import { LoginInput, ResendVerifyInput } from '~/types/auth.type'
import { ApiError } from '~/utils/api-error'
import httpStatus from 'http-status'
import userRepository from '~/repositories/user.repository'
import bcrypt from 'bcrypt'
import { User, VerifyCode } from '~/types/user.type'
import { signToken } from '~/utils/jwt'
import { EToken } from '~/enums'
import {
  ACCESS_SECRET_KEY,
  ACCESS_TOKEN_LIFE,
  EXPIRES_IN_VERIFIED_CODE,
  REFRESH_SECRET_KEY,
  REFRESH_TOKEN_LIFE
} from '~/configs'
import tokenRepository from '~/repositories/token.repository'
import moment from 'moment'
import { generateRandomNumber } from '~/utils/random'
import verifyCodeRepository from '~/repositories/verify-code.repository'
import emailTemplates from '~/assets/templates/email.template'
import emailService from '~/services/email.service'

class AuthService {
  public async login({ email, password }: LoginInput) {
    if (!email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required!')
    }

    const user = await userRepository.findUserByEmail(email)

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
    }

    if (!user.isVerified) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not verified!')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password as string)
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'The provided password is incorrect!')
    }

    delete user.password

    const { accessToken, refreshToken } = await this.signAccessTokenAndRefreshToken(user)

    return {
      accessToken,
      refreshToken,
      user
    }
  }

  public async verifyUser(code: string) {
    const verifyCode = await verifyCodeRepository.findByCode(code)

    if (!verifyCode || !verifyCode.checkExpires()) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Verify code is invalid or expired')
    }

    const user = await userRepository.findById(verifyCode.user._id)

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (user.isVerified) {
      throw new ApiError(httpStatus.FORBIDDEN, 'User has been verified')
    }

    await verifyCodeRepository.deleteMany({ user: user.id, type: EToken.VERIFY })

    user.isVerified = true

    await userRepository.update(user.id, user)
  }

  private async sendVerifiedCodeEmail(type: EToken.VERIFY | EToken.FORGOT_PASSWORD, user: User) {
    const verifyCode = await this.generateVerifyCode(type, user)

    const subject = {
      [EToken.VERIFY]: 'Verify your email',
      [EToken.FORGOT_PASSWORD]: 'Reset your password'
    }

    const htmlTemplate = {
      [EToken.VERIFY]: emailTemplates.verifyEmail(verifyCode),
      [EToken.FORGOT_PASSWORD]: emailTemplates.forgotPassword(verifyCode)
    }

    await emailService.sendMail({
      to: user.email,
      subject: subject[type],
      html: htmlTemplate[type]
    })
  }

  public async resendVerifiedCode({ email }: ResendVerifyInput) {
    if (!email) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required!')
    }

    const user = await userRepository.findUserByEmail(email)

    if (!user || user.isVerified) {
      throw new ApiError(httpStatus.FORBIDDEN, 'User is not found or has been verified')
    }

      await this.sendVerifiedCodeEmail(EToken.VERIFY, user)
  }

  public async logout(user: User, token: string) {
    const refreshToken = await tokenRepository.findByToken(token, EToken.REFRESH_TOKEN)

    if (!refreshToken || refreshToken.user._id.toString() !== user._id.toString()) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Fail to logout')
    }

    await tokenRepository.deleteMany(user._id)
  }

  public async refreshToken(token: string) {
    const refreshToken = await tokenRepository.findByToken(token, EToken.REFRESH_TOKEN)

    if (!refreshToken || !refreshToken.checkExpires()) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Refresh token is invalid or expired')
    }

    const user = refreshToken.user

    return await this.signAccessTokenAndRefreshToken(user)
  }

  public async signRefreshToken(user: User) {
    const refreshToken = signToken({
      payload: {
        ...this.getPayload(user),
        type: EToken.REFRESH_TOKEN
      },
      privateKey: REFRESH_SECRET_KEY,
      options: { expiresIn: REFRESH_TOKEN_LIFE }
    })

    await tokenRepository.save({
      token: (await refreshToken).toString(),
      type: EToken.REFRESH_TOKEN,
      user,
      expiresTime: moment().add(REFRESH_TOKEN_LIFE, 'days').toDate()
    })

    return refreshToken
  }

  public signAccessToken(user: User) {
    return signToken({
      payload: {
        ...this.getPayload(user),
        type: EToken.ACCESS_TOKEN
      },
      privateKey: ACCESS_SECRET_KEY,
      options: { expiresIn: ACCESS_TOKEN_LIFE }
    })
  }

  public async signAccessTokenAndRefreshToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([this.signAccessToken(user), this.signRefreshToken(user)])
    return {
      accessToken,
      refreshToken
    }
  }

  private getPayload({ _id, email, role }: User) {
    return { _id, iss: email, role }
  }

  private async generateVerifyCode(type: EToken.FORGOT_PASSWORD | EToken.VERIFY, user: User) {
    let code: string
    const allVerifiedCode = await verifyCodeRepository.findAll({ user: user._id, type })

    do {
      code = generateRandomNumber(4)
    } while (!this.isUniqueVerifiedCode(allVerifiedCode as VerifyCode[], code))

    const expiresTime = moment().add(EXPIRES_IN_VERIFIED_CODE, 'minutes').toDate()

    return await verifyCodeRepository.save({
      user,
      code,
      type,
      expiresTime
    })
  }

  private isUniqueVerifiedCode(verifiedCodes: VerifyCode[], code: string): boolean {
    const existedObject = verifiedCodes.findIndex((value) => value.code.toString() === code)
    return existedObject === -1
  }
}

const authService = new AuthService()
export default authService
