import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: []
    }

    this.testFun = this.testFun.bind(this);
    this.getAllRepos = this.getAllRepos.bind(this);
  }

  // ComponentDidMount for GET requests to display top 25
  // On initial page load, make a GET request to server which
  // will grab repos ordered by popularity and limited to 25
  componentDidMount() {
    console.log('App loaded');
    this.getAllRepos();
  }

  // Set state of current repos
  testFun (data) {
    this.setState({
      repos: data
    });
  }


  // Make a GET request to server which will grab repos
  // ordered by popularity and limited to 25 only
  getAllRepos () {
    // Need reference to this function inside then
    var testFun = this.testFun;
    axios.get('http://localhost:1128/repos')
      .then(function(response) {
        console.log(response);
        testFun(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // POST request will be sent to server
  // when user searches for a user
  search (term) {
    console.log(`${term} was searched`);
    var getAllRepos = this.getAllRepos;
    axios.post('http://localhost:1128/repos', {term})
      .then(function(response) {
        // console.log(Array.isArray(response.data));
        // console.log(Array.isArray(response));
        getAllRepos();
        console.log('POST request finished!')
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));