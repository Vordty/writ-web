const LOCALSTORAGE_AUTH_KEY = "AuthToken";

export const AuthToken = {
	GET() {
		return localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
	},
	SET(token) {
		return localStorage.setItem(LOCALSTORAGE_AUTH_KEY, token);
	},
	REMOVE() {
		return localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
	}
};
