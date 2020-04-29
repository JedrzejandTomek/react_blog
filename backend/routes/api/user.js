const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/default');

// @route   POST api/users
// @desc    Register user
// @access  Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be at least 6 characters long').isLength({ min: 6 })
] , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password} = req.body

    try {
        let user = await User.findOne({ email });
        //Checks if user already exists
        if(user) {
            return res.status(400).json( {errors: [{msg: "User already exists" }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        //New user instance
        user = new User({
            name,
            email,
            avatar,
            password
        });
        //password encrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Return jonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 360000 },
            (error, token) => {
                if(error) throw error;
                res.json({ token });
            })
            
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

    
})

module.exports = router;