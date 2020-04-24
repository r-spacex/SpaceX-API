
FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production

LABEL maintainer="jakewmeyer@gmail.com"

CMD ["node", "jobs/worker.js"]
