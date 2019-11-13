const bcrypt = require('bcryptjs');

const Users = require('../auth/auth-model');

// module.exports = (req, res, next) => {
//     let { username, password } = req.headers;

//     if(username && password) {
//         Users.findBy({ username })
//         //first() takes it out of an array. An empty array is truthy so we can't do an if else for truthiness if it was an array (not doing here)
//         .first()
//         .then(user => {
//             if(user && bcrypt.compareSync(password, user.password)) {
//                 next();
//             } else {
//                 res.status(401).json({ message: 'Invalid Credentials' })
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Server Error' })
//         })
//     } else {
//         res.status(400).json({ message: 'Please provide credentials' })
//     }
// }

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  };