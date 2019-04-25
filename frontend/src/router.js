import React from "react";
import { Router, Route, IndexRoute, Switch }  from "react-router-dom";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Settings from "./containers/Settings";
import ProfilePage from "./components/ProfilePage";
import Navigation from "./components/Navigation";
import AdvancedPost from "./components/AdvancedPost";
import NotFound from "./components/NotFound";

import { requireAuthentication }  from './components/AuthenticatedComponent';
import { requireNoAuthentication }  from './components/notAuthenticatedComponent';
console.log(AdvancedPost)
// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Navigation />
    <Switch>
      <Route exact path="/" component={requireAuthentication(Home)}/>
      <Route path="/register" component={requireNoAuthentication(Register)} />
      <Route path="/advancedpost" component={requireNoAuthentication(AdvancedPost)} />
      <Route path="/login" component={requireNoAuthentication(Login)} />
      <Route path="/settings" component={requireAuthentication(Settings)} />
      <Route path="/profile/:id" component={requireAuthentication(ProfilePage)} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);

// export
export { router };
