FROM node:alpine
LABEL maintainer="jakewmeyer@gmail.com"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]
