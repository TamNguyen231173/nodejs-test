import jwt, { SignOptions } from 'jsonwebtoken'
import { ACCESS_SECRET_KEY } from '~/configs'
import {TokenPayload} from "~/types/auth.type";

export const signToken = ({payload, privateKey, options = { algorithm: 'HS256' }}: {
  payload: string | object | Buffer
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (_err, _token) => {
      if (_err) {
        reject(_err)
      }
      resolve(_token as string)
    })
  })
}

export const verifyToken = ({token, secretOrPublicKey = ACCESS_SECRET_KEY}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (_err, _decoded) => {
      if (_err) {
        throw reject(_err)
      }
      resolve(_decoded as TokenPayload)
    })
  })
}
