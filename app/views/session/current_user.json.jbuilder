if current_user
  json.current_user do
    json.username current_user.username
<<<<<<< HEAD
    json.id current_user.id
=======
>>>>>>> 61d50e90adbc5d477f3d25d251b7500caf5fa116
  end
else
  json.current_user nil
end
