const express = require('express');
const server = express();
const entryRouter = require('./routes/entry.js');
const usersRouter = require('./routes/users.js');
const restricted = require('./auth/restricted.js');
server.use(express.json());
server.use('/api/', entryRouter);
server.use('/api/users', restricted, usersRouter);
module.exports = server;