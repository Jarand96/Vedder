import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Settings from "./containers/Settings";
import NotFound from "./components/NotFound";

import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={requireAuthentication(Home)}/>
      <Route path="settings" component={requireAuthentication(Settings)} />
      <Route path="register" component={requireNoAuthentication(Register)} />
      <Route path="login" component={requireNoAuthentication(Login)} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// export
export { router };
