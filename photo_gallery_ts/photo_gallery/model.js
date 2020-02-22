"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ImageSchema = new mongoose.Schema({
    address: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
var Photo = mongoose.model("Image", ImageSchema);
exports.Photo = Photo;
var commentSchema = mongoose.Schema({
    comment: String
});
var Comment = mongoose.model("Comment", commentSchema);
exports.Comment = Comment;
