
FROM node:alpine

RUN npm install --production

ENV NODE_ENV=production

LABEL maintainer="jakewmeyer@gmail.com"

EXPOSE 5000

CMD ["node", "server.js"]
