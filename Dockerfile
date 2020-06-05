
FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production

LABEL maintainer="jakewmeyer@gmail.com"

EXPOSE 6673

RUN apk add --no-cache --upgrade bash
RUN apk --update add curl

# Run as an unprivileged user.
RUN addgroup -S spacex && adduser -S -G spacex spacex 
USER spacex

ENTRYPOINT ["./start.sh"]

HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl --silent --fail http://localhost:6673/v4/admin/health || exit 1
