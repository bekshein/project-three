# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# Faker for Users
User.create!(username: "foobs",
             email: "foo@bar.com",
             password: "foobar")

99.times do |n|
  username = Faker::Internet.user_name
  email = Faker::Internet.free_email
  password = Faker::Internet.password(4)
  User.create!(username:  username,
               email: email,
               password: password)
 end

# Faker for following relationships
users = User.all
user = users.first
following = users[2..50]
followers = users[3..40]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }
