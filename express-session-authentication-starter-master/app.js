const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo');

const dbString = 'mongodb+srv://miknapsack:miKnapsack123!@oilstore.x5kx6sm.mongodb.net/?retryWrites=true&w=majority';
const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true
}

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

// 
app.use(session({
    secret : 'Some Secter',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl : 'mongodb+srv://miknapsack:miKnapsack123!@oilstore.x5kx6sm.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: dbOptions
    }),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {    
    console.log(req.session);
    console.log(req.user);
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

// function errorHandler1(err, req, res, next){
//     if(err){
//         res.json({err:err, test:'test'});
//     }
// }

//app.use(errorHandler1);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);