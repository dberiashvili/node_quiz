const router = require('express').Router();
const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validations/validations');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).json({
           "error": error.details[0].message
        })
    }

    const emailExists = await User.findOne({
        email: req.body.email
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (emailExists) return res.status(400).json({
      error: "Email already exists"
    });

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).json({
           "error":err
        });
    }
});

//Login
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) {
        return  res.status(400).json({
            error: "Email or password is incorrect"
        });
    }

    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).json({
        error:"Email or password is incorrect"
    });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json('Email or password is not valid');
    const token = jwt.sign({
        user: {
            name: user.name,
            email: user.email,
            _id: user._id,
            date: user.date
        }
    }, process.env.TOKEN);
    res.header('auth-token', token);
    res.status(200).send({token});
});


module.exports = router;
