//require file 
const path = require('path');
const express = require('express');
const app = express();
const userrouter = require('./routes/user')
const imagesrouter = require('./routes/images')
const fs = require('fs');

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');

const swaggerUi = require('swagger-ui-express');
const { version } = require('env');
const swaggerDocument = require('./swagger-output.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require("dotenv").config();

// middleware 
require('./db/mondo-connect.js')
app.use(express.static('default'));
app.use(cors())
app.use(express.json())
// app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use('/user', userrouter)
app.use('/images', imagesrouter)
app.use("/images", express.static(path.join(__dirname, "public/images")))
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');



app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '930970068743-iaq4g70mrtrikuukhp12oj9gdfolqmtb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
    //  scope: ['profile', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        // Add your logic to handle user authentication
        console.log(profile);
        return cb(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send('Authentication Done');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin' }),
    function (req, res) {
        // Redirect or respond to the successful authentication
        res.redirect('/');
    }
);

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const publicDir = path.join(__dirname, 'public');
//         const imagesDir = path.join(publicDir, 'images');
//         // create the directories if they don't exist
//         if (!fs.existsSync(publicDir)) {
//             fs.mkdirSync(publicDir);
//         }
//         if (!fs.existsSync(imagesDir)) {
//             fs.mkdirSync(imagesDir);
//         }
//         cb(null, imagesDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();
//         console.log(fileName);
//         cb(null, fileName);
//     },
// });


// const upload = multer({ storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     try {
//         return res.status(200).json("file uploaded successfully")
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// })


//runing server
const port = process.env.PORT || 8000

app.listen(3000, () => {
    console.log('app is runing at ', 3000)
})



