
const Joi = require('joi');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50  
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2048
    }
});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(article) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required(),   
        description: Joi.string().min(1).max(255).required(),     
        text: Joi.string().min(1).max(2048).required()  
    });

    return schema.validate(article);
}

exports.Article = Article; 
exports.validate = validateArticle;
