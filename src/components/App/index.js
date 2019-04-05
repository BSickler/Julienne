import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Growl } from "primereact/growl";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import InvenPage from "../Inven";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import "./index.css";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.displayMsg = this.displayMsg.bind(this);
  }

  displayMsg() {
    this.growl.show({
      severity: "warn",
      summary: "Info Message",
      detail: "You clicked me!"
    });
  }

  render() {
    return (
      <Router>
        <div id="app">
          <Growl ref={el => (this.growl = el)} />
          <Navigation />

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.INVEN} component={InvenPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />

          {/**<button onClick={this.displayMsg}>Click</button>*/}
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
