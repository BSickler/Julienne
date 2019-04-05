import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { compose } from "recompose";

import UserPortal from "./userPortal";
import InventoryPortal from "./inventoryPortal";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const AdminPage = () => (
  <div>
    <AdminNav />

    <h1>Admin</h1>

    <Switch>
      <Route path={ROUTES.ADMIN_USER} component={UserPortal} />
      <Route
        path={ROUTES.ADMIN_USERS}
        render={() => <Redirect to={ROUTES.ADMIN_USER} />}
      />
      <Route path={ROUTES.ADMIN_INVEN} component={InventoryPortal} />
      <Route exact path={ROUTES.ADMIN} component={AdminPortal} />
    </Switch>
  </div>
);

const AdminNav = () => (
  <ul className="nav">
    <li>
      <Link to={ROUTES.ADMIN_USER}>User Portal</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN_INVEN}>Inventory Portal</Link>
    </li>
  </ul>
);

const AdminPortal = () => (
  <div>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <h2>Select a portal to manage resources</h2>
  </div>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition))(AdminPage);
