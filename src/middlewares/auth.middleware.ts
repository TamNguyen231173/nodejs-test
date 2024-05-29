import { NextFunction, Request, Response } from 'express'
import { ApiError } from '~/utils/api-error'
import httpStatus from 'http-status'
import { ACCESS_SECRET_KEY } from '~/configs'
import jwt from 'jsonwebtoken'
import userRepository from '~/repositories/user.repository'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let authToken: string

    if (req.headers.authorization) {
      authToken = req.headers.authorization.split(' ')[1]
    } else {
      authToken = req.query.access_token as string
    }

    if (!authToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid authentication information')
    }

    const tokenData: any = jwt.verify(authToken, ACCESS_SECRET_KEY)

    const user = await userRepository.findById(tokenData.id)

    if (!user) {
      throw new ApiError(httpStatus.FORBIDDEN, 'User not found')
    }

    req.user = user

    next()
  } catch (error: any) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message || 'Invalid token')
  }
}

export default authMiddleware
