# Rack uses this to start the application

require 'bundler'
require './app'

Bundler.require

run Sinatra::Application
