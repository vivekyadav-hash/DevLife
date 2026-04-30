const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, repassword } = req.body;

        // Step 2: check passwords match
        if (password !== repassword) {
            return res.status(400).json({ message: 'password is not matched ' });
        }

        // Step 3: check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user is already exist ' });
        }

        // Step 4: hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 5: create and save user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);

        res.status(201).json({ message: 'You registered Successfully ' , token:token});

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/login', async (req, res) => {

    // login logic here
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
    { userId: userData._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);
        res.status(200).json({ message: 'login successfully  ' , token:token});
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;