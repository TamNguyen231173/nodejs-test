declare namespace Express {
  export interface Response {
    errorMessage?: string
  }

  export interface Request {
    user?: any
    authenticator?: any
  }
}
