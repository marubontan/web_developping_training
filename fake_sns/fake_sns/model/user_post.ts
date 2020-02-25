import mongoose from "mongoose";

const postContentSchema = new mongoose.Schema({
    content: String
})

const postContent = mongoose.model("PostContent", postContentSchema);

export { postContent };

