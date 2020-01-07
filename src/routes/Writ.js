import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
	query {
		user(id: 1) {
			id
			firstName
			email
		}
	}
`;

export const Writ = () => {
	const { data, loading, error } = useQuery(GET_USER);
	if (loading) return <div>Loading</div>;
	if (error) return <div>Error</div>;

	return <div>Hello {data.user.firstName}</div>;
};

export default Writ;
