
// authorization
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
// const User = require('../models/user'); 
const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
let bodyParser = require('body-parser');
const router = express.Router();
 
// create application/x-www-form-urlencoded parser
let jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
    const { error } = validateUser(req.body);
    if  (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ login: req.body.login });
    if (!user) return res.status(400).send('Invalid login or password.');

    const validPassword =  await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid login or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validateUser(user) {
    const schema = Joi.object({
        login: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required()        
    });

    return schema.validate(user);
}

module.exports = router;