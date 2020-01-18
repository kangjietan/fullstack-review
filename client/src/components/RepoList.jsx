import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tbody>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>UserLink</td>
          <td>Stars</td>
        </tr>
        {props.repos.map(repo => <Repo repo={repo}/>)}
      </tbody>
    </table>
  </div>
)

export default RepoList;