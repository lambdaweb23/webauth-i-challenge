const express = require('express');
const configureMiddleware = require('./middleware/configure-middleware');
const authRouter = require('./auth/auth-router.js');
const server = express();

configureMiddleware(server);

server.use(express.json());
server.use('/api/auth', authRouter);

module.exports = server;