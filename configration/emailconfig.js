// const nodemailer = require('nodemailer');
// require('dotenv').config();
// module.exports = async (email, subject) => { 
//     try {
//         const transport = nodemailer.transport({
//             // host: process.env.HOST,
//             service: process.env.SERVICE,
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASSWORD

//             }
//         });
//         await transport.emailsender({
//             from: process.env.USER,
//             to: email,
//             subject: "Email verification",
//             html: <body><h1>Assalam Alaikum</h1>\
//                 <h2>verify your email with code</h2>
//                 <p>${code}</p>
//             </body>
//         });
//         console.log('Email sent successfully');
//     } catch (err) {
//         console.log("Email sent failed");
//         console.log(err);
//     }
// }


const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const emailsender = async (email, code,subject) => {
    try {
        const transport = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
       
        const mailOptions = ({
            from: process.env.NAME,
            to: email,
            subject: subject,
            html: `       <h1>Assalam Alaikum</h1>
        <h2>verify your email with code</h2>
        <p>${code}</p>
      `
        });
        await transport.sendMail(mailOptions)

        console.log('Email sent successfully');
        return true;

    } catch (err) {
        console.log("Email sent failed");
        console.log(err);

    }
};

const generateRandomIntegerPassword = () => {
    const length = 10;
    const password = '';
    for (let i = 0; i < length; i++) {
        password += Math.floor(Math.random() * 10);
    }
    return password;
};

module.exports = {
    emailsender,
    generateRandomIntegerPassword
}