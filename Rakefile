require 'bundler'
require 'test/unit'
require 'rack/test'
require 'rake/testtask'

Rake::TestTask.new(:test) do |test|
  test.libs << 'lib' << 'test'
  test.pattern = 'test/test.rb'
  test.warning = true
  test.verbose = true
end

task default: [:test]
