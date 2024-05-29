import {UserModel} from "~/models";
import {CreateUserInput, UpdateUserInput} from "~/types/user.type";

class UserRepository {
  async findById(id: string) {
    return UserModel.findById(id)
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email }, { password: 1 }).lean()
  }

  async createUser(data: CreateUserInput) {
    return UserModel.create(data)
  }

  async update(id: string, data: UpdateUserInput) {
    return UserModel.findByIdAndUpdate(id, data, {new: true})
  }
}

const userRepository = new UserRepository()
export default userRepository
