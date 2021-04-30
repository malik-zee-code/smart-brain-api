const handleSignin = (db, bcrypthash) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect form Submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((logindata) => {
      const isValid = bcrypthash.compareSync(password, logindata[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.status(400).json("unable to get user");
          });
      } else {
        res.status(400).json("Wrong Username or Password");
      }
    })
    .catch((err) => {
      res.status(400).json("Wrong Credentials");
    });
};
module.exports = {
  handleSignin: handleSignin,
};
