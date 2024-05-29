
import { JoiInstance } from '.'

export const updateProfileValidation = {
  body: JoiInstance.object({
    fullName: JoiInstance.string(),
    avatar: JoiInstance.string(),
  })
}