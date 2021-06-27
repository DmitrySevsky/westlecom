
// const User = require('./user');
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
    // tags: {
    //     type: Array,
    //     validate: {
    //         validator: function(v) {
    //             return v.length > 0;
    //         },
    //         message: 'Acourse should have at least one tag.'
    //     }
    // },
    // tags: {
    //     type: [String],
    //     required: true,
    //     min: 1,
    //     max: 20,
    //     message: 'Acourse should have at least one tag.'
    // },
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
    // date: { type: Date, default: Date.now },
    // isPublished: Boolean
});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(article) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required(),     
        // tags: Joi.Array().min(1).max(0).required(),     
        description: Joi.string().min(1).max(255).required(),     
        text: Joi.string().min(1).max(2048).required()
        // date: Joi.Date(),     
        // isPublished: Joi.Boolean()     
    });

    return schema.validate(article);
}

exports.Article = Article; 
exports.validate = validateArticle;
