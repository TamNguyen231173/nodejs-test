import { Document, model, Schema } from 'mongoose'
import moment from 'moment'
import { Token } from '~/types/auth.type'
import { EToken } from '~/enums'

export interface TokenDocument extends Document, Token {
  checkExpires(): boolean
}

const schema = new Schema<TokenDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: EToken
    },
    expiresTime: Date
  },
  {
    timestamps: true
  }
)

schema.method('checkExpires', function checkExpires() {
  return moment().isAfter(moment((this as any).expiresTime))
})

export const TokenModel = model<TokenDocument>('Token', schema)

