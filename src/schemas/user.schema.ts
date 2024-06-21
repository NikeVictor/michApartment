import { AppValidator } from "./validator";

const Joi = require('joi');

export const phoneSchema = Joi.object({
    number: Joi.string().required(),
    dialCode: Joi.string().required(),
}).options({ stripUnknown: true });

const UserSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: phoneSchema,
    gender: Joi.string(),
    password: Joi.string().required(),
    accountType: Joi.string().default("Subscriber"),
    image: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    address: Joi.string(),
})

export const UserValidator = AppValidator.body(UserSchema)