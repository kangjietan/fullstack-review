import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Link</td>
        <td>Stars</td>
      </tr>
      {props.repos.map(repo => <Repo repo={repo}/>)}
    </table>
  </div>
)

export default RepoList;