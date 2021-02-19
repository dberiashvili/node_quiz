const router = require('express').Router();
const verify = require('../validations/verifyToken');
const Question = require('../model/QuestionModel');
const questionSchema = require('../model/schema/questionSchema');

router.get('/questions', verify, async (req, res) => {
    res.send(await Question.find())
});


router.post('/questions', verify, async (req, res) => {
    const validQuestion = questionSchema.validate(req.body);
    if (validQuestion.error) {
        res.status(200).json({
           error: 'incorrect question schema'
        })
    } else {
        res.send(await Question.create(req.body))
    }

});


module.exports = router;