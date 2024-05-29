import userService from '~/services/user.service'
import { Request, Response } from 'express'

class UserController {
  public async updateUser(req: Request, res: Response) {
    const data = await userService.updateUser(req.user._id, req.body)

    res.json({
      message: 'User updated',
      data
    })
  }

  public async deleteUser(req: Request, res: Response) {
    const data = await userService.deleteUser(req.user._id)

    res.json({
      message: 'User deleted',
      data
    })
  }

  public async getUsers(req: Request, res: Response) {
    const data = await userService.getUsers(Number(req.query.pageSize), Number(req.query.page))

    res.json({
      message: 'Get users',
      data
    })
  }

  public async getProfile(req: Request, res: Response) {
    const data = await userService.getInfo(req.user.id)

    res.json({
      message: 'Get user profile',
      data
    })
  }

  public async getUser(req: Request, res: Response) {
    const data = await userService.getInfo(req.params.id)

    res.json({
      message: 'Get user',
      data
    })
  }
}

const userController = new UserController()
export default userController
