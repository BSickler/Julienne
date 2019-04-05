import React, { Component } from "react";
import { compose } from "recompose";

import { withAuthorization } from "../Session";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page">
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(HomePage);
