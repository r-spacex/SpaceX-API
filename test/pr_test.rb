require 'test/unit'
require 'rack/test'
require_relative '../app'
require 'json'

module Rack
  module Test
    DEFAULT_HOST = 'api.example.org'.freeze
  end
end

class PrAppTest < Test::Unit::TestCase
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
    get '/pr'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end
end