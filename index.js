
const articles = require('./routes/articles');
const reg = require('./routes/reg');
const auth = require('./routes/auth');
const info = require('./routes/info');
const config = require('config');
const mongoose = require('mongoose');
const express = require("express");
const app = express();

// set westlecom_jwtPrivateKey=secretKey123 (только от имени администратора)

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey if not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/westlecom', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

// const regchema = new mongoose.Schema({
//     login: String,
//     password: String
// });

app.use(express.json());
app.use('/api/articles', articles);
app.use('/api/reg', reg);
app.use('/api/auth', auth);
app.use('/api/info', info);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
