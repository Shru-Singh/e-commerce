// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userrouter = express.Router();
const authorize = require("../middlewares/auth");
const userSchema = require("../models/user");
const { check, validationResult } = require('express-validator');



// Sign-up
userrouter.post("/register-user", [
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
], (req, res, next) => {
     const errors = validationResult(req);
        // console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
            email: req.body.email,
            password: hash,
        });
        let jwtToken = jwt.sign({
            email: user.email,
            userId: user._id
        }, "longer-secret-is-better", {
            expiresIn: "5h"
        });
        // res.status(200).json({
            
        //     expiresIn: 18000,
        //     _id: user._id
        // });
        user.save().then((response) => {
            res.status(201).json({
                message: "User successfully created!",
                result: response,
                token: jwtToken,
            });
            
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
}
});


// Sign-in
userrouter.post("/signin",authorize, (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
            getUser
            })
        }
    })
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

// Get Users
userrouter.route('/users').get( (req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single User
userrouter.route('/user-profile/:id').get(authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update User
userrouter.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})


// Delete User
userrouter.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = userrouter;