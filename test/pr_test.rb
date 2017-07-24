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
  # Tests a single endpoint to test for basic
  # app functionality for pull requests, since
  # travis restricts the env variables
  ##########################################

  def test_pr
    get '/pr'
    assert last_response.ok?
    data = JSON.parse(last_response.body)
    assert data.count > 0
  end
end