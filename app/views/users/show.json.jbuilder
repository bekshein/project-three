json.current_user current_user.username

json.id               @user.id
json.username         @user.username
json.password_digest  @user.password_digest

json.posts(@posts) do |post|

  json.id          post.id
  json.song_title  post.song_title
  json.artist_name post.artist_name
  json.vibe        post.vibe

end
