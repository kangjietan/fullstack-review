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
      // Grab id, name, owner.html_url, stargazers_count
      var obj = JSON.parse(body);
      // console.log(obj);

      // Push data as objs in array for db to insertMany [{}, {}, {}, ...]
      var repos = [];
      if (obj.length > 0) {
        obj.forEach(repo => {
          repos.push({
            id: repo.id,
            name: repo.name,
            link: repo.owner.html_url,
            popularity: repo.stargazers_count
          });
        });
      }

      cb(repos);
    }
  }

  request(options, callback);
}

// test function
// getReposByUsername('octocat');

module.exports.getReposByUsername = getReposByUsername;