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

  }

  // ComponentDidMount for GET requests to display top 25
  // Ajax GET

  // Ajax POST request to localhost/repos
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // $.post("http://localhost:1128/repos", {term})
    //   .done(function(data) {
    //     console.log('Success', data);
    //   });
    axios.post('http://localhost:1128/repos', {term})
      .then(function(response) {
        console.log(response);
        // console.log(Array.isArray(response));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));