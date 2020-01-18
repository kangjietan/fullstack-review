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
  }

  // ComponentDidMount for GET requests to display top 25
  // Ajax GET
  componentDidMount() {
    axios.get('http://localhost:1128/repos')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  testFun (data) {
    this.setState({
      repos: data
    })
  }

  // Ajax POST request to localhost/repos
  search (term) {
    console.log(`${term} was searched`);
    var postData;
    var testFun = this.testFun;
    axios.post('http://localhost:1128/repos', {term})
      .then(function(response) {
        // console.log(Array.isArray(response.data));
        // console.log(Array.isArray(response));
        postData = response.data;
        testFun(postData);
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