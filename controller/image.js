const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "e2ce00f447ab47d1841aa3540e872252",
});
const handleAPIcall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json("Unable to work with API");
    });
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((error) => {
      res.status(400).json("Something went wrong");
    });
};
module.exports = {
  handleImage: handleImage,
  handleAPIcall: handleAPIcall,
};
