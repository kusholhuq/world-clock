require('dotenv/config')
const express = require('express');
const fetch = require('node-fetch');

const staticMiddleware = require('./static-middleware');
const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get("/api/iss-coords", (req, res) => {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(coords => res.json(coords))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    })
});

app.get("/api/geocode/:latlng", (req, res) => {
  const { latlng } = req.params;
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${process.env.GOOGLE_API}`)
    .then(response => response.json())
    .then(locDeets => res.json(locDeets))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    })
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
