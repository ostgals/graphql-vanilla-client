import React from 'react';

const Repository = ({ repository, fetchMoreIssues, toggleStar }) => {
  return (
    <div>
      <p>
        <strong>in Repository</strong>{' '}
        <a href={repository.url}>{repository.name}</a>
      </p>

      <button type="button" onClick={() => toggleStar(repository)}>
        {repository.stargazers.totalCount}{' '}
        {repository.viewerHasStarred ? 'Unstar' : 'Star'}
      </button>

      <ul>
        {repository.issues.edges.map(({ node }) => (
          <li key={node.id}>
            <a href={node.url}>{node.title}</a>

            <ul>
              {node.reactions.edges.map(({ node }) => (
                <li key={node.id}>{node.content}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <hr />

      {repository.issues.pageInfo.hasNextPage && (
        <button onClick={fetchMoreIssues}>More</button>
      )}
    </div>
  );
};

export default Repository;
