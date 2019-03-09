const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');


app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27021', { useNewUrlParser: false })
const userRoutes = require('./routes/user');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Conent-Type, Acept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status=404;
    next(error);    
});

app.use((error, req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;