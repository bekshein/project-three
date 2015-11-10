# json.current_user current_user.username

json.posts(@posts) do |post|

  json.id          post.id
  json.song_title  post.song_title
  json.artist_name post.artist_name
  json.vibe        post.vibe
  json.author_id   post.user_id

end
