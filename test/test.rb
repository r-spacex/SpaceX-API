require 'test/unit'
require 'rack/test'
require_relative '../app'
require 'json'

module Rack
  module Test
    DEFAULT_HOST = 'api.example.org'.freeze
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

  def test_home
    get '/'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_info
    get '/info'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_latest
    get '/launches/latest'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count == 1
  end

  def test_launchpads
    get '/launchpads'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_vehicle
    get '/vehicles'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falcon1
    get '/vehicles/falcon1'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falcon9
    get '/vehicles/falcon9'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falconheavy
    get '/vehicles/falconheavy'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_dragon
    get '/vehicles/dragon'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_launches
    get '/launches'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_upcoming
    get '/launches/upcoming'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_launches_year
    get '/launches?year=2010'
    assert last_response.ok?
    assert last_response.body.include?('2010')
  end

  def test_launches_date
    get '/launches?from=2011-01-20&to=2013-05-25'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count == 3
  end

  def test_caps
    get '/parts/caps'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_cores
    get '/parts/cores'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end
end
