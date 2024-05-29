import dotenv from 'dotenv';

dotenv.config();

export const ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000

// Database
export const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/employee-task-management'

// Auth
export const ACCESS_SECRET_KEY = process.env.SECRET_KEY || 'secret-access'
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'secret-refresh'
export const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || '1h'
export const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || '1d'
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN || 'admin@gmail.com'
export const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN || 'admin'

// Verify code
export const EXPIRES_IN_VERIFIED_CODE = process.env.EXPIRES_IN_VERIFIED_CODE || '30'
export const SECRET_VERIFY_CODE = process.env.SECRET_VERIFY_CODE || 'secret-verify-code'

// Nodemailer
export const EMAIL_USER = process.env.EMAIL_USER || ''
export const EMAIL_PASS = process.env.EMAIL_PASS || ''
