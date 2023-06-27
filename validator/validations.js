
const { body } = require('express-validator');


const signupValidator = [
    body("userName", "User name must be consist of 3 letter at least.").isLength({ min: 3 }),
    body("email", "email must be valid").isEmail(),
    body("password", "password must be consist of 6 letter at least.").isLength({ min: 6 })
]

const signinValidator =
    [
        body("email", "email must be valid").isEmail(),

    ]
const validateUserupdate = [
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    // body('password', "Invalid Password")
]
const validateUserdelete = [
    body('email', 'Invalid email').isEmail().normalizeEmail(),
    // body('password', "Invalid Password")
]

module.exports = {
    signupValidator,
    signinValidator,
    validateUserupdate,
    validateUserdelete
}



