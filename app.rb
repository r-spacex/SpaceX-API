# SpaceX API for searching company info

require 'sinatra'
require 'sinatra/subdomain'
require 'json'
require './data/company_info.rb'
require './data/falcon9.rb'
require './data/home_info.rb'
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

get '/launches/from=:date1/to=:date2' do
  date1 = params[:date1]
  date2 = params[:date2]
  
  "First date is #{date1}"
  "Second date is #{date2}"
  #content_type :json
  #JSON.pretty_generate($launches)
end
end
