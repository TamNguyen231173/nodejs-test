import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { ENV } from '~/configs'
import { ApiError } from '~/utils/api-error'
import { logger } from '~/configs/logger.config'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err

  if (error && !(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || (httpStatus as any)[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }

  const { statusCode, message } = error

  res.errorMessage = error.message
  const response = { code: statusCode, message }

  if (ENV === 'development') {
    logger.error(error)
  }

  res.status(statusCode).json(response)
}
