import {ERole} from "~/enums";

export interface User {
  _id?: any;
  fullName: string;
  email: string;
  password?: string;
  role: ERole;
  avatar?: string;
  flag: boolean;
  isVerified: boolean;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role: ERole;
  avatar?: string;
  isVerified: boolean;
}

export interface UpdateUserInput {
  fullName?: string;
  avatar?: string;
}

export interface VerifyCode {
  _id?: any;
  user: User;
  code: string;
  hashCode: string;
  expiresTime: Date;
  resendDuration: Date;
  type: string;
  createdAt: Date;
}

export type GlobalPermissions = 'create' | 'read' | 'update' | 'delete'

export interface NeedConfig {
  roles?: string[]
  permissions?: GlobalPermissions[]
}

export interface Role {
  id: any
  name: string
  slug: string
  level: number
  permissions: GlobalPermissions[]
  default: boolean
  createdAt: Date
  updatedAt: Date
}