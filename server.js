const express = require("express");
const configureMiddleware = require("./middleware/configure-middleware");
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);
require("dotenv").config();
// const knexConnection = require("./data/db-config");
const authRouter = require("./auth/auth-router.js");
const server = express();

const sessionConfiguration = {
 name: "booger", // default name is sid
 secret: process.env.COOKIE_SECRET || "is it secret? is it safe?",
 cookie: {
   maxAge: 1000 * 60 * 60, // valid for 1 hour (in milliseconds)
   secure: process.env.NODE_ENV === "development" ? false : true, // do we send cookie over https only?
   httpOnly: true // prevent client javascript code from accessing the cookie
 },
 resave: false, // save sessions even when they have not changed
 saveUninitialized: true, // read about it on the docs to respect GDPR
 store: new KnexSessionStorage({
   knex: require("./data/db-config"),
   clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
   tablename: "knexsessions",
   sidfieldname: "sessionid",
   createtable: true
 })
};
// 3: use the session middleware globally
configureMiddleware(server);
server.use(express.json());
server.use(session(sessionConfiguration));
server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
 res.json({ api: "up", session: req.session });
});
module.exports = server;




// const express = require('express');
// const configureMiddleware = require('./middleware/configure-middleware');
// const authRouter = require('./auth/auth-router.js');
// const session = require('express-session');
// require("dotenv").config(); // <<<<<<<<< npm i dotenv

// const server = express();

// const sessionConfig = {
//     name: "booger", // default name is sid
//     secret: process.env.COOKIE_SECRET || "is it secret? is it safe?",
//     cookie: {
//       maxAge: 1000 * 60 * 60, // valid for 1 hour (in milliseconds)
//       secure: process.env.NODE_ENV === "development" ? false : true, // do we send cookie over https only?
//       httpOnly: true // prevent client javascript code from accessing the cookie
//     },
//     resave: false, // save sessions even when they have not changed
//     saveUninitialized: true, // read about it on the docs to respect GDPR
//     // store: new KnexSessionStorage({
//     //   knex: knexConnection,
//     //   clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
//     //   tablename: "user_sessions",
//     //   sidfieldname: "id",
//     //   createtable: true
//     // })
//    };

// configureMiddleware(server);

// server.use(express.json());
// server.use(session(sessionConfig));
// server.use('/api/auth', authRouter);

// module.exports = server;