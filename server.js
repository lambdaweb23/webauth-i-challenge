const express = require('express');
const configureMiddleware = require('./middleware/configure-middleware');
const authRouter = require('./auth/auth-router.js');
const session = require('express-session');

const server = express();

const sessionConfig = {
    name: "booger", // default name is sid
    secret: process.env.COOKIE_SECRET || "is it secret? is it safe?",
    cookie: {
      maxAge: 1000 * 60 * 60, // valid for 1 hour (in milliseconds)
      secure: process.env.NODE_ENV === "development" ? false : true, // do we send cookie over https only?
      httpOnly: true // prevent client javascript code from accessing the cookie
    },
    resave: false, // save sessions even when they have not changed
    saveUninitialized: true, // read about it on the docs to respect GDPR
    // store: new KnexSessionStorage({
    //   knex: knexConnection,
    //   clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
    //   tablename: "user_sessions",
    //   sidfieldname: "id",
    //   createtable: true
    // })
   };

configureMiddleware(server);

server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/auth', authRouter);

module.exports = server;