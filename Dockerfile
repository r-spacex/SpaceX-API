# Do yarn install with full image
FROM mhart/alpine-node:latest
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
LABEL maintainer="jakewmeyer@gmail.com"
WORKDIR /app
COPY --from=0 /app .
COPY . .
ENV NODE_ENV=production
ENV DOCKER=true
EXPOSE 5000
CMD ["node", "src/app.js"]
