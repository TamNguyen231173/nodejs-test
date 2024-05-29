import { EToken } from '~/enums'
import moment from 'moment'
import mongoose, { Document, model, Model, Schema } from 'mongoose'
import { User, VerifyCode } from '~/types/user.type'

export const RESEND_LIMIT_PER_DAY = 30

export interface VerifyCodeDocument extends Document, VerifyCode {
  checkResendDuration(): boolean

  checkExpires(): boolean
}

interface VerifyCodeModel extends Model<VerifyCodeDocument, {}> {
  isResendReachedLimit(latestCode: VerifyCodeDocument, user: User): Promise<boolean>
}

const schema = new Schema<VerifyCodeDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    code: {
      type: String
    },
    expiresTime: {
      type: Date,
      default: new Date(new Date().getTime() + 60 * 30 * 1000) // 30 minutes
    },
    resendDuration: {
      type: Date,
      default: moment().utcOffset('+0700').add(45, 'second').toDate()
    },
    type: {
      type: String,
      enum: EToken
    }
  },
  {
    timestamps: true
  }
)

schema.method('checkResendDuration', function checkResendDuration() {
  return moment().isAfter(moment(this.resendDuration))
})

schema.method('checkExpires', function checkExpires() {
  return moment().isAfter(moment(this.expiresTime))
})

schema.static(
  'isResendReachedLimit',
  async function isResendReachedLimit(code: VerifyCodeDocument, user: User) {
    const codeCount = await VerifyCodeModel.countDocuments({
      user: user._id,
      $and: [{ createdAt: { $gte: moment().startOf('day') } }, { createdAt: { $lte: moment().endOf('day') } }]
    })

    const year = moment().isSame(moment(code.createdAt), 'year')
    const month = moment().isSame(moment(code.createdAt), 'month')
    const day = moment().isSame(moment(code.createdAt), 'day')

    return year && month && day && codeCount >= RESEND_LIMIT_PER_DAY
  }
)

export const VerifyCodeModel = model<VerifyCodeDocument, VerifyCodeModel>('VerifyCode', schema)