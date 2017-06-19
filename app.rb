# SpaceX API for searching company info

require 'sinatra'
require 'sinatra/subdomain'
require 'json'
require 'rest-client'
require 'sinatra/json'


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

  # Home page for the API
  get '/' do
  content_type :json
  home_response = {
    founder: 'Elon Musk',
    founded: '2002',
    employees: '6000',
    headquarters: {
      address: 'Rocket Road',
      city: 'Hawthorne',
      state: 'California'
    },
    vehicles: '3',
    ceo: 'Elon Musk',
    valuation: '$15,000,000,000'
  }
  JSON.pretty_generate(home_response)
  end
#end
