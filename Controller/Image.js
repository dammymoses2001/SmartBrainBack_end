const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.APIKEY,
});

const handleImageUrl = (req, res) => {
  const { linkbox } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, linkbox)
    .then((data) => res.json(data));
};

const handleImageEntries = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('*')
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.status(400).json('not available currently');
      }
    })
    .catch((err) => res.status(400).json('err'));
};

module.exports = {
  handleImageEntries,
  handleImageUrl,
};
