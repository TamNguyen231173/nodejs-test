import { User } from './user.type'
import { EToken } from '~/enums'

export interface LoginInput {
  email?: string
  password: string
}

export interface TokenPayload {
  sub: string
  iss: string
  type: string
  email: string
  role: string
}

export interface Token {
  id?: any
  user: User
  token: string
  type: EToken
  expiresTime: Date
}

export interface AuthOptions {
  allowOwnResource: string[]
  creatorDocFilter?: {
    field: string
    userField: string
  }
}

export interface EmailBody {
  to: string
  subject: string
  html: string
}

export interface ResendVerifyInput {
  email?: string
}
