// dotenv should be required at the top of the file.
require("dotenv").config();
// Below is some shorthand for variable declarations. If you have multiple
// declarations of the same type in a row, simply separate them with comma's instead
// of multiple vars, lets, or const.
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  authCtrl = require("./controllers/authController"),
  mainCtrl = require("./controllers/mainController"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

// Authentication
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
  })
);

// Recently massive updated, so passing a connection string is now done like below.
// Remember to NOT include ?ssl=true to your connection string in you .env.
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

// auth entpoints
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);

// post endpoints
app.post("/api/post", mainCtrl.createPost);
app.get("/api/posts/:id", mainCtrl.getUserPosts);
app.delete("/api/post/:id", mainCtrl.deletePost);

//user endpoints
app.put("/api/user/:id", mainCtrl.updateUsername);

app.listen(SERVER_PORT, () => console.log(`Memeing on SERVER_PORT ${SERVER_PORT}`));
