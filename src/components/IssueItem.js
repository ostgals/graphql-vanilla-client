import React from 'react';

import ReactionList from './ReactionList';

const IssueItem = ({ node }) => (
  <div>
    <a href={node.url}>{node.title}</a>
    <ReactionList reactions={node.reactions} />
  </div>
);

export default IssueItem;
