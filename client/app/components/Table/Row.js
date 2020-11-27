import React, { Component } from "react";
import Cell from "./Cell";
import DeleteBot from "./DeleteBot";
import ChangeCell from "./ChangeCell.js";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //on cell update, it will send the current index as "prevIndex" to the database.
  // on render of new table it will compare prevIndex with index
  render() {
    const { data } = this.props;

    return [...data].map((item, index) => (
      <tr key={item._id}>
        <td>
          <img
            src={`data:image/jpg;base64,${item.image}`}
            width="20px"
            height="20px"
          />
        </td>
        <td>
          <Cell
            type="text"
            value={item.name}
            id={item._id}
            index={index}
          ></Cell>
        </td>
        <td>
          <Cell type="number" value={item.points} id={item._id} index={index} />
        </td>
        <td className="changeTD">
          <ChangeCell item={item} />
        </td>
        <DeleteBot item={item} />
      </tr>
    ));
  }
}

export default Row;
