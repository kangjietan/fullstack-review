const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// mongoose.Promise = require('bluebird');
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

// Data = [{..}, {..}, {..}, .....]
// id: Number
// name: String
// link: String -> html_url: (which is the link)
// popularity: Number -> stargazers_count (repo 'followers')
// Sort by stargazers_count for top 25
// Uniqueness will be based on id

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    index: true,
    unique: true
  },
  name: String,
  link: String,
  popularity: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (params, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  if (params.length > 0) {
    Repo.insertMany(params, function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        // console.log('Insert multiple elements/repos', docs);
        console.log('Insert multiple elements/repos');
      }
      cb(params);
    });
  }
}

let getAll = (cb) => {
  Repo.findAsync({}, null, {sort: {popularity: -1}, limit: 25})
    .then(function(data) {
      cb(data);
    })
}

module.exports.save = save;
module.exports.getAll = getAll;

// module.exports = {
//   save: ,
//   getAll:
// }