import React from 'react';

// id: repo.id,
// name: repo.name,
// link: repo.owner.html_url,
// popularity: repo.stargazers_count

var Repo = (props) => {
  return (
    <tr>
      <td>{props.repo.id}</td>
      <td>{props.repo.name}</td>
      <td
        style={{color: 'blue'}}
        onClick={() => {window.location = props.repo.link}}>{props.repo.link}
      </td>
      <td>{props.repo.popularity}</td>
    </tr>
  );
}

export default Repo;