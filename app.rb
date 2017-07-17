#########################################
# SpaceX API for searching company info,
# vehicle info, launch sites, and
# launch data.
#########################################

require 'bundler/setup'
require 'sinatra'
require 'sinatra/subdomain'
require 'json'
require 'date'
require 'mysql2'
require './data/company_info.rb'
require './data/falcon1.rb'
require './data/falcon9.rb'
require './data/home_info.rb'
require './data/falcon_heavy.rb'
require './data/launchpads.rb'
require './data/dragon.rb'

# Uses the modular version of Sinatra
class SpacexAPI < Sinatra::Base
  register Sinatra::Subdomain

# DB connection to MySQL
DB = Mysql2::Client.new(
  :host => ENV['SPACEX_HOST'],
  :username => ENV['SPACEX_USER'],
  :password => ENV['SPACEX_PASS'],
  :database => ENV['SPACEX_DB'],
  :reconnect => true
  )

# Disables rack protection because of false positives
# that were blocking connections to home page
disable :protection

# No longer necessary
# Forces the use of HTTPS for the API
# before do
#  redirect request.url.sub('http', 'https') unless request.secure?
# end

# Method for merging hashes of static data
def hash_merge(*hashes)
  hashes.inject :merge
end

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

  # Gets launches sorted by year
  if params['year']
    year = params['year']
    statement = DB.prepare('SELECT * FROM launch WHERE launch_year = ?')
    results = statement.execute(year)

  # Gets all launches in a date range
  elsif params['from'] and params['to']
    start = params['from']
    final = params['to']
    statement = DB.prepare('SELECT * FROM launch WHERE launch_date_utc BETWEEN ? AND ?;',)
    results = statement.execute(start, final)

  # Gets all launches
  else
    results = DB.query('SELECT * FROM launch', :cast_booleans => true)
  end

  # parse and return results
  hash = results.each do |row|
  end
  if hash.empty?
    error = { error: 'No matches found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(hash)
  end
end

##########################################
# Upcoming launch endpoints
##########################################

get '/launches/upcoming' do
  content_type :json

  # Gets upcoming launches sorted by year
  if params['year']
    year = params['year']
    statement = DB.prepare('SELECT * FROM upcoming WHERE launch_year = ?')
    results = statement.execute(year)

  # Gets upcoming launches in a date range
  elsif params['start'] and params['final']
    start = params['start']
    final = params['final']
    statement = DB.prepare('SELECT * FROM upcoming WHERE launch_date_utc BETWEEN ? AND ?;',)
    results = statement.execute(start, final)

  # Gets all future launches
  else
    results = DB.query("SELECT * FROM upcoming", :cast_booleans => true)
  end

  # parse and return results
  hash = results.each do |row|
  end
  if hash.empty?
    error = { error: 'No Matches Found' }
    JSON.pretty_generate(error)
  else
    JSON.pretty_generate(hash)
  end
end

##########################################
# Launches by part serial #'s'
##########################################

# Get all launches with a core serial number
get '/launches/cores/:core' do
  content_type :json
  core = params['core']
  statement = DB.prepare('SELECT * FROM launch WHERE core_serial = ?')
  results = statement.execute(core)
    hash = results.each do |row|
    end
    if hash.empty?
      error = { error: 'No Matches Found' }
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get info on a specific Dragon capsule
get '/parts/caps/:cap' do
  content_type :json
  cap = params['cap']
  statement = DB.prepare('SELECT * FROM capsule WHERE capsule_serial = ?')
  results = statement.execute(cap)
    hash = results.each do |row|
    end
    if hash.empty?
      error = { error: 'No Matches Found' }
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get all Dragon Capsule information
get '/parts/caps' do
  content_type :json
  results = DB.query('SELECT * FROM capsule', :cast_booleans => true)
    hash = results.each do |row|
    end
    if hash.empty?
      error = { error: 'No Matches Found' }
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get all launches with capsule serial #
get '/launches/caps/:cap' do
  content_type :json
  cap = params['cap']
  statement = DB.prepare('SELECT * FROM launch WHERE cap_serial = ?')
  results = statement.execute(cap)
    hash = results.each do |row|
    end
    if hash.empty?
      error = { error: 'No Matches Found' }
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get all Dragon core information
get '/parts/cores' do
  content_type :json
  results = DB.query('SELECT * FROM core', :cast_booleans => true)
    hash = results.each do |row|
    end
    if hash.empty?
      error = { error: 'No Matches Found' }
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get core information by serial #
get '/parts/cores/:core' do
  content_type :json
  core = params['core']
  statement = DB.prepare('SELECT * FROM core WHERE core_serial = ?')
  results = statement.execute(core)
    hash = results.each do |row|
    end
    if hash.empty?
      error = { error: 'No Matches Found' }
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end
end
end
