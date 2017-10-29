FROM node:alpine

LABEL maintainer="jakewmeyer@gmail.com"

ENV NODE_ENV=production

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

COPY . /home/nodejs/app
RUN npm install --production

EXPOSE 5000
CMD [ "npm", "start" ]
