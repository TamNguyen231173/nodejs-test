export const typesFindQueryMiddleware = [
  'countDocuments',
  'find',
  'findOne',
  'findOneAndDelete',
  'findOneAndRemove',
  'update',
  'updateOne'
]

export const excludeInFindQueriesIsDeleted = async function (this: any, next: () => void) {
  this.where({ flag: { $ne: false } })
  next()
}

export {UserModel} from './user.model'
