const bcrypt = require('bcryptjs');
const UsersModel = require('../models/users.js');
module.exports = function restricted(req, res, next) {
    const {username, password} = req.headers;
    if (username && password) {
        UsersModel.findBy(username)
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({message: 'Invalid Credentials'});
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(400).json({message: 'Please provide valid credentials'});
    }
};