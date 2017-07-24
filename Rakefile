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

Rake::TestTask.new(:prtest) do |test|
  test.libs << 'lib' << 'test'
  test.pattern = 'test/pr_test.rb'
  test.warning = true
  test.verbose = true
end

# Disabled to allow for PR test path
#task default: [:test]
