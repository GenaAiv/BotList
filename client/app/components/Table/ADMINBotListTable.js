import React, { Component } from "react";
import Row from "./Row";
import { connect } from "react-redux";
import { fetchTable } from "../../redux/actions";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

class ADMINBotListTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSort: "down",
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
        fn: (a, b) => a.points - b.points,
      },
      down: {
        class: "sort-down",
        fn: (a, b) => b.points - a.points,
      },
      default: {
        class: "sort",
        fn: (a, b) => a,
      },
    };

    if (isLoading) return <p>Loading...</p>;
    else if (!this.props.token) return "";
    return (
      <div className="tableDiv">
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <Row data={tableData.sort(sortTypes[currentSort].fn)}></Row>
          </tbody>
        </Table>
      </div>
    );
  }
}

ADMINBotListTable.propTypes = {
  getToken: PropTypes.func,
  fetchTable: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  tableData: state.table.tableData,
  isLoading: state.table.isLoading,
  token: state.signIn,
});

export default connect(mapStateToProps, { fetchTable })(ADMINBotListTable);
