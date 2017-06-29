require "./app.rb"
require "test/unit"
require "rack/test"

class AppTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_response_is_ok
    get "/"
  end

  def test_response_is_ok_for_vehicles
    get "/vehicles"
  end

  def test_response_is_ok_for_launches_up
    get "/launches/upcoming"
  end

  def test_response_is_ok_for_launchpads
    get '/launchpads'
  end
end
