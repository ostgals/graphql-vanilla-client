import React from 'react';

export const icons = {
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
  LAUGH: '😄',
  HOORAY: '🎉',
  CONFUSED: '😕',
  HEART: '❤️',
};

const ReactionIcon = ({ icon, ...props }) => (
  <span className="reaction-icon" {...props}>
    {icons[icon] || icon}
  </span>
);

export default ReactionIcon;
