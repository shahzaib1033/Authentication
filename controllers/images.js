const Model = require('../models/images');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');


const uploadImages = async (req, res) => {
//    var fileName 
//         const Storage = await multer.diskStorage({
//             destination: (req, file, cb) => {
//                 const publicDir = path.join("D:\dummy\authentication", 'public');
//                 const imagesDir = path.join(publicDir, 'images');
//                 // create the directories if they don't exist
//                 if (!fs.existsSync(publicDir)) {
//                     fs.mkdirSync(publicDir);
//                 }
//                 if (!fs.existsSync(imagesDir)) {
//                     fs.mkdirSync(imagesDir);
//                 }
//                 cb(null, imagesDir);
//             },
//             filename: async (req, file, cb) => {
//                 const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//                  fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();
//                 // console.log(fileName);
           

//                 // req.imagePath = fileName;
//                 cb(null, fileName);
//             },
//         });
//     const upload = await multer({
//         storage: Storage,
//     }).single('file',)

//     upload(req, res, (err) => {
//         if (err) {
//             console.log(err);
//         } 
//         else {
//             const newImage = new Model({
//                 userId: id,
//                 imgname: req.body.imgname,
//                 image: {
//                     data: req.file.filename,
//                     contenttype: 'image/jpg',
//                 },
//                 imagePath: req.body.imagepath

//             });
//             newImage.save().then(() => res.send('success in upload')).catch(err => console.log(err))
//         }
//     })
}

 const directlyuploadImages = async (req, res) => {

     
     const imagePath = req.imagePath
     const contentType = req.body.contentType
     try {
        if(imagePath)
        return res.status(200).json({
            
            imagePath: imagePath,
            contentType: contentType
        })
        else {
            return res.send('error in upload image  not uploaded')
         }
    } catch (err) { 
        return res.status(500).json(err);
    }
     
 }

const showImages = async (req, res) => {

    const images = await Model.findOne({ imgname: req.body.imgname })
    // if (images) {
    const imagePath = images.imagePath;
    //     console.log(imagePath);
    //     return res.sendFile(imagePath);
    // }

    // const filename = req.params.filename;
    const filePath = path.join(__dirname, '../public/uploads', filename);
    res.sendFile(filePath);
    res.send("nothing to show")
}


module.exports = {
    uploadImages,
    showImages,
    directlyuploadImages
}
    // const directlyuploadImages = async (req, res) => {
    //     var fileName
    //     const token = crypto.randomBytes(15).toString('hex');
    //     const Storage = await multer.diskStorage({
    //         destination: 'uploads',
    //         filename: (req, file, cb) => {
    //             fileName = token + file.originalname;
    //             cb(null, fileName)
    //         }
    //     });
    //     const upload = await multer({
    //         storage: Storage,
    //     }).single('upload_image',)
    
    //     upload(req, res, (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             const imagePath = path.join(__dirname, fileName);
    //             res.status(200).json({
    //                 path: imagePath,
    //             })
    //             // newImage.save().then(() => res.send('success in upload')).catch(err => console.log(err))
    //         }
    //     })
    // }
    
    // const showImages = async (req, res) => {
    
    //     const images = await Model.findOne({ imgname: req.body.imgname })
    //     if (images) {
    //         return res.sendFile(`uploads/${images.imagePath}`);
    //     }
    // }