json.current_user current_user.username

json.posts(@posts) do |post|

  json.id            post.id
  json.author        User.find(post.user_id).username
  json.song_title    post.song_title
  json.artist_name   post.artist_name


end
