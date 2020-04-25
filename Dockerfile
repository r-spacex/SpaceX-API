
FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production

LABEL maintainer="jakewmeyer@gmail.com"

EXPOSE 5000

RUN apk add --no-cache --upgrade bash

ENTRYPOINT ["./start.sh"]
