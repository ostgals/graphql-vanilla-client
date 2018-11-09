import React from 'react';

const Repository = ({ repository, fetchMoreIssues }) => {
  return (
    <div>
      <p>
        <strong>in Repository</strong>{' '}
        <a href={repository.url}>{repository.name}</a>
      </p>

      <ul>
        {repository.issues.edges.map(({ node }) => (
          <li key={node.id}>
            <a href={node.url}>{node.title}</a>

            <ul>
              {node.reactions.edges.map(({ node }) => (
                <li key={node.id}>{node.content}</li>
              ))}
            </ul>

            <hr />

            <button onClick={fetchMoreIssues}>More</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repository;
