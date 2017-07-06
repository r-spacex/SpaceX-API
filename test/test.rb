require "test/unit"
require "rack/test"
require_relative '../app'

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

  def test_response_is_ok
    get "/"
    assert last_response.ok?
    puts last_response.body
  end
end
