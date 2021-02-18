const router = require('express').Router();
const User = require('../model/UserModel');
const verify = require('../validations/verifyToken');
const Question = require('../model/QuestionModel');
const {Types} = require('mongoose');

router.post('/answer', verify, async (req, res) => {
    const id = new Types.ObjectId(req.query.qid);
    const userAnswer = +req.query.chosenAnswer;
    const question = await Question.findById(id);
    if (userAnswer === question.correctAnswer) {
        console.log(req.user.name);
        await User.updateOne(
            {name: req.user.name},
            {$inc: {score: 1}}
        );
        res.status(200).send(
            {correct: true}
        )
    } else {
        res.status(200).send({
            correct: false
        })
    }


});

module.exports = router;