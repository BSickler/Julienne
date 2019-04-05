import React from "react";
import { Link } from "react-router-dom";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import "./index.css";

const Navigation = () => (
  <div id="Navigation">
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <Link to={ROUTES.LANDING}>Landing</Link>

    <Link to={ROUTES.HOME}>Home</Link>

    <Link to={ROUTES.INVEN}>Inventory</Link>

    <Link to={ROUTES.ACCOUNT}>Account</Link>

    {authUser.roles.includes(ROLES.ADMIN) && (
      <Link to={ROUTES.ADMIN}>Admin</Link>
    )}

    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Link to={ROUTES.LANDING}>Landing</Link>

    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </div>
);

export default Navigation;
