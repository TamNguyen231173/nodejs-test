import {Document, model, PaginateModel, Schema} from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import {excludeInFindQueriesIsDeleted, typesFindQueryMiddleware} from '.'
import {Game} from "~/types/game.type";

export interface GameDocument extends Document, Game {
}

const schema = new Schema<GameDocument>(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      default: 'https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-2.jpg'
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

export const GameModel = model<GameDocument, PaginateModel<GameDocument>>('Game', schema)