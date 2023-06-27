const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({

    userId: {
       type: String,
   },
    imgname: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    imagePath: {
        type: String,

    }

})
imageSchema.post('save', function (doc) {
    // Generate the image path logic
    // const imageName = this._id.toString(); // Use the document ID as the image name
    const imagePath = `uploads/${this.imgname}.jpg`; // Set the image path
    doc.set('imagePath', imagePath);
    doc.save(); // Call next to continue saving the document
});

const ImageSchema = mongoose.model('imageSchema', imageSchema);
module.exports = ImageSchema;