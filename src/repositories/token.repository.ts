import {TokenModel} from "~/models/token.model";
import {Token} from "~/types/auth.type";
import {ImportedObject} from "~/types/common.type";

class TokenRepository {
  async findByToken(token: string, type: string) {
    return TokenModel.findOne({ token, type }, {}, { populate: 'user' })
  }

  async deleteMany(userId: string) {
    return TokenModel.deleteMany({ user: userId })
  }

  async save(data: Token) {
    return TokenModel.create(data)
  }

  async findOneAndDelete(filter: ImportedObject, options?: ImportedObject) {
    return TokenModel.findOneAndDelete(filter, options)
  }
}

const tokenRepository = new TokenRepository();
export default tokenRepository;
