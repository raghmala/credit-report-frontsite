

import React, { Component } from "react";
import { Router, Route, Switch } from 'react-router-dom';
import ManageOrders from "./pages/ManageOrders";
import CreateNew from "./pages/CreateNew";
import App from './App';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/manageOrders" component={ManageOrders} />
                    <Route path="/createNew" component={CreateNew} />
                </Switch>
            </Router>
        )
    }
}
