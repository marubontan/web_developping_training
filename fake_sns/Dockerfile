FROM node:10
WORKDIR /fake_sns
RUN npm install
RUN npm install -g typescript
RUN tsc -p .
WORKDIR /fake_sns/fake_sns
EXPOSE 3000
CMD node app.js