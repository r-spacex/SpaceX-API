FROM ruby:2.4

MAINTAINER Jake Meyer <jakewmeyer@gmail.com>

WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install --system

ADD . /app
RUN bundle install --system

EXPOSE 9292

CMD ["bundle", "exec", "puma"]
