insert into meme_user (
  username,
  email,
  password,
  profile_picture
) values (
  ${username},
  ${email},
  ${hash},
  ${profilePicture}
)
returning user_id, username, email, profile_picture;