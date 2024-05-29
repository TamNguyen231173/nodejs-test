import { isValidObjectId } from 'mongoose'

export const pattern = {
  ObjectId: (value: string, helpers: any) => {
    if (!isValidObjectId(value)) {
      return helpers.message(`${value} was not a valid ObjectId`)
    }
    return value
  },
  password: (value: string, helpers: any) => {
    if (value.length < 8) {
      return helpers.message('Password must be at least 8 characters')
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message('Password must contain at least 1 letter and 1 number')
    }
    return value
  },
  email: (value: string, helpers: any) => {
    if (!value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return helpers.message('Please provide a valid email')
    }
    return value
  },
  phone: (value: string, helpers: any) => {
    if (!value.match(/^\d{10,14}$/g)) {
      return helpers.message('Please provide a valid phone number')
    }
    return value
  }
}
