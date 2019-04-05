import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

const InventoryPortal = props => (
  <Switch>
    <Route path={ROUTES.ADMIN_INVEN_DETAILS} component={InventoryItem} />
    <Route path={ROUTES.ADMIN_INVEN} component={InventoryList} />
  </Switch>
);

class InventoryListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inventories: null,
      ...props.location.state
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.inventories().on("value", snapshot => {
      const inventoriesObject = snapshot.val();

      const inventoriesList = Object.keys(inventoriesObject).map(key => ({
        ...inventoriesObject[key],
        name: key
      }));

      this.setState({
        inventories: inventoriesList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.inventories().off();
  }

  render() {
    const { inventories, loading } = this.state;

    return (
      <div>
        <h2>Inventories</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {inventories &&
            inventories.map(inventory => (
              <li key={inventory.name}>
                <span>
                  <strong>Inventory:</strong> {inventory.name}
                </span>
                <span>
                  <strong>Total Objects:</strong> {inventory.meta.totObjs}
                </span>
                <span>
                  <strong>Depth:</strong> {inventory.meta.depth}
                </span>
                <span>
                  <strong>
                    {inventory.meta.chkout
                      ? "Checkout Enabled"
                      : "Checkout Disabled"}
                  </strong>
                </span>
                <span>
                  <strong>
                    {inventory.meta.edit
                      ? "Object Editing Enabled"
                      : "Object Editing Disabled"}
                  </strong>
                </span>
                <span>
                  <Link
                    to={{
                      pathname: `${ROUTES.ADMIN}/inven/${inventory.name}`,
                      state: { inventory }
                    }}
                  >
                    Details
                  </Link>
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

class InventoryItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inventory: null,
      ...props.location.state
    };
  }

  componentDidMount() {
    if (this.state.inventory) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .inventory(this.props.match.params.name)
      .on("value", snapshot => {
        this.setState({
          inventory: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.inventory(this.props.match.params.name).off();
  }

  render() {
    const { inventory, loading } = this.state;

    return (
      <div>
        <h2>Inventory: ({inventory.name})</h2>
        {loading && <div>Loading ...</div>}

        {inventory && (
          <div>
            <span>
              <strong>Inventory:</strong> {inventory.name}
            </span>
            <span>
              <strong>Total Objects:</strong> {inventory.meta.totObjs}
            </span>
            <span>
              <strong>Depth:</strong> {inventory.meta.depth}
            </span>
            <span>
              <strong>
                {inventory.meta.chkout
                  ? "Checkout Enabled"
                  : "Checkout Disabled"}
              </strong>
            </span>
            <span>
              <strong>
                {inventory.meta.edit
                  ? "User Object Edit Enabled"
                  : "User Object Edit Disabled"}
              </strong>
            </span>
            <span>
              <Link to={ROUTES.ADMIN_INVEN}>Back</Link>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const InventoryList = withFirebase(InventoryListBase);
const InventoryItem = withFirebase(InventoryItemBase);

export default InventoryPortal;
