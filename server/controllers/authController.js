const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, email, password, profilePicture } = req.body,
      db = req.app.get("db");

    // Check for email conflicts
    const foundUser = await db.users.check_user({ email });
    if (foundUser[0]) {
      return res.status(400).send("Email already in use");
    }

    // Generate password hash
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());

    // Register the user, set it on session
    const newUser = await db.register_user({ username, email, hash, profilePicture });
    req.session.user = newUser[0];
    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");

    // Check if the user exists
    const foundUser = await db.users.check_user({ email });
    if (!foundUser[0]) {
      return res.status(400).send("Email or password is incorrect");
    }

    // Generate hash and compare to stored hash
    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (!authenticated) {
      return res.status(400).send("Email or password is incorrect");
    }

    delete foundUser[0].password;
    req.session.user = newUser[0];
    res.status(202).send(req.session.user);
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
