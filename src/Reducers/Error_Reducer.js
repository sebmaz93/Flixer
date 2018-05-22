export default (state = { login: false }, action) => {
	switch (action.type) {
		case "SHOW_LOGIN_ERROR":
			return { ...state, login: true };
		case "HIDE_LOGIN_ERROR":
			return { ...state, login: false };
		default:
			return state;
	}
};
