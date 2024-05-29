import {NextFunction, Request, Response} from 'express'
import {ApiError} from '~/utils/api-error'
import {GlobalPermissions, NeedConfig, Role} from '~/types/user.type'
import {AuthOptions} from '~/types/auth.type'
import httpStatus from 'http-status'

class Authenticator {
  private roles: Role[] = [];
  filterByOwnResource: any = {}

  constructor() {
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      req.authenticator = new Authenticator();
      next();
    }
  }

  getRolePermissions(roleSlug: string) {
    return this.roles.find(x => x.slug === roleSlug)?.permissions;
  }

  need(config: NeedConfig, options?: AuthOptions) {
    const roles = config.roles || [];
    const permissions = config.permissions || [];

    return async (req: Request, res: Response, next: NextFunction) => {
      if (roles && roles.length && roles.length > 0) {
        if (!roles.includes(req.user.role)) {
          if (req.params?.accountId === req.user.id || req.params?.accountId === "me") return next();
          if (options?.allowOwnResource && options?.allowOwnResource.length > 0) {
            req.authenticator.filterByOwnResource["$or"] = [];
            for (const field of options.allowOwnResource) {
              switch (field) {
                case "owner":
                  req.authenticator.filterByOwnResource["$or"].push((options.creatorDocFilter)
                    ? {[options.creatorDocFilter.field]: req.user[options.creatorDocFilter.userField]}
                    : {owner: req.user._id});
                  break;
              }
              return next();
            }
            throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized");
          }
        }
        if (permissions && permissions.length && permissions.length > 0) {
          const accountPermissions: GlobalPermissions[] = this.getRolePermissions(req.user.role) || [];
          for (let perm in permissions) {
            if (!accountPermissions.includes(perm as GlobalPermissions)) throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized");
          }
        }
        next();
      }
    }
  }
}

const authenticator = new Authenticator()
export default authenticator
