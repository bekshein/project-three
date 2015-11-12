json.followers do
  json.user do
    json.id       @user.id
    json.username @user.username
    json.email    @user.email
  end

  json.users(@users) do |user|
    json.id       user.id
    json.username user.username
    json.email    user.email
  end
end
