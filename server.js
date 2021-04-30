const express = require("express");
const bcrypthash = require("bcrypt-nodejs");
const cors = require("cors");const register = require("./controller/register");
const signin = require("./controller/signin");
const profile = require("./controller/profile");
const image = require("./controller/image");
const knex = require("knex");
const app = express();


const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});
db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

app.use(express.json());
app.use(cors());
//------------------Root page -----------------------------------

app.get("/", (req, res) => {
  res.send("success");
});

//---------------Signin---------------------------------------
app.post("/signin", signin.handleSignin(db, bcrypthash));

//---------------Register ---------------------------------
app.post("/register", register.handleRegister(db, bcrypthash));

//----------------------Profile--------------------------------
app.get("/profile/:id", profile.handleProfile(db, bcrypthash));

//--------------------Image --------------------------------------
app.put("/image", image.handleImage(db));

//--------------------ImageURL -----------------------------------
app.put("/imageurl", (req, res) => {
  image.handleAPIcall(req,res);
});

//-------------------Listener -----------------------------
app.listen(2000, () => {
  console.log("server is running");
});

/*
/ -->get {res (success/fail)}
/signin --> post  res (signing in)
/register --> post res (signed up)
/profile/:userid -->GET (user)
/images --> PUT (user)
*/
