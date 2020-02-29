import { Request, Response } from "express";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { postContent } from "./model/user_post"

mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true });

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.get("/", (_: Request, res: Response) => {
    postContent.find({}, (err: Error, contents: any) => {
        if (err) throw err;
        res.render("home", { postContents: contents });

    })
})

app.post("/", (req: Request, res: Response) => {
    const content: string = req.body.postContent;
    const newPost = new postContent({ "content": content });
    newPost.save((err: Error, _: any) => {
        if (err) throw err;
        console.log("post saved");
        postContent.find({}, (err: Error, contentDB: any) => {
            if (err) throw err;
            console.log(contentDB);
            res.render("home", { postContents: contentDB });
        });
    });
})

app.listen(3000, () => {
    console.log("Service started");
})
