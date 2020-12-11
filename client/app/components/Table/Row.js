import React, { Component } from "react";
import Cell from "./Cell";
import DeleteBot from "./DeleteBot";
import ChangeCell from "./ChangeCell.js";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return [...data].map((item, index) => (
      <tr key={item._id}>
        <td className="tableImg">
          <img src={`data:image/jpg;base64,${item.image}`} />
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
          {/* <ChangeCell item={item} index={index} /> */}
        </td>
        <td className="changeTD">
          <ChangeCell item={item} index={index} />
        </td>
        <DeleteBot item={item} />
      </tr>
    ));
  }
}

export default Row;
