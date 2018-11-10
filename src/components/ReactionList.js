import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import ReactionIcon from './ReactionIcon';
import ReactionSelector from './ReactionSelector';

const StyledReactionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  li {
    margin-right: 1em;
    align-content: center;
    line-height: 1.5;
  }
`;

const ReactionList = ({ reactions }) => {
  const [showSelector, setShowSelector] = useState(false);

  const counts = reactions.edges.reduce((groups, { node }) => {
    groups[node.content] = groups[node.content] + 1 || 1;
    return groups;
  }, {});

  const addReaction = content => {
    console.log(content);
    setShowSelector(false);
  };

  return (
    <>
      <StyledReactionList>
        {Object.keys(counts).map(content => (
          <li key={content}>
            <ReactionIcon icon={content} /> <span>{counts[content]}</span>
          </li>
        ))}
        <li
          onMouseEnter={() => setShowSelector(true)}
          onMouseLeave={() => setShowSelector(false)}
        >
          + {showSelector && <ReactionSelector onSelect={addReaction} />}
        </li>
      </StyledReactionList>
    </>
  );
};

export default ReactionList;
