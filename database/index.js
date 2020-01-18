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

  // Splice the entry out of the array if it exists inside the db
  for (var i = 0; i < params.length; i++) {
    if (Repo.find(params[i].id)) {
      params.splice(i, 1);
      i--;
    }
  }
  console.log('Params array', params);

  Repo.insertMany(params, function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Insert multiple elements/repos', docs);
    }
    cb();
  });

  // var newRepo = {
  //   id: 1,
  //   name: 'Test',
  //   link: 'Test123',
  //   popularity: 0
  // }

  // var repo = new Repo({
  //   id: 1,
  //   name: 'Test',
  //   link: 'Test123',
  //   popularity: 0
  // });

  // repo.save(function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Success')
  //   }
  //   cb();
  // });

  // var arr = [
  //   {
  //     id: 1,
  //     name: 'Test',
  //     link: 'Test1234',
  //     popularity: 0
  //   },
  //   {
  //     id: 2,
  //     name: 'Test1',
  //     link: 'Test1235',
  //     popularity: 1
  //   },
  //   {
  //     id: 3,
  //     name: 'Test2',
  //     link: 'Test1236',
  //     popularity: 2
  //   }
  // ]

  // Repo.insertMany(arr, function(err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Insert multiple elements/repos');
  //   }
  //   cb();
  // });
}

module.exports.save = save;