import React, { Component } from "react";
import store from "../../redux/store";
import { deleteBot } from "../../redux/actions";

class DeleteBot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClickDelete(item) {
    store.dispatch(deleteBot(item._id));
  }
  render() {
    const { item } = this.props;

    return (
      <td className="deleteTD">
        <button onClick={() => this.onClickDelete(item)}>Delete</button>
      </td>
    );
  }
}

export default DeleteBot;
