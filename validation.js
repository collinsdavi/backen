//VALIDATION
const joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {

    const schema = {
        name: joi.string()
            .min(6)
            .required(),
         email: joi.string()
            .min(6).required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
        };
        return joi.validate(data, schema);
};

const loginValidation = (data) => {

    const schema = {
        name: joi.string()
            .min(6)
            .required(),
         email: joi.string()
            .min(6).required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
        };
        return joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
