export const translateStatusToHuman = (status) => {
  if (status === -1) {
    return 'Player lost';
  } if (status === 1) {
    return 'Player won';
  }
  return 'Tie';
};
