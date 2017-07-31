# Rack uses this to start the application

require 'bundler'
require './src/app.rb'

Bundler.require

run SpacexAPI
