import React from 'react';

import IssueList from './components/IssueList';

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

      <IssueList issues={repository.issues} />

      <hr />

      {repository.issues.pageInfo.hasNextPage && (
        <button onClick={fetchMoreIssues}>More</button>
      )}
    </div>
  );
};

export default Repository;
