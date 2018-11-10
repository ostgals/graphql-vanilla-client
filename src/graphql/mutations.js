export const ADD_STAR = `
  mutation ($repositoryId: ID!) {
    toggleStar: addStar (input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = `
  mutation ($repositoryId: ID!) {
    toggleStar: removeStar (input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
