const {Article, validate} = require('../models/article'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');

let jsonParser = bodyParser.json()

router.get('/', jsonParser, async (req, res) => {
  const articles = await Article.find().sort('name');
  res.send(articles);
});

router.post('/', jsonParser, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let new_article = new Article({ 
    name: req.body.name,
    author: req.body.author,
    // tags: req.body.tags,
    description: req.body.description,
    text: req.body.text
    // date: req.body.date,
    // isPublished: req.body.isPublished
  });
  new_article = await new_article.save();
  
  res.send(new_article);
});

router.put('/:id', jsonParser, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const article = await Article.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      author: req.body.author,
      // tags: req.body.tags,
      description: req.body.description,
      text: req.body.text,
      // date: req.body.date,
      // isPublished: req.body.isPublished    
    });

  if (!article) return res.status(404).send('The article with the given ID was not found.');
  
  res.send(article);
});

router.delete('/:id', jsonParser, async (req, res) => {
  const article = await Article.findByIdAndRemove(req.params.id);

  if (!article) return res.status(404).send('The article with the given ID was not found.');

  res.send(article);
});

router.get('/:id', jsonParser, async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) return res.status(404).send('The article with the given ID was not found.');

  res.send(article);
});

module.exports = router; 