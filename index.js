const express = require('express');
const ejs = require('ejs');
const path = require('path');
const UrlRouter = require('./routes/url');
const Url = require('./models/url');
const { connect } = require('./connect');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.get('/', async (req, res) => {
    const urls = await Url.find({});
    return res.render('view', { urls: urls });
});

const Port = 8001;


app.use('/url', UrlRouter);

connect('mongodb://localhost:27017/url-shortner')
    .then(() => {
        console.log('Connected to database');
        app.listen(Port, () => {
            console.log(`Server is running on port ${Port}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
    });

