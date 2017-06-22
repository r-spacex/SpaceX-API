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

# Database details
@host = "wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
@username = "ofyslai9g5zjznpq"
@password = "tvgm1fkpfh8iq5gp"
@db = "vew7rq9f0fviu36f"

# DB Connection initiated
DB = Mysql2::Client.new(:host => @host, :username => @username, :password => @password, :database => @db)

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

get '/launches' do
  content_type :json
  results = DB.query("SELECT * FROM launches")
    hash = results.each do |row|
    end
  JSON.pretty_generate(hash)
end

get '/launches/:year' do
  content_type :json
  year = params['year']
  results = DB.query("SELECT * FROM launches WHERE launch_year = #{year}")
    hash = results.each do |row|
    end
    if hash.empty?
      error = {error: 'No Matches Found'}
      JSON.pretty_generate(error)
    else
      JSON.pretty_generate(hash)
    end
end

get '/launches/from=:start/to=:final' do
  content_type :json
  start = params['start']
  final = params['final']
  results = DB.query("SELECT * FROM launches WHERE launch_date BETWEEN '#{start}' AND '#{final}';")
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
