# SpaceX API for searching company info

require 'sinatra'
require 'sinatra/subdomain'
require 'json'
require 'date'
require 'mysql2'
require 'sequel'
require './data/company_info.rb'
require './data/falcon9.rb'
require './data/home_info.rb'
require './data/falcon_heavy.rb'
require './data/sites.rb'
require './data/dragon.rb'

# DB Connection initiated
DB = Sequel.connect('mysql://ofyslai9g5zjznpq:tvgm1fkpfh8iq5gp@wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/vew7rq9f0fviu36f')

# Disables rack protection because of false positives
# that were blocking connections to home page
disable :protection

# No longer necessary
# Forces the use of HTTPS for the API
#before do
#  redirect request.url.sub('http', 'https') unless request.secure?
#end

# Uses subdomain api.exaample.com to route traffic
subdomain :api do

get '/' do
  DB.fetch("SELECT * FROM launches") do |row|
  puts row[:name]
  end
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
end
