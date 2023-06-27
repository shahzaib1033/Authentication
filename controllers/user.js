const { emailsender, generateRandomIntegerPassword } = require('../configration/emailconfig');
const generatePassword = require('../configration/generatingCode');
const massages = require('../configration/massage');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const path = require('path');
const pushNotifications = require('../configration/firebase');
require("dotenv").config();

const signUpHandler = async (req, res) => {
    try {

        const { userName, lastName, email, password, documents } = req.body;

        const oldUser = await userModel.findOne({ email })
        if (oldUser) {
            return res.send(massages.alreadyexisting)
        }
        const encryptedpassword = await bcrypt.hash(password, 10)
        const saveData = await userModel.create({
            userName: userName,
            lastName: lastName,
            email: email,
            password: encryptedpassword,
            documents: documents
        });


        if (saveData) {
            const { _id, documents } = await saveData
            console.log(documents)
        }
        // const code = generateRandomIntegerPassword();

        const code = await generatePassword()
        console.log(code)
        saveData.salt = code;
        await saveData.save();
        console.log(saveData.salt)
        const subject = "User Verification"
        await emailsender(email, code, subject);


        if (saveData) {
            // imgHandler.uploadImages(req, res, _id)
            res.status(200).send(massages.createdNowVerify)
        }
    } catch (err) {
        res.status(500).json({ message: massages.unexpectedError, error: err });

    }

}


const signinHandler = async (req, res) => {
    try {
        const { email, token,password } = req.body;
        const user = await userModel.findOne({ email })
        const { userName, lastName, documents } = await user
        if (!user.isActive) {
            return res.status(403).send(masssages.verifyFirst)

        }

        const data = { userName, lastName, email, documents }
       
        if (email && (await bcrypt.compare(password, user.password)) && !(user.isDelete)) {
            const tokens = jwt.sign({ _id: user.id }, process.env.SECRET);
            

            console.log(tokens, massages.successInLogin)
            res.status(200).json({ tokens, massage: massages.successInLogin, userData: data });
        return await    pushNotifications(token, `Hy ${email}`, "your account has been signing  in on other device is that you")
        }
        
        else {
    res.send(massages.invalidData)
}
    }

    catch (err) {
    console.log(err);
}
}

const updateHandler = async (req, res) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (user) {
            console.log("yes user fond exists")
        }


        if (email && (await bcrypt.compare(password, user.password))) {
            user.userName = req.body.userName;
            user.lastName = req.body.lastName;
        }
        res.status(200).send(massages.successInUpdate);


    }
    catch (err) {
        res.json({ message: err.message })
    }

}

const deleteHandler = async (req, res) => {

    try {

        const user = await userModel.findOne({ email })
        user.isDelete = true;
        user.isActive = false;
        await user.save();
        res.status(200).send(massages.successInDelete);
    }
    catch (err) {
        res.json({ message: err.message })

    }
}
const emailValidator = async (req, res) => {

    try {
        const { salt } = req.body
        const user = await userModel.findOne({ salt })
        if (!user) {
            res.send(massages.userNotfond, salt)
        }
        if (user.salt === salt) {
            const token = jwt.sign({ _id: user.id }, process.env.SECRET);
            // console.log(token, massages.successInLogin)
            const { userName, lastName, email, documents } = await user
            const data = { userName, lastName, email, documents, token }
            user.isActive = true
            user.salt = '';
            await user.save();
            console.log(user.isActive)
            res.status(200).json(data);
        }
    } catch (err) {
        res.json(err.message)
    }
}

const changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;


        const id = req.user._id;
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: massages.userNotfond })
        }
        if (await bcrypt.compare(password, user.password)) {
            const encryptedpassword = await bcrypt.hash(newPassword, 10)
            user.password = encryptedpassword;
            await user.save();
            return res.status(200).send(massages.successInchange);
        }
        return res.send(massages.errorInReset)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        // const code = await generatePassword();

        // user.forgetpassword = code;
        if (user) {
            const token = crypto.randomBytes(15).toString('hex');
            const url = 'http://ww.abc.com/users/' + token;
            user.forgetpassword = token;
            await user.save();
            const subject = 'Forgot your password'
            await emailsender(email, url, subject);

            res.status(200).json({ url, token });
        }
    } catch (err) {
        return res.json({ message: err.message })
    }
}

const resetThePassword = async (req, res) => {

    try {
        const { newPassword, token } = req.body;
        console.log(token);
        const user = await userModel.findOne({ forgetpassword: token });
        if (user) {

            console.log(user)

            const encryptedpassword = await bcrypt.hash(newPassword, 10)
            user.password = encryptedpassword;
            user.forgetpassword = '';
            await user.save();

            return res.status(200).send(massages.successInReset);

        }
        res.status(404).send(massages.tokenNotExist)
    } catch (err) {
        res.json({ message: err.message })
    }

}
const profile = async (req, res) => {
    const id = req.user._id;
    const user = await userModel.findOne({ _id: id })
    if (!user) {
        return res.status(404).send(massages.userNotfond)
    }
    const { _id,
        userName,
        lastName,
        email
    } = user
    const data = {
        _id,
        userName,
        lastName,
        email
    }
    return res.status(200).json(data)
}

const resendpassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        // const code = await generatePassword();

        // user.forgetpassword = code;
        if (user) {
            const code = await generatePassword()
            console.log(code)
            user.salt = code;
            await user.save();
            console.log(user.salt)
            const subject = "User Verification"
            await emailsender(email, code, subject);
            res.status(200).json({ massage: "verification code successfully sent to user " });
        }
    } catch (err) {
        return res.json({ error: err })
    }

}
module.exports = {
    signUpHandler,
    signinHandler,
    deleteHandler,
    emailValidator,
    updateHandler,
    changePassword,
    forgetPassword,
    resetThePassword,
    profile,
    resendpassword

}