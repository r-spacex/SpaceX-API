# Do npm install with full image
FROM mhart/alpine-node:latest
LABEL maintainer="jakewmeyer@gmail.com"
ENV REDISCLOUD_URL=redis://default:default@redis_db:6379
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 5000
CMD ["node", "src/app.js"]
