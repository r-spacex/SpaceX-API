FROM ruby:2.2

MAINTAINER Jake Meyer <jakewmeyer@gmail.com>

ENV SPACEX_HOST=
ENV SPACEX_USER=
ENV SPACEX_PASS=
ENV SPACEX_DB=

WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install --system

ADD . /app
RUN bundle install --system

EXPOSE 9292

CMD ["bundle", "exec", "rackup"]
