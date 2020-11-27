import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";

import Main from "./components/Home/Main";
import "./styles/styles.scss";

render(
  <Router basename="/">
    <App>
      <Switch>
        <Route exact path="/" component={Main.render} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
