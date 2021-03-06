//set up
const express = require('express');
const bcrypt = require('bcryptjs');
//routes
const router = express.Router();
//model import
const UsersModel = require('../models/users.js');
//CRUD
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    UsersModel.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    UsersModel.findBy(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({message: `Welcome ${user.username}!`});
            } else {
                res.status(401).json({message: 'Invalid Credentials'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
module.exports = router;