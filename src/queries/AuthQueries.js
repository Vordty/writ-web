import gql from "graphql-tag";

export const SIGNUP = gql`
	mutation Signup($email: String!, $username: String!, $password: String!, $rePassword: String!) {
		signup(signupInput: { email: $email, username: $username, password: $password, rePassword: $rePassword }) {
			success
			message
			user {
				id
				email
			}
		}
	}
`;

export const SIGNUP_TEST = gql`
	mutation SignupTest($email: String!, $username: String!, $password: String!, $rePassword: String!) {
		signupTest(
			signupInput: { email: $email, username: $username, password: $password, rePassword: $rePassword }
		) {
			success
			message
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			success
			message
			token
		}
	}
`;

export const GET_AUTHENTICATED_USER = gql`
	query {
		getAuthedUser {
			id
			username
			email
		}
	}
`;
