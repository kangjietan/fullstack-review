const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js')
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var callback = function(data) {
    // console.log(data);

    // INSERT AN ARRAY OF REPOS
    // Test server
    db.save(data, () => {
      console.log('CHECK DATABASE');
      res.sendStatus(200);
    });

    // ONE BY ONE
    // for (var i = 0; i < data.length; i++) {
    //   db.save(data[i], () => {
    //     res.end();
    //   })
    // }
  }

  github.getReposByUsername(req.body.term, callback);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  var callback = function(data) {
    console.log('Retrieve Data');
    res.json(data);
  }

  db.getAll(callback);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

