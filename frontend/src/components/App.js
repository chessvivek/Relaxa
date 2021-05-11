import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import {Routes} from "../../src/constants/constants"
import page2 from "./page2";
import Graph from "./Graph";
class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path={Routes.register} component={Registration} />
						<Route exact path={Routes.login} component={Login} />
						<Route exact path={Routes.analysis} component={Graph} />
						<Route path={"/page2"} component={page2} />
						<Redirect from={Routes.base} to={Routes.login} />
					</Switch>
				</div>
			</Router>
		);
	}
}
export default App;
