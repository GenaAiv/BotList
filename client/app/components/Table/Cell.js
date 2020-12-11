import React, { Component } from "react";
import { updateTable } from "../../redux/actions";
import store from "../../redux/store";
import { connect } from "react-redux";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, change: "N/A" };
    this.textInput = React.createRef();
  }

  render() {
    const { value, type } = this.props;
    return this.state.editing ? (
      <input
        ref="input"
        placeholder={value}
        type={type}
        onBlur={(e) => this.onBlur(e)}
        ref={this.textInput}
        onKeyDown={(e) => this.onEnterKey(e)}
      />
    ) : (
      <div onClick={() => this.onFocus()}>{value}</div>
    );
  }

  onFocus() {
    this.setState({ editing: true }, () => {
      this.textInput.current.focus();
    });
  }

  onEnterKey(e) {
    if (e.keyCode === 13) {
      const { type, id } = this.props;
      this.setState({ editing: false, newVal: e.target.value });
      if (e.target.value.length > 0) {
        if (type === "number") {
          store.dispatch(updateTable("points", e.target.value, id));
        } else if (type === "text") {
          store.dispatch(updateTable("name", e.target.value, id));
        }
      }
    }
  }
  onBlur(e) {
    const { type, id } = this.props;
    this.setState({ editing: false, newVal: e.target.value });
    if (e.target.value.length > 0) {
      if (type === "number") {
        store.dispatch(updateTable("points", e.target.value, id));
      } else if (type === "text") {
        store.dispatch(updateTable("name", e.target.value, id));
      }
    }
  }
}

export default Cell;
