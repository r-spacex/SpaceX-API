FROM ruby:2.2

MAINTAINER Jake Meyer <jakewmeyer@gmail.com>

ENV SPACEX_HOST=example
ENV SPACEX_USER=example
ENV SPACEX_PASS=example
ENV SPACEX_DB=example

WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install --system

ADD . /app
RUN bundle install --system

EXPOSE 9292

CMD ["bundle", "exec", "rackup"]
