const express = require('express');
const Handler = require('../controllers/images');
const { uploads } = require('../middlewere/imagesStoring'); 
const { checktokenValidation } = require('../middlewere/userValidation');
const router = express.Router();
router
    .post('/uploadImages', checktokenValidation, Handler.uploadImages)
    
    .post("/upload", uploads,Handler.directlyuploadImages)
    .get('/showImages', checktokenValidation, Handler.showImages);

module.exports = router;