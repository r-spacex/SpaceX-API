#########################################
# SpaceX API for searching company info,
# vehicle info, launch sites, and
# launch data.
#########################################

require 'bundler/setup'
require 'sinatra'
require "sinatra/namespace"
require 'sinatra/subdomain'
require 'sinatra/cross_origin'
require 'json'
require 'mongo'
require 'redis'

# Uses modular version of Sinatra
class SpacexAPI < Sinatra::Base
  register Sinatra::Namespace
  register Sinatra::CrossOrigin

# Allow all connections
# Enable request logging
set :bind, '0.0.0.0'
set :logging, true

# Handler for 404 errors
error Sinatra::NotFound do
  send_file './pages/404.html'
end

# Enable CORS
configure do
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options "*" do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Accept"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end

# Read only DB credentials
user = 'public'
password = 'spacex'
database = 'spacex-api'

# Connection to MongoDB Replica Set
client = Mongo::Client.new("mongodb://#{user}:#{password}@spacex-api-shard-00-00-rzdz4.mongodb.net:27017"\
",spacex-api-shard-00-01-rzdz4.mongodb.net:27017,spacex-api-shard-00-02-rzdz4.mongodb.net:27017/#{database}"\
"?ssl=true&replicaSet=spacex-api-shard-0&authSource=admin&connectTimeoutMS=25000&maxPoolSize=25")

# Create new Redis client
redis = Redis.new

# Error for no results
error = { error: 'No Matches Found' }

# Disables rack protection because of false positives
# that were blocking connections to home page
disable :protection

# Single endpoint outside namespace
get '/' do
  content_type :json
  collection = client[:home]
  hash = collection.find({}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

# Sets version namespace for all following URL's
namespace '/v1' do

##########################################
# Basic Info Endpoints
##########################################

get '/' do
  content_type :json
  collection = client[:home]
  hash = collection.find({}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/info' do
  content_type :json
  collection = client[:info]
  hash = collection.find({}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/vehicles' do
  content_type :json
  collection = client[:vehicle]
  hash = collection.find({}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a)
end

get '/vehicles/falcon1' do
  content_type :json
  collection = client[:vehicle]
  hash = collection.find({id: 'falcon1'}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/vehicles/falcon9' do
  content_type :json
  collection = client[:vehicle]
  hash = collection.find({id: 'falcon9'}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/vehicles/falconheavy' do
  content_type :json
  collection = client[:vehicle]
  hash = collection.find({id: 'falcon_heavy'}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/vehicles/dragon' do
  content_type :json
  collection = client[:vehicle]
  hash = collection.find({id: 'dragon'}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/launchpads' do
  content_type :json
  collection = client[:launchpad]
  hash = collection.find({}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a)
end

# Get info on a specific launch pad
get '/launchpads/:pad' do
  content_type :json
  pad = params['pad']
  collection = client[:launchpad]
  hash = collection.find({id: "#{pad}"}, projection: {_id: 0})
  JSON.pretty_generate(hash.to_a[0])
end

get '/launches/latest' do
  content_type :json
  collection = client[:launch]
  hash = collection.find({}, projection: {_id: 0}).sort({flight_number: -1}).limit(1)
  JSON.pretty_generate(hash.to_a)
end

##########################################
# Launches endpoints
##########################################

# Returns all launches
get '/launches' do
  content_type :json
  collection = client[:launch]

  # Gets launches sorted by year
  if params['year']
    year = params['year']
    hash = collection.find({launch_year: "#{year}"}, projection: {_id: 0}).sort({flight_number: 1})

  # Gets launches in a date range
  elsif params['from'] and params['to']
    start = params['from']
    final = params['to']
    hash = collection.find({ launch_date_utc: {'$gte': "#{start}T00:00:00Z", '$lte': "#{final}T00:00:00Z"}}, projection: {_id: 0}).sort({flight_number: 1})

  # Gets all past launches
  else
    hash = collection.find({}, projection: {_id: 0}).sort({flight_number: 1})
  end

  # parse and return results
  array = hash.to_a
  if array.empty?
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

##########################################
# Upcoming launch endpoints
##########################################

get '/launches/upcoming' do
  content_type :json
  collection = client[:upcoming]

  # Gets upcoming launches sorted by year
  if params['year']
    year = params['year']
    hash = collection.find({launch_year: "#{year}"}, projection: {_id: 0}).sort({flight_number: 1})

  # Gets upcoming launches in a date range
  elsif params['from'] and params['to']
    start = params['from']
    final = params['to']
    hash = collection.find({launch_date_utc: {'$gte': "#{start}T00:00:00Z", '$lte': "#{final}T00:00:00Z"}}, projection: {_id: 0}).sort({flight_number: 1})

  # Gets all future launches
  else
    hash = collection.find({}, projection: {_id: 0}).sort({launch_date_utc: 1})
  end

  # parse and return results
  array = hash.to_a
  if array.empty?
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

##########################################
# Launches by part serial #'s'
##########################################

# Get all launches with a core serial number
get '/launches/cores/:core' do
  content_type :json
  core = params['core']
  collection = client[:launch]
  hash = collection.find({core_serial: "#{core}"}, projection: {_id: 0}).sort({core_serial: 1})
  array = hash.to_a
  if array.empty?
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

# Get info on a specific Dragon capsule
get '/parts/caps/:cap' do
  content_type :json
  cap = params['cap']
  collection = client[:capsule]
  hash = collection.find({capsule_serial: "#{cap}"}, projection: {_id: 0}).sort({capsule_serial: 1})
  JSON.pretty_generate(hash.to_a[0])
end

# Get all Dragon Capsule information
get '/parts/caps' do
  content_type :json
  collection = client[:capsule]
  hash = collection.find({}, projection: {_id: 0}).sort({capsule_serial: 1})
  JSON.pretty_generate(hash.to_a)
end

# Get all launches with capsule serial #
get '/launches/caps/:cap' do
  content_type :json
  cap = params['cap']
  collection = client[:launch]
  hash = collection.find({cap_serial: "#{cap}"}, projection: {_id: 0}).sort({capsule_serial: 1})
  array = hash.to_a
  if array.empty?
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

# Get all Dragon core information
get '/parts/cores' do
  content_type :json
  collection = client[:core]
  hash = collection.find({}, projection: {_id: 0}).sort({core_serial: 1})
  JSON.pretty_generate(hash.to_a)
end

# Get core information by serial #
get '/parts/cores/:core' do
  content_type :json
  core = params['core']
  collection = client[:core]
  hash = collection.find({core_serial: "#{core}"}, projection: {_id: 0}).sort({core_serial: 1})
  JSON.pretty_generate(hash.to_a[0])
end
end
end
