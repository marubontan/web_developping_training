import { Request, Response, request } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import * as passportLocal from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import express from "express";
import mongoose from "mongoose";
import { User, postContent } from "./model/user_post"

mongoose.connect("mongodb://mongo:27017:photos", { useNewUrlParser: true });
const LocalStrategy = passportLocal.Strategy;

const app = express();
app.use(require("express-session")({
    secret: "it is a secret",
    resave: false,
    saveUnitialized: false
}))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

app.get("/", isLoggedIn, (_: Request, res: Response) => {
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

app.get("/login", (req: Request, res: Response) => {
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), (req: Request, res: Response) => {

})

app.get("/logout", (req: Request, res: Response) => {
    req.logout();
    res.redirect("/");
})

app.get("/register", (req: Request, res: Response) => {
    res.render("register");
})

app.post("/register", (req: Request, res: Response) => {
    User.register(new User({username: req.body.username}), req.body.password, (err: Error, user: any)=>{
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/login");
        })
    })
})

function isLoggedIn(req: Request, res: Response, next: any){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("Service started");
})
