import { pattern } from '~/utils/pattern'
import { JoiInstance } from '.'

const passwordSchema = JoiInstance.string().custom(pattern.password).required()

const emailSchema = JoiInstance.string().custom(pattern.email).required()

export const loginValidation = {
  body: JoiInstance.object({
    email: emailSchema,
    password: passwordSchema,
  })
}

export const registerValidation = {
  body: JoiInstance.object({
    fullName: JoiInstance.string().required(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: JoiInstance.string()
      .valid(JoiInstance.ref('password'))
      .required()
      .messages({
        'any.only': "Confirm password doesn't match with password"
      }),
    avatar: JoiInstance.string(),
  })
}

export const logoutValidation = {
  body: JoiInstance.object({
    refreshToken: JoiInstance.string().required()
  })
}

export const emailValidation = {
  body: JoiInstance.object({
    email: emailSchema
  })
}

export const codeValidation = {
  body: JoiInstance.object({
    code: JoiInstance.string().required()
  })
}

export const resetPasswordValidation = {
  body: JoiInstance.object({
    forgotPasswordToken: JoiInstance.string().required(),
    newPassword: passwordSchema,
    confirmPassword: JoiInstance.string()
      .valid(JoiInstance.ref('newPassword'))
      .required()
      .messages({
        'any.only': "Confirm password doesn't match with new password"
      })
  })
}

export const changePasswordValidation = {
  body: JoiInstance.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: JoiInstance.string()
      .valid(JoiInstance.ref('newPassword'))
      .required()
      .messages({
        'any.only': "Confirm password doesn't match with new password"
      })
  })
}

export const refreshTokenValidation = {
  body: JoiInstance.object({
    refreshToken: JoiInstance.string().required(),
    deviceId: JoiInstance.string(),
    deviceName: JoiInstance.string()
  })
}
