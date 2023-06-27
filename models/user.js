const mongoose = require('mongoose');
// const uuidv1 = require('uuid');
// const crypto = require('crypto');
// const { body } = require('express-validator');

const { Schema } = mongoose;

const userShema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true,
            Unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        forgetpassword: {
            type: String,
            unique: true,
            default: ""
        },
        profilePath: {
            type: String
        },
        documents: [
            {

                contentType: { type: String, required: true },
                imagePath: { type: String, required: true }

            }
        ],
        isActive: {
            type: Boolean,
            default: false
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        salt: {
            type: Number,
            unique: true,
            default: 0
        }

    }, { timestamps: true })

// userShema.virtual("password")
//     .set(function (password) { 
//         _password = password;
//         salt = uuidv1();
//         this.encry_password = securePassword(password);
//     })
//     .get(function () {

//     });

// userShema.methods = {
//     authenticate: function (plainpassword) {
//         return this.securePassword(plainpassword)===this.password;   
//     },
//     securePassword: function (plainpassword) { 
//         if (!plainpassword) return "";
//         try {
//             return crypto.createHash('sha786', this.salt).update(plainpassword).digest('hex');
//         } catch (err) {
//             return "";
//         }
//     }
// }
const ModelToExport = mongoose.model('user', userShema);
module.exports = ModelToExport;