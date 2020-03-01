import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const postContentSchema = new mongoose.Schema({
    content: String
})

UserSchema.plugin(passportLocalMongoose);

const postContent = mongoose.model("PostContent", postContentSchema);
const User = mongoose.model("User", UserSchema as PassportLocalSchema);

export { User, postContent };

