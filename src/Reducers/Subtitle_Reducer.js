export default (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_SUBTITLE":
      return !state;
    default:
      return state;
  }
};
