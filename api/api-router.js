const router = require('express').Router();
const bcrypt = require('bcryptjs')

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
    res.send('API auth!')
})

router.post('/hash', (req, res) => {
    // read a password from the body
    const password = req.body.password;
    // hash the password using bcryptjs
    const hash = bcrypt.hashSync(password, 12)

    // return it to the user in an object that looks like
    // { password: 'original passsword', hash: 'hashed password' }
    res.status(200).json({ password, hash })
})


module.exports = router;