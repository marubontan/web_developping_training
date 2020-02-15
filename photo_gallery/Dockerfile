FROM node:10

ADD package.json /photo_gallery/package.json
ADD photo_gallery /photo_gallery/photo_gallery
WORKDIR /photo_gallery
RUN npm install
WORKDIR /photo_gallery/photo_gallery
EXPOSE 3000
CMD node app.js
