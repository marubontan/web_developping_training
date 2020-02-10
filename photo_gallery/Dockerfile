FROM ubuntu:bionic

RUN apt-get update && apt-get install -y npm
ADD package.json /photo_gallery/package.json
ADD photo_gallery /photo_gallery/photo_gallery
WORKDIR /photo_gallery
RUN npm install
WORKDIR /photo_gallery/photo_gallery
CMD node app.js

EXPOSE 3000