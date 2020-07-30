const { Router } = require('express');
const router = Router();
const { SignUp,LogIn} = require('../controllers/user.controller')

router.route("/register")
    .post(SignUp)

router.route('/login')
    .post(LogIn);

module.exports = router;