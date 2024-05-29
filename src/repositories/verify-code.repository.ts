import {VerifyCodeModel} from "~/models/verify-token.model";
import {ImportedObject} from "~/types/common.type";
import {VerifyCode, VerifyCodeInput} from "~/types/user.type";

class VerifyCodeRepository {
  async findByCode(code: string) {
    return VerifyCodeModel.findOne({ code })
  }

  async deleteMany(filter: any) {
    return VerifyCodeModel.deleteMany(filter)
  }

  async findAll(filter: ImportedObject) {
    return VerifyCodeModel.find(filter)
  }

  async save(data: VerifyCodeInput) {
    return VerifyCodeModel.create(data)
  }
}

const verifyCodeRepository = new VerifyCodeRepository()
export default verifyCodeRepository
