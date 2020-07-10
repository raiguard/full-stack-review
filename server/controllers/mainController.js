module.exports = {
  //When building handler functions, make sure to consider:
  //1. What information does this handler function need to work properly?
  //2. What db query or queries need to run in this handler function?
  //3. What response should be sent back to the client-side?
  createPost: (req, res) => {
    const { id, postImage } = req.body,
      db = req.app.get("db");

    db.post
      .create_post(id, postImage)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  getUserPosts: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    db.post
      .get_user_posts(id)
      .then((posts) => res.status(200).send(posts))
      .catch((err) => res.status(500).send(err));
  },
  deletePost: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    db.post
      .delete_post(id)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  updateUsername: (req, res) => {
    const { id } = req.params,
      { username } = req.body;
    db = req.app.get("db");

    db.users
      .update_username(username, id)
      .then((user) => res.status(200).send(user))
      .catch((err) => console.log(err));
  }
};
