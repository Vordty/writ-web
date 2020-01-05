import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import Writ from "./Writ";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					{/* check if authenticated and decide route */}
					<Route path="/auth">
						<Auth />
					</Route>
					<Route path="/app">
						<Writ />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
