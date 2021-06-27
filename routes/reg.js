
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let bodyParser = require('body-parser');
const _ = require('lodash');
const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
mongoose.set('useFindAndModify', false);
 
let jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {
    const { error } = validate(req.body);
    if  (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ login: req.body.login });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['login', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['login']));
});

module.exports = router;