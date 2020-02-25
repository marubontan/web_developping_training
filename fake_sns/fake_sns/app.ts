import { Request, Response } from "express";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.get("/", (_: Request, res: Response) => {
    res.render("home", {postContent: ""});
})

app.post("/", (req: Request, res: Response) => {
    console.log(req.body.postContent);
    const postContent: string = req.body.postContent;
    res.render("home", {postContent: postContent});
})

app.listen(3000, () => {
    console.log("Service started");
})
