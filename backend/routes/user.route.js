const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../model/User');

// Add User
userRoute.route('/createUser').post((req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = userRoute;