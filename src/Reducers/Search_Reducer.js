export default (state = { searchText: "", content: [] }, action) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.searchText
      };
    case "SET_SEARCH_CONTENT":
      return {
        ...state,
        content: action.content
      };
    default:
      return {
        ...state
      };
  }
};
