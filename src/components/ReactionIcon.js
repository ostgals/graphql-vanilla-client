import React from 'react';

const icons = {
  THUMBS_UP: '👍',
  HOORAY: '🙌',
  LAUGH: '😆',
  HEART: '💛',
};

const ReactionIcon = ({ icon }) => <span>{icons[icon] || icon}</span>;

export default ReactionIcon;
