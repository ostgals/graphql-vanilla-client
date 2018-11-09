import React from 'react';

import Repository from './Repository';

const Organization = ({ organization, errors, fetchMoreIssues }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>{' '}
        {errors.map(error => error.message).join('')}
      </p>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>{' '}
        <a href={organization.url}>{organization.name}</a>
      </p>

      <Repository
        repository={organization.repository}
        fetchMoreIssues={fetchMoreIssues}
      />
    </div>
  );
};

export default Organization;
