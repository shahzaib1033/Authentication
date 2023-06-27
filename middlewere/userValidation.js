
const { validationResult } = require('express-validator');


require('dotenv').config();
const jwt = require('jsonwebtoken');
const checkUserValidation = async (req, res, next) => {
    const errors = validationResult(req)
    if (!(errors.isEmpty())) {
        for (let err in errors.errors) {
            return res.status(400).json({
                error: errors.array()[err].msg
            })
        }
    }

    next();

}
const checktokenValidation = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1]
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
       
        if (decoded) {
            next();
        }
    }
    catch (err) {
        return res.status(400).json(
            {
                massage: err
            }
        )
    }
}

module.exports = { checkUserValidation, checktokenValidation }