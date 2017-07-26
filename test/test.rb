require 'test/unit'
require 'rack/test'
require_relative '../app'
require 'json'

class AppTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    @app = SpacexAPI
  end

  ##########################################
  # Tests all endpoints for correct number
  # of JSON responses with predefined
  # data + predictible responses.
  ##########################################

  def test_home
    get '/api/v1/'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_info
    get '/api/v1/info'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_latest
    get '/api/v1/launches/latest'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count == 1
  end

  def test_launchpads
    get '/api/v1/launchpads'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_vehicle
    get '/api/v1/vehicles'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falcon1
    get '/api/v1/vehicles/falcon1'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falcon9
    get '/api/v1/vehicles/falcon9'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_falconheavy
    get '/api/v1/vehicles/falconheavy'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_dragon
    get '/api/v1/vehicles/dragon'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_launches
    get '/api/v1/launches'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_upcoming
    get '/api/v1/launches/upcoming'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_launches_year
    get '/api/v1/launches?year=2010'
    assert last_response.ok?
    assert last_response.body.include?('2010')
  end

  def test_launches_date
    get '/api/v1/launches?from=2011-01-20&to=2013-05-25'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count == 3
  end

  def test_caps
    get '/api/v1/parts/caps'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end

  def test_cores
    get '/api/v1/parts/cores'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end
end
