
FROM node:14-alpine

LABEL maintainer="jakewmeyer@gmail.com"

HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl --silent --fail http://localhost:6673/v4/admin/health || exit 1

RUN apk add --no-cache --upgrade bash curl

ENV NODE_ENV=production

EXPOSE 6673

# Run as an unprivileged user.
RUN addgroup -S spacex && adduser -S -G spacex spacex 
RUN mkdir /app && chown spacex /app
USER spacex

WORKDIR /app
ENTRYPOINT ["/app/start.sh"]

COPY package.json package-lock.json /app/

RUN npm install --production

COPY . .

