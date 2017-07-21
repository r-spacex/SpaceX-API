require "test/unit"
require "rack/test"
require_relative '../app'
require 'json'

module Rack
  module Test
    DEFAULT_HOST = "api.example.org"
  end
end

class AppTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    @app = SpacexAPI
  end

##########################################
# Tests all endpoints for correct number
# of JSON responses with predefined
# data + predictible responses
##########################################

  def test_home_response
    get "/"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_info_response
    get "/info"
    assert last_response.ok?
	  data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_latest_response
    get "/launches/latest"
    assert last_response.ok?
	  data = JSON.parse(last_response.body)
    assert data.count == 1
  end

  def test_launchpads_response
    get "/launchpads"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_vehicle_response
    get "/vehicles"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falcon1_response
    get "/vehicles/falcon1"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falcon9_response
    get "/vehicles/falcon9"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falconheavy_response
    get "/vehicles/falconheavy"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_dragon_response
    get "/vehicles/dragon"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_launches_response
    get "/launches"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_upcoming_response
    get "/launches/upcoming"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_launches_year_response
    get "/launches?year=2010"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count == 2
  end

  def test_launches_date_response
    get "/launches?from=2011-01-20&to=2013-05-25"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count == 3
  end

  def test_caps_response
    get "/parts/caps"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_cores_response
    get "/parts/cores"
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

end
