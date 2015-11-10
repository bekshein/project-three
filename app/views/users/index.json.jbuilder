json.users(@users) do |user|
  json.id               user.id
  json.username         user.username
  json.password_digest  user.password_digest
end
