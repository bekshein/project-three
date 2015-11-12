# json.current_user current_user.username

json.id               @user.id
json.username         @user.username

json.posts(@posts) do |post|

  json.id          post.id
  json.title       post.title
  json.source      post.source
  json.vibe        post.vibe

end
