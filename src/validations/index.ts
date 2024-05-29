import Joi from 'joi'

export const JoiInstance = Joi.defaults((schema: any) => {
  return schema.options({
    errors: {
      wrap: {
        // Remove quotes from variable names in error messages
        label: false
      }
    }
  })
})
