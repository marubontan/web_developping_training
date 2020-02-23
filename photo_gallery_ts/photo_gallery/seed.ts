export { };
const mongoose = require("mongoose");

import { Comment, Photo } from "./model";

const photos: Map<String, String> = new Map([
    ["pugOne", "https://uploads.metropoles.com/wp-content/uploads/2019/10/31144808/PIGS.jpg"],
    ["pugTwo", "https://www.greenme.com.br/wp-content/uploads/2017/06/pug-1200x800.jpg"]
])

function seedDB(): void {
    Photo.deleteMany({}, (err: Error) => {
        if (err) {
            console.log(err);
        } else {
            console.log("removed photos");
            photos.forEach((v: String, k: any, m: any) => {
                new Photo({ address: v }).save((err: Error, photo: any) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("Saved address");
                        Comment.create({
                            comment: "fake comment"
                        }, (err: Error, comment: Object) => {
                            photo.comments.push(comment);
                            photo.save();
                            console.log("comment saved");
                        })
                    }
                });
            });
        }
    })
}

module.exports = seedDB;