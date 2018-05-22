export default (state = { token: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token
      };
    case "LOGOUT":
      return {
        token: null
      };
    default:
      return state;
  }
};
