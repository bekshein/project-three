if current_user
  json.current_user do
    json.username current_user.username
  end
else
  json.current_user nil
end
