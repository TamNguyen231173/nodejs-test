import {UserModel} from "~/models";
import {CreateUserInput, UpdateUserInput} from "~/types/user.type";
import {ImportedObject} from "~/types/common.type";

class UserRepository {
  async findById(id: string, select?: string, options?: ImportedObject) {
    return UserModel.findById(id, select, options)
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

  async deleteUser(id: string) {
    return UserModel.findByIdAndDelete(id)
  }

  async getUsers(pageSize: number, page: number) {
    const totalDocuments = await UserModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);
    const users = await UserModel.find().skip(pageSize * (page - 1)).limit(pageSize);
    return {
      users,
      totalPages
    };
  }
}

const userRepository = new UserRepository()
export default userRepository
