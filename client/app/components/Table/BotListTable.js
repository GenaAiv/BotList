import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTable } from "../../redux/actions";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import ChangeCell from "./ChangeCell.js";

class BotListTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSort: "down"
    };
  }

  componentDidMount() {
    this.props.fetchTable();
  }

  render() {
    const { currentSort } = this.state;
    const { isLoading, tableData } = this.props;

    const sortTypes = {
      up: {
        class: "sort-up",
        fn: (a, b) => a.points - b.points
      },
      down: {
        class: "sort-down",
        fn: (a, b) => b.points - a.points
      },
      default: {
        class: "sort",
        fn: (a, b) => a
      }
    };

    if (isLoading) return <p>Loading...</p>;
    else
      return (
        <>
          <Table
            striped
            bordered
            hover
            size="lg"
            style={{ margin: "auto", width: "90vw" }}
          >
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Points</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {tableData.sort(sortTypes[currentSort].fn).map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`data:image/jpg;base64,${item.image}`}
                      width="20px"
                      height="20px"
                      key={index}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.points}</td>
                  <td>
                    <ChangeCell item={item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
  }
}

BotListTable.propTypes = {
  getToken: PropTypes.func,
  fetchTable: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  tableData: state.table.tableData,
  isLoading: state.table.isLoading
});

export default connect(mapStateToProps, { fetchTable })(BotListTable);
