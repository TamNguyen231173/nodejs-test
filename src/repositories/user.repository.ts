import {UserModel} from "~/models";
import {CreateUserInput, UpdateUserInput} from "~/types/user.type";
import {ImportedObject} from "~/types/common.type";

class UserRepository {
  async findById(id: string, select?: string, options?: ImportedObject) {
    return UserModel.findById(id, select, options)
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email },  "+password").lean()
  }

  async createUser(data: CreateUserInput) {
    return UserModel.create(data)
  }

  async update(id: string, data: UpdateUserInput) {
    return UserModel.findByIdAndUpdate(id, data, {new: true})
  }

  async deleteUser(id: string) {
    return UserModel.updateOne({ _id: id }, { flag: false })
  }

  async getUsers(pageSize: number, page: number) {
    if (!pageSize) {
      pageSize = 10
    }

    if (!page) {
      page = 1
    }

    const totalDocuments = await UserModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);
    const users = await UserModel.paginate({}, { page, limit: pageSize });

    return {
      users: users.docs,
      totalDocuments,
      totalPages,
      page
    }
  }
}

const userRepository = new UserRepository()
export default userRepository
