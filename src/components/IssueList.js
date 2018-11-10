import React from 'react';

import IssueItem from './IssueItem';

const IssueList = ({ issues }) => (
  <ul>
    {issues.edges.map(({ node }) => (
      <li key={node.id}>
        <IssueItem node={node} />
      </li>
    ))}
  </ul>
);

export default IssueList;
