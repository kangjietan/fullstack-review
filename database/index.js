const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
// mongoose.Promise = require('bluebird');
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

// Data = [{..}, {..}, {..}, .....]
// id: Number
// name: String
// link: String -> owner.html_url: (which is the link)
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

  // Splice the entry out of the array if it exists inside the db
  // for (var i = 0; i < params.length; i++) {
  //   if (Repo.find({id: params[i].id})) {
  //     params.splice(i, 1);
  //     i--;
  //   }
  // }

  // var test = [];

  // for (var i = 0 ; i < params.length; i++) {
  //   var currentRepo = params[i];
  //   Repo.findAsync({id: params[i].id})
  //     .then(function(user) {
  //       // console.log('User', user);
  //       if (user.length === 0) {
  //         test.push(currentRepo);
  //         var repo = new Repo(currentRepo);
  //         repo.save(function (err) {
  //           if (err) console.log(err);
  //         });
  //         // console.log('TEST', test);
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     })
  // }

  // cb(test);

  // if (test.length > 0) {
  //   console.log('INSERT TEST ARRAY');
  //   Repo.insertMany(test, function(err, docs) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // console.log('Insert multiple elements/repos', docs);
  //       console.log('Insert multiple elements/repos');
  //     }
  //     cb(test);
  //   });
  // } else {
  //   Repo.insertMany(params, function(err, docs) {
  //     console.log('INSERT PARAMS ARRAY');
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // console.log('Insert multiple elements/repos', docs);
  //       console.log('Insert multiple elements/repos');
  //     }
  //     cb(test);
  //   });
  // }

  // Repo.findAsync({id: params.id})
  //   .then(function(user) {
  //     if (user.length === 0) {
  //       console.log('INSERTING')
  //       var repo = new Repo(params);
  //       repo.save();
  //     }
  //   })
  //   .then(() => {
  //     cb();
  //   })
}

let getAll = (cb) => {
  Repo.findAsync({}, null, {sort: {popularity: -1}, limit: 25})
    .then(function(data) {
      // data.sort({popularity: 1})
      cb(data);
    })
}

module.exports.save = save;
module.exports.getAll = getAll;

// module.exports = {
//   save: ,
//   getAll:
// }