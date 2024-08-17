const express = require('express');

const UrlRouter = require('./routes/url');

const { connect } = require('./connect');

const app = express();

app.use(express.json());

const Port = 8001;
connect('mongodb://localhost:27017/url-shortner').then
(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app.use('/url', UrlRouter);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});


