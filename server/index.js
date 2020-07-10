//dotenv should be required at the top of the file.
require("dotenv").config();
//Below is some shorthand for variable declarations. If you have multiple
//declarations of the same type in a row, simply separate them with comma's instead
//of multiple vars, lets, or const.
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  authCtrl = require("./controllers/authController"),
  mainCtrl = require("./controllers/mainController"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  port = SERVER_PORT,
  app = express();

app.use(express.json());

//Recently massive updated, so passing a connection string is now done like below.
//Remember to NOT include ?ssl=true to your connection string in you .env.
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

//post endpoints
app.post("/api/post", mainCtrl.createPost);
app.get("/api/posts/:id", mainCtrl.getUserPosts);
app.delete("/api/post/:id", mainCtrl.deletePost);

//user endpoints
app.put("/api/user/:id", mainCtrl.updateUsername);

app.listen(port, () => console.log(`Memeing on port ${port}`));
