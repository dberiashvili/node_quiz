const Joi = require('joi');
const questionSchema = Joi.object({
    statement: Joi.string().required(),
    options: Joi.array().min(2).max(5).items(Joi.string().required()).required(),
    correctAnswer:Joi.number().integer().required()
});

module.exports = questionSchema;

