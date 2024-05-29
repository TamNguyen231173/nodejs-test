import {TokenModel} from "~/models/token.model";
import {Token} from "~/types/auth.type";

class TokenRepository {
  async findByToken(token: string, type: string) {
    return TokenModel.findOne({ token, type }).lean()
  }

  async deleteMany(userId: string) {
    return TokenModel.deleteMany({ user: userId })
  }

  async save(data: Token) {
    return TokenModel.create(data)
  }
}

const tokenRepository = new TokenRepository();
export default tokenRepository;
