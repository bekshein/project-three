# json.current_user current_user.username

json.id               @user.id
json.username         @user.username
json.password_digest  @user.password_digest

json.posts(@posts) do |post|

  json.id          post.id
  json.title       post.title
  json.source      post.source
  json.vibe        post.vibe

end
