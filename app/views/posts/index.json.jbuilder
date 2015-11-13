<<<<<<< HEAD
# json.current_user current_user.username
=======
json.current_user current_user.username
>>>>>>> 61d50e90adbc5d477f3d25d251b7500caf5fa116

json.posts(@posts) do |post|

  json.id          post.id
<<<<<<< HEAD
  json.title       post.title
  json.source      post.source
  json.vibe        post.vibe
  json.author_id   post.user_id
=======
  json.song_title  post.song_title
  json.artist_name post.artist_name
  json.vibe        post.vibe
>>>>>>> 61d50e90adbc5d477f3d25d251b7500caf5fa116

end
