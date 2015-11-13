if current_user
  json.current_user do
  	json.id		  @active_user.id
    json.username @active_user.username
    json.email    @active_user.email
  end
else
  json.current_user nil
end
