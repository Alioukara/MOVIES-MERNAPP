//validation
const Joi = require('joi')
const { schema } = require('../model/user')

function registerValidation(data) {
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
})
return schema.validate(data)
}

function loginValidation(data) {
    const schema = Joi.object({
       
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
    }
    

module.exports.loginValidation = loginValidation

module.exports.registerValidation = registerValidation