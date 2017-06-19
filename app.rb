# SpaceX API for searching company info

require 'sinatra'
require 'sinatra/subdomain'
require 'json'
require 'neatjson'
require './data/home_info.rb'
require './data/company_info.rb'
require './data/falcon9.rb'
require './data/falcon_heavy.rb'
require './data/dragon.rb'
require './data/sites.rb'
require './data/launches.rb'


# Disables rack protection because of false positives
# that were blocking connections to home page
disable :protection


# No longer necessary
# Forces the use of HTTPS for the API
#before do
#  redirect request.url.sub('http', 'https') unless request.secure?
#end


# Uses subdomain api.exaample.com to route traffic
#subdomain :api do

get '/' do
  content_type :json
  JSON.neat_generate( $home_info, wrap:60 )
end

get '/info' do
  content_type :json
  JSON.neat_generate( $company_info, wrap:60 )
end

get '/vehicles/falcon9' do
  content_type :json
  JSON.neat_generate( $falcon9 )
end

get '/vehicles/falcon heavy' do
  content_type :json
  JSON.neat_generate( $falcon_heavy )
end

get '/vehicles/dragon' do
  content_type :json
  JSON.neat_generate( $dragon )
end

get '/vehicles/dragon' do
  content_type :json
  JSON.neat_generate( $dragon )
end
#end
