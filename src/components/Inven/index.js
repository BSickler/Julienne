import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { Switch, Route, Link } from "react-router-dom";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

import Toolbar from "../Toolbar";
import CardDeck from "../CardDeck";
import DataTree from "../Tree";

import "./index.css";

const INITIAL_STATE = {
  inventories: false,
  loading: false,
  display: null
};

class InvenPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.inventories().on("value", snapshot => {
      const inventoriesObject = snapshot.val();

      this.setState({
        inventories: inventoriesObject,
        loading: false,
        display: ROUTES.INVEN_CARDS
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.inventories().off();
  }

  toggleDisplay(e) {
    const display =
      this.state.display === ROUTES.INVEN_CARDS
        ? ROUTES.INVEN_TREE
        : ROUTES.INVEN_CARDS;

    this.props.history.push(display);
    this.setState({ display: display });
  }

  render() {
    const { inventories, display } = this.state;

    return (
      <div id="inventoryPage" className="page">
        <Toolbar>
          <button onClick={e => this.toggleDisplay()}>Toggle</button>
          <button onClick={this.props.history.goBack}>Back</button>
        </Toolbar>

        <Switch>
          <Route
            path={ROUTES.INVEN_TREE}
            render={() => <DataTree data={inventories} />}
          />

          <Route path={ROUTES.INVEN_CARDS} component={CardDeck} />

          <Route
            exact
            path={ROUTES.INVEN}
            render={() => (
              <InventoryList inventories={inventories} display={display} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const InventoryList = ({ inventories, display }) => {
  return (
    <div className="inventoryList">
      <h3>Select an inventory</h3>
      {Object.keys(inventories).map(inventory => {
        return (
          <Link
            key={inventory}
            to={{
              pathname: display,
              state: {
                inventory: inventories[inventory],
                active: inventories[inventory],
                activeLbl: inventory,
                meta: inventories[inventory].meta,
                position: 1
              }
            }}
          >
            {inventory}
          </Link>
        );
      })}
    </div>
  );
};

const condition = authUser =>
  authUser &&
  (authUser.roles.includes(ROLES.ADMIN) ||
    authUser.roles.includes(ROLES.USER) ||
    authUser.roles.includes(ROLES.GUEST));

export default withAuthorization(condition)(InvenPage);
