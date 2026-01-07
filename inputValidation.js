import Joi from "joi";

const driverSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  team: Joi.string().min(3).max(50).required(),
  points: Joi.number().min(0).max(1000).default(0),
});

const updateDriverSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  team: Joi.string().min(3).max(50),
  points: Joi.number().min(0).max(1000),
}).min(1);

const generatePositionSchema = (maxValue) => Joi.number().min(1).max(maxValue);

function validation(schema) {
  return function validateInfo(info) {
    return schema.validate(info, { abortEarly: false });
  };
}

export const validateDriverInfo = validation(driverSchema);

export const validateUpdateDriverInfo = validation(updateDriverSchema);

export const validatePosition = (position, maxValue) =>
  generatePositionSchema(maxValue).validate(position);
