import {JoiInstance} from "~/validations/index";
import {pattern} from "~/utils/pattern";

export const createGameValidation = {
  body: JoiInstance.object({
    name: JoiInstance.string().required(),
    description: JoiInstance.string().required(),
    price: JoiInstance.number().required(),
    image: JoiInstance.string().optional()
  }),
};

export const updateGameValidation = {
  body: JoiInstance.object({
    name: JoiInstance.string().optional(),
    description: JoiInstance.string().optional(),
    price: JoiInstance.number().optional(),
    image: JoiInstance.string().optional()
  }),
  params: JoiInstance.object({
    id: JoiInstance.custom(pattern.ObjectId).required()
  }),
};
