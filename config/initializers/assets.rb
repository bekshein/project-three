# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
<<<<<<< HEAD

Rails.application.config.assets.precompile += %w( angular.min.js angular.js angular.css angular-route.min.js a)
=======
Rails.application.config.assets.precompile += %w( angular.js angular.css )
>>>>>>> 61d50e90adbc5d477f3d25d251b7500caf5fa116
