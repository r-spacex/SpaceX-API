FROM golang:latest as builder

LABEL maintainer="jakewmeyer@gmail.com"

WORKDIR /

COPY . .

RUN apt update
RUN apt install -y upx-ucl

RUN go mod download
RUN go mod verify

RUN groupadd -r app && useradd -r -g app app

# Build flags to strip debug info + compress binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o ifconfig && upx ifconfig

# Build smaller base image
FROM alpine:latest

# Add curl for healthcheck
RUN apk --update add curl

WORKDIR /

# Import from builder
COPY --from=builder /spacex-api .
COPY --from=builder /etc/passwd /etc/passwd

EXPOSE 6673

# Use an unprivileged user.
USER app

ENV APP_ENV production

ENTRYPOINT ["/spacex-api"]

HEALTHCHECK CMD curl --silent http://localhost:6673/health || exit 1
