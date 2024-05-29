import Joi from 'joi'
import { queryFilter } from '~/utils/filter'
import { ApiError } from '~/utils/api-error'
import { NextFunction, Request, Response } from 'express'
import { ENV } from '~/configs'
import httpStatus from 'http-status'

export const validateMiddleware = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = queryFilter(schema, ['params', 'query', 'body', 'file'])
  const object = queryFilter(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = ENV === 'development' ? error.message : 'Validation failed'
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage)
  }

  Object.assign(req, value)
  next()
}
