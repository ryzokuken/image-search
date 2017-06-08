const express = require('express');
const GoogleImages = require('google-images');

const app = express();
const images = new GoogleImages(process.env.APP_ID, process.env.API_KEY);

let searches = [];

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/search/:search', (req, res) => {
  images.search(req.params.search, { page: req.query.offset || 1 }).then((images) => {
    res.json(images);
    searches.push({ what: req.params.search, when: new Date() })
  });
});

app.get('/recent', (req, res) => {
  res.json(searches);
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
