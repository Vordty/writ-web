import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";

import * as serviceWorker from "./serviceWorker";
import App from "./App";

import "./index.scss";

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: "http://localhost:4000/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			authorization: localStorage.getItem("AuthToken") || null
		}
	});

	return forward(operation);
});

const client = new ApolloClient({
	cache,
	link: concat(authMiddleware, link)
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();
