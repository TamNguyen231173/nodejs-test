
import { JoiInstance } from '.'
import {pattern} from "~/utils/pattern";

export const updateProfileValidation = {
  body: JoiInstance.object({
    fullName: JoiInstance.string(),
    avatar: JoiInstance.string(),
  })
}

export const deleteUserValidation = {
  params: JoiInstance.object({
    id: JoiInstance.custom(pattern.ObjectId).required()
  })
}
