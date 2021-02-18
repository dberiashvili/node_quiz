const router = require('express').Router();
const user = require('../model/UserModel');

router.get('/stats', async (req, res) => {

    const users = await user.find({}).sort({
        score: 1
    });
    res.status(200).json({
        "users": users.map((user) => ({
            name: user.name,
            score: user.score
        }))
    })
});

module.exports = router;