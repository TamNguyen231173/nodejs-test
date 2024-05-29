import { Document, model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { excludeInFindQueriesIsDeleted, typesFindQueryMiddleware } from '.'
import { User } from '~/types/user.type'
import { ERole } from '~/enums'

export interface UserDocument extends Document, User {
  isVerified: boolean
}

const schema = new Schema<UserDocument>(
  {
    fullName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    avatar: {
      type: String,
      default: 'https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-2.jpg'
    },
    role: {
      type: String,
      enum: ERole,
      required: true,
      default: ERole.USER
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    flag: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

typesFindQueryMiddleware.forEach((type: any) => {
  schema.pre(type, excludeInFindQueriesIsDeleted)
})

schema.plugin(paginate)

export const UserModel = model<UserDocument>('User', schema)