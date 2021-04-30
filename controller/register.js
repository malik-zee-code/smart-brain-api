const handleRegister = (db, bcrypthash) => (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json("Incorrect form Submission");
  }
  const hash = bcrypthash.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginemail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginemail[0],
            joined: new Date(),
          })
          .then((users) => res.json(users[0]))
          .then(trx.commit)
          .catch(trx.rollback);
      });
  }).catch((error) => res.status(400).json("unable to register user"));
};
module.exports = {
  handleRegister: handleRegister,
};
