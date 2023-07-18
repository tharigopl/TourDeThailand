const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');

router.get('/protectedpass', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.get('/protected', utils.authMiddleware, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.get('/profile', utils.authMiddleware, async (req, res, next) => {

    const tokenParts = req.headers.authorization.split(' ');
    //console.log(req.headers);

    if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
        console.log("$$$$$$$$$$$$$$$$",req.headers);
        try {
            const verification = await jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
            console.log("#############",verification);
            var userId = verification.id;
            // Fetch the user by id 
            User.findOne({_id: userId}).then(function(user){
                // Do something with the user
                return res.send(200);
            });

        } catch(err) {
            res.status(401).json({ success: false, msg: "You are not authorized to visit this route" });
        }

    } else {
        res.status(401).json({ success: false, msg: "You are not authorized to visit this route" });
    }
    //return res.send(500);
    //res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.get('/profile', utils.authMiddleware, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', function(req, res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, user:user, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try {
    
        newUser.save()
            .then((user) => {

                const id = user._id;
                const jwt = utils.issueJWT(user);
                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

});

module.exports = router;