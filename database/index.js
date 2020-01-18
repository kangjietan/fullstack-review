const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// Data = [{..}, {..}, {..}, .....]
// id: Number
// name: String
// link: String -> owner.html_url: (which is the link)
// popularity: Number -> stargazers_count (repo 'followers')
// Sort by stargazers_count for top 25
// Uniqueness will be based on id

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  link: String,
  popularity: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (params, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repo = new Repo({
    id: 1,
    name: 'Test',
    link: 'Test123',
    popularity: 0
  });

  repo.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success')
    }
    cb();
  })
}

module.exports.save = save;