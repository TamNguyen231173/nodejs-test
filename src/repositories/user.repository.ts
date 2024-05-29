import {UserModel} from "~/models";
import {CreateUserInput} from "~/types/user.type";

class UserRepository {
  async findUserByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  async createUser(data: CreateUserInput) {
    return UserModel.create(data)
  }
}

const userRepository = new UserRepository()
export default userRepository
