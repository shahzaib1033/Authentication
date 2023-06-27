const express = require('express');
const Handler = require('../controllers/user');

const {
    signupValidator,
    signinValidator,

} = require('../validator/validations');
const { signUpHandler } = Handler;
const { checkUserValidation, checktokenValidation } = require('../middlewere/userValidation');
const router = express.Router();


router.post('/signup', signUpHandler)
    .post('/signin', signinValidator, checkUserValidation, Handler.signinHandler)
    .post('/verfication', checkUserValidation, Handler.emailValidator)
    .post('/changePassword', checktokenValidation, Handler.changePassword)
    .get('/userprofile', checktokenValidation, Handler.profile)
    .put('/forgetpassword', Handler.forgetPassword)
    .put('/resendOTP', Handler.resendpassword)
    .put('/resetThePassword', Handler.resetThePassword)
    .put('/uptadeUserName', checktokenValidation, Handler.updateHandler)
    .delete('/deleteUser', checktokenValidation, Handler.deleteHandler);
module.exports = router;