const { Router } = require('express');
const auth = require('../middleware/auth');
const router = Router();
const { SignUp,LogIn,DeleteUser,tokenValid } = require('../controllers/user.controller')

router.route("/register")
    .post(SignUp)

router.route('/login')
    .post(LogIn);

router.delete('/delete',auth,DeleteUser)

router.post('/tokenIsValid',tokenValid)

module.exports = router;