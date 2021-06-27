
const {User, validate} = require('../models/user'); 
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;