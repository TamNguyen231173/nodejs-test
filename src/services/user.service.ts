import userRepository from '~/repositories/user.repository'
import { ApiError } from '~/utils/api-error'
import httpStatus from 'http-status'
import {CreateUserInput, UpdateUserInput} from "~/types/user.type";

class UserService {
  public async createUser(user: CreateUserInput) {
    const userExist = await userRepository.findUserByEmail(user.email)

    if (userExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists')
    }

    const newUser = await userRepository.createUser(user)

    delete newUser.password

    return newUser
  }

  public async updateUser(id: string, updateBody: UpdateUserInput) {
    const user = await userRepository.findById(id)

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    return userRepository.update(id, updateBody)
  }

  public async getInfo(id: string) {
    const user = await userRepository.findById(id)

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    delete user.password

    return user
  }

  public async deleteUser(id: string) {
    return userRepository.deleteUser(id)
  }

  public async getUsers(pageSize: number, page: number) {
    return userRepository.getUsers(pageSize, page)
  }
}

const userService = new UserService()
export default userService
