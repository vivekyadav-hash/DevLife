const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/profile' , authMiddleware, (req ,res) =>{
    res.status(200).json({
        message: 'Protected route accessed',
        userId: req.user.userId
    });
});

module.exports = router ;