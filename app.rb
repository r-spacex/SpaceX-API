# SpaceX API for searching company info

require 'sinatra'
require 'sinatra/subdomain'
require 'json'
require 'date'
require 'mysql2'
require './data/company_info.rb'
require './data/falcon9.rb'
require './data/home_info.rb'
require './data/falcon_heavy.rb'
require './data/sites.rb'
require './data/dragon.rb'

# DB Connection initiated
DB = Mysql2::Client.new(:host => ENV["SPACEX_HOST"], :username => ENV["SPACEX_USER"], :password => ENV["SPACEX_PASS"], :database => ENV["SPACEX_DB"], :reconnect => true)

# Disables rack protection because of false positives
# that were blocking connections to home page
disable :protection

# No longer necessary
# Forces the use of HTTPS for the API
before do
  redirect request.url.sub('http', 'https') unless request.secure?
end

# Uses subdomain api.exaample.com to route traffic
subdomain :api do

get '/' do
  content_type :json
  JSON.pretty_generate($home_info)
end

get '/info' do
  content_type :json
  JSON.pretty_generate($company_info)
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

get '/sites' do
  content_type :json
  JSON.pretty_generate($sites)
end

# Returns all launches
get '/launches' do
  content_type :json
  results = DB.query("SELECT * FROM launch")
    hash = results.each do |row|
    end
  JSON.pretty_generate(hash)
end

# Gets launches sorted by year
get '/launches/year=:year' do
  content_type :json
  year = params['year']
  statement = DB.prepare("SELECT * FROM launch WHERE launch_year = ?")
  results = statement.execute(year)
    hash = results.each do |row|
    end
    if hash.empty?
      error = {error: 'No Matches Found'}
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get all launches with a serial number
get '/launches/core=:core' do
  content_type :json
  core = params['core']
  statement = DB.prepare("SELECT * FROM launch WHERE core_serial = ?")
  results = statement.execute(core)
    hash = results.each do |row|
    end
    if hash.empty?
      error = {error: 'No Matches Found'}
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Get all launches with capsule serial #
get '/launches/cap=:cap' do
  content_type :json
  cap = params['cap']
  statement = DB.prepare("SELECT * FROM launch WHERE cap_serial = ?")
  results = statement.execute(cap)
    hash = results.each do |row|
    end
    if hash.empty?
      error = {error: 'No Matches Found'}
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

# Gets all launches in a date range
get '/launches/from=:start/to=:final' do
  content_type :json
  start = params['start']
  final = params['final']
  statement = DB.prepare("SELECT * FROM launch WHERE launch_date BETWEEN ? AND ?;")
  results = statement.execute(start, final)
    hash = results.each do |row|
    end
    if hash.empty?
      error = {error: 'No Matches Found'}
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end
end
