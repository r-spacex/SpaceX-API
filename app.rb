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
    launch_sites: '3',
    test_sites: '1',
    ceo: 'Elon Musk',
    cto: 'Elon Musk',
    coo: 'Gwynne Shotwell',
    cto_propulsion: 'Tom Mueller',
    valuation: '$15,000,000,000',
    summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
  }
  JSON.pretty_generate(home_response)
  end
#end
