export default (state = [], action) => {
  switch (action.type) {
    case "INITALIZE_FAVORITE":
      return [...action.favoriteVideos];
    default:
      return state;
  }
};
