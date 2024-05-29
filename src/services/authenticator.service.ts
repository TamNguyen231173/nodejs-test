import {NextFunction, Request, Response} from 'express'
import {ApiError} from '~/utils/api-error'
import {GlobalPermissions, NeedConfig, Role} from '~/types/user.type'
import {AuthOptions} from '~/types/auth.type'
import httpStatus from 'http-status'
import userRepository from "~/repositories/user.repository";

class Authenticator {
  private roles: Role[] = [];
  filterByOwnResource: any = {}

  constructor() {
  }

  getRolePermissions(roleSlug: string) {
    return this.roles.find(x => x.slug === roleSlug)?.permissions;
  }

  need(config: NeedConfig, options?: AuthOptions) {
    const roles = config.roles || [];
    const permissions = config.permissions || [];


    return async (req: Request, res: Response, next: NextFunction) => {
      const user = await userRepository.findById(req.user._id)

      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

      if (roles && roles.length && roles.length > 0) {
        if (!roles.includes(user.role)) {
          if (req.params?.userId === req.user.id || req.params?.userId === 'me') return next()
          if (options?.allowOwnResource && options?.allowOwnResource.length > 0) {
            req.authenticator.filterByOwnResource['$or'] = []
            for (const field of options.allowOwnResource) {
              switch (field) {
                case 'creator':
                  req.authenticator.filterByOwnResource['$or'].push(
                    options.creatorDocFilter
                      ? { [options.creatorDocFilter.field]: req.user[options.creatorDocFilter.userField] }
                      : { creator: req.user._id }
                  )
                  break
              }
            }
            return next()
          }
          throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to access this resource')
        }
      }
      if (permissions && permissions.length && permissions.length > 0) {
        const userPermissions: GlobalPermissions[] = this.getRolePermissions(user.role) || []
        for (const perm in permissions) {
          if (!userPermissions.includes(perm as GlobalPermissions))
            throw new ApiError( httpStatus.FORBIDDEN, 'You do not have permission to access this resource')
        }
      }
      next()
    }
  }
}

const authenticator = new Authenticator()
export default authenticator
