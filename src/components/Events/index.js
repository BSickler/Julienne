import { Component } from "react";
import { Growl } from "primereact/growl";

class Events extends Component() {
  constructor(props) {
    super(props);

    this.displayMsg = this.displayMsg.bind(this);
  }

  render() {
    return <Growl ref={el => (this.growl = el)} />;
  }
}
