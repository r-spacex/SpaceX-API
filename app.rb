#########################################
# SpaceX API for searching company info,
# vehicle info, launch sites, and
# launch data.
#########################################

require 'bundler/setup'
require 'sinatra'
require 'sinatra/subdomain'
require 'require_all'
require 'json'
require 'mongo'
require_all 'data'

# Uses the modular version of Sinatra
class SpacexAPI < Sinatra::Base
  register Sinatra::Subdomain

# DB credentials
  host = ENV['MONGO_HOST']
  user = ENV['MONGO_USER']
  password = ENV['MONGO_PASS']
  database = ENV['MONGO_DB']

# Creates connection for mongo client  
 client = Mongo::Client.new("mongodb://#{user}:#{password}@#{host}:63892/#{database}")

# Disables rack protection because of false positives
# that were blocking connections to home page
disable :protection

# No longer necessary
# Forces the use of HTTPS for the API
# before do
#  redirect request.url.sub('http', 'https') unless request.secure?
# end

# Uses subdomain api.example.com to route traffic
subdomain :api do

##########################################
# Basic Info Endpoints
##########################################

get '/' do
  content_type :json
  JSON.pretty_generate($home_info)
end

get '/info' do
  content_type :json
  JSON.pretty_generate($company_info)
end

get '/vehicles' do
  content_type :json
  JSON.pretty_generate([$falcon1, $falcon9, $falcon_heavy, $dragon])
end

get '/vehicles/falcon1' do
  content_type :json
  JSON.pretty_generate($falcon1)
end

get '/vehicles/falcon9' do
  content_type :json
  JSON.pretty_generate($falcon9)
end

get '/vehicles/falconheavy' do
  content_type :json
  JSON.pretty_generate($falcon_heavy)
end

get '/vehicles/dragon' do
  content_type :json
  JSON.pretty_generate($dragon)
end

get '/launchpads' do
  content_type :json
  JSON.pretty_generate($launchpads)
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
    hash = collection.find({"launch_year": "#{year}"}, projection: {_id: 0})

  # Gets upcoming launches in a date range
  elsif params['start'] and params['final']
    start = params['start']
    final = params['final']
    hash = collection.find({}, projection: {_id: 0})

  # Gets all future launches
  else
    hash = collection.find({}, projection: {_id: 0})
  end

  # parse and return results
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
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
    hash = collection.find({"launch_year": "#{year}"}, projection: {_id: 0})

  # Gets upcoming launches in a date range
  elsif params['start'] and params['final']
    start = params['start']
    final = params['final']
    hash = collection.find({}, projection: {_id: 0})

  # Gets all future launches
  else
    hash = collection.find({}, projection: {_id: 0})
  end

  # parse and return results
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
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
  hash = collection.find({"core_serial": "#{core}"}, projection: {_id: 0})
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
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
  hash = collection.find({"capsule_serial": "#{cap}"}, projection: {_id: 0})
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

# Get all Dragon Capsule information
get '/parts/caps' do
  content_type :json
  collection = client[:capsule]
  hash = collection.find({}, projection: {_id: 0})
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

# Get all launches with capsule serial #
get '/launches/caps/:cap' do
  content_type :json
  cap = params['cap']
  collection = client[:launch]
  hash = collection.find({"cap_serial": "#{cap}"}, projection: {_id: 0})
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

# Get all Dragon core information
get '/parts/cores' do
  content_type :json
  collection = client[:core]
  hash = collection.find({}, projection: {_id: 0})
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end

# Get core information by serial #
get '/parts/cores/:core' do
  content_type :json
  core = params['core']
  collection = client[:core]
  hash = collection.find({"core_serial": "#{core}"}, projection: {_id: 0})
  array = hash.to_a
  if array.empty?
    error = { error: 'No Matches Found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(array)
  end
end
end
end
