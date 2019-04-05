import React, { Component } from "react";
import Card from "./card";

import * as ROUTES from "../../constants/routes";

import "./index.css";

class CardDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: false,
      meta: false,
      active: null,
      position: 0
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      const {
        inventory,
        activeLbl,
        position,
        meta
      } = this.props.location.state;
      if (meta.depth !== position) {
        let initState = {
          inventory: inventory,
          activeLbl: activeLbl,
          meta: inventory.meta,
          active: inventory,
          position: position
        };

        this.setState({ ...initState });

        this.props.history.replace({
          pathname: `${ROUTES.INVEN_CARDS}/${activeLbl}`,
          state: initState
        });
      } else {
        this.props.history.replace({ pathname: ROUTES.INVEN });
      }
    } else {
      this.props.history.replace({ pathname: ROUTES.INVEN });
    }
  }

  handleCardClick(label, contents) {
    const { meta, position } = this.props.location.state;
    if (meta.depth > position) {
      this.pushHistory(label, contents);
    } else {
      console.log("End of tree.");
    }
  }

  pushHistory(label, contents, direction = 1) {
    let newLocation = {
      state: {
        ...this.state,
        position: this.props.location.state.position + direction,
        active: contents,
        activeLbl: label
      },
      pathname: `${this.props.location.pathname}/${label}`
    };

    this.props.history.push(newLocation);
  }

  render() {
    if (this.props.location.state) {
      const { activeLbl, active } = this.props.location.state;

      return (
        <div id="cardDeck">
          <h3>{activeLbl}</h3>
          {Object.keys(active).map(key => {
            if (key !== "meta") {
              return (
                <Card
                  key={key}
                  contents={{ [`${key}`]: active[key] }}
                  handleClick={this.handleCardClick}
                />
              );
            }
            return null;
          })}
        </div>
      );
    } else {
      return <h3>Loading . . .</h3>;
    }
  }
}

export default CardDeck;
