FROM node:10
WORKDIR /fake_sns
EXPOSE 3000
CMD npm install && npm install -g typescript && tsc -p . && cd fake_sns && node app.js