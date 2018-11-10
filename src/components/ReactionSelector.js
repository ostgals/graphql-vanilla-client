import React from 'react';

import ReactionIcon, { icons } from './ReactionIcon';

const ReactionSelector = ({ onSelect }) => (
  <>
    {Object.keys(icons).map(icon => (
      <ReactionIcon
        key={icon}
        icon={icon}
        onClick={() => onSelect(icon)}
        style={{ cursor: 'pointer' }}
      />
    ))}
  </>
);

export default ReactionSelector;
