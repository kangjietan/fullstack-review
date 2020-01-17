const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let callback = function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      // console.log('Here is the response!: ', body);
      var obj = JSON.parse(body);
      // console.log(obj);
      var repoID = [];
      obj.forEach(ele => {
        repoID.push(ele.id);
      });

      cb(repoID);

      // console.log(repoID);
      // var test = Object.keys(body);
      // console.log(test);
    }
  }

  request(options, callback);
}

// getReposByUsername('octocat');

module.exports.getReposByUsername = getReposByUsername;