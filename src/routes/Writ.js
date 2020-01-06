import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
	query {
		user(id: 1) {
			id
			firstName
			email
		}
	}
`;

export const Writ = () => {
	const { data, loading, error } = useQuery(GET_USERS);
	if (loading) return <div>Loading</div>;
	if (error) return <div>Error</div>;

	return <div>Hello {data.user.firstName}</div>;
};

export default Writ;
