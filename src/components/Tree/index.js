import React, { Component } from "react";
import { Tree } from "primereact/tree";

class DataTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: false
    };
  }

  componentDidMount() {
    let data = false;
    this.setState({ loading: true });

    // Convert data from firebase's data object to array of objects
    // accepted by primereact component
    if (this.props.data) {
      data = this.makeData(this.props.data, null);
    }

    this.setState({
      loading: false,
      data: data
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.data && this.props.data) {
      let data = this.makeData(this.props.data);
      this.setState({ data: data });
    }
  }

  makeData(dataset, branchInt) {
    let branch = [];

    // Creates entries for each key in the dataset other than meta
    Object.keys(dataset).map(key => {
      if (key !== "meta") {
        return branch.push(this.makeEntry(key, branch, branchInt));
      } else {
        return null;
      }
    });

    // Checks if children exist for the next layer down and then recursively
    // calls makeData()
    Object.keys(branch).map(index => {
      let entry = branch[index];
      let fireDatum = dataset[entry.label];

      /**
       * The childFlag variable is default false and triggers if a child
       * entry should be made for the branch. The function iterates
       * through the firebase data until it locates an object as a child.
       * The flag is then flipped and a children entry will be made for the
       * data tree branch.
       */
      if (fireDatum && typeof fireDatum === "object") {
        let childFlag = false;

        Object.keys(fireDatum).map(child => {
          return typeof fireDatum[child] === "object"
            ? (childFlag = true)
            : null;
        });

        return childFlag
          ? (entry.children = this.makeData(dataset[entry.label], entry.key))
          : null;
      }

      return null;
    });

    return branch;
  }

  makeEntry(key, parent, branchInt) {
    let entry = {};

    entry["key"] =
      branchInt !== null ? `${branchInt}-${parent.length}` : parent.length;
    entry["label"] = key;
    entry["icon"] = "pi pi-folder";

    return entry;
  }

  render() {
    const { data } = this.state;

    return <Tree value={data} selectionMode="multiple" />;
  }
}

export default DataTree;
