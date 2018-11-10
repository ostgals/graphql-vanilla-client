import React from 'react';

import ReactionIcon from './ReactionIcon';

const ReactionList = ({ reactions }) => {
  const grouped = reactions.edges.reduce((groups, { node }) => {
    groups[node.content] = groups[node.content] + 1 || 1;
    return groups;
  }, {});

  return (
    <ul>
      {Object.keys(grouped).map(content => (
        <li key={content}>
          <ReactionIcon icon={content} /> <span>{grouped[content]}</span>
        </li>
      ))}
    </ul>
  );
};

export default ReactionList;
