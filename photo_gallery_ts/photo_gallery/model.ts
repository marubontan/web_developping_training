export {};
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    address: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
let Photo = mongoose.model("Image", ImageSchema);

const commentSchema = mongoose.Schema({
    comment: String
});
let Comment = mongoose.model("Comment", commentSchema);

export {Photo};
export {Comment}