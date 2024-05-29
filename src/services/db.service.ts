import mongoose from 'mongoose'
import { EMAIL_ADMIN, MONGO_DB_URI, PASSWORD_ADMIN } from '~/configs'
import userRepository from '~/repositories/user.repository'
import { ERole } from '~/enums'

class DbService {
  async connect() {
    if (!mongoose.connections[0].readyState) {
      mongoose
        .connect(MONGO_DB_URI)
        .then(async () => {
          console.log('Connected to MongoDB')
          await this.init()
        })
        .catch((err: any) => console.log(err))
    }
  }

  async init() {
    const adminUser = await userRepository.findUserByEmail(EMAIL_ADMIN)
    if (!adminUser) {
      await userRepository.createUser({
        email: EMAIL_ADMIN,
        password: PASSWORD_ADMIN,
        role: ERole.ADMIN,
        fullName: EMAIL_ADMIN,
        isVerified: true
      })

      console.log('Admin user created')
    }
  }
}

const dbService = new DbService()
export default dbService
