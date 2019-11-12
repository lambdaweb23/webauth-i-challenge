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
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 10)

    res.status(200).json({ password, hash })
})


module.exports = router;