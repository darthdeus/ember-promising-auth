require 'bundler/setup'
require 'ember-dev'
require 'ember/source'

# This is not ideal
map "/lib" do
  run Rack::Directory.new('lib')
end

run EmberDev::Server.new
