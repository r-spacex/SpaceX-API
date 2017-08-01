# Dockerfile with alpine based build

FROM ruby:2.4.1-alpine

MAINTAINER Jake Meyer <jakewmeyer@gmail.com>

RUN apk update && apk upgrade
RUN apk add --update alpine-sdk
RUN apk add ruby-bundler

WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install --system

ADD . /app
RUN bundle install --system

EXPOSE 9292

CMD ["bundle", "exec", "puma", "-e", "production"]
