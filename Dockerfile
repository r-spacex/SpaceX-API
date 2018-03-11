FROM node:alpine
LABEL maintainer="jakewmeyer@gmail.com"
# Needs password as placeholder for redis-connection
ENV REDISCLOUD_URL=redis://default:default@redis_db:6379
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]
