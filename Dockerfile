
FROM node:14-alpine

LABEL maintainer="jakewmeyer@gmail.com"

HEALTHCHECK --interval=10s --timeout=3s \
  CMD ./scripts/healthcheck.js

RUN apk add --no-cache --upgrade bash

ENV NODE_ENV=production
ENV HEALTH_URL=http://localhost:6673/v4/admin/health

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

