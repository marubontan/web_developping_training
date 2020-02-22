export {};
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({ address: String });
let Photo = mongoose.model("Image", ImageSchema);

module.exports = Photo;