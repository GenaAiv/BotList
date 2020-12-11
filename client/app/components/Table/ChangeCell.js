import React, { Component } from "react";
import { connect } from "react-redux";

class ChangeCell extends Component {
  constructor(props) {
    super(props);
    this.state = { change: "" };
  }

  render() {
    const { index, item } = this.props;

    if (item.diff < 0)
      return (
        <img
          style={{ height: "50px", width: "40px" }}
          src={require("../../assets/green.png")}
        />
      );
    else if (item.diff > 0)
      return (
        <img
          style={{ height: "50px", width: "40px" }}
          src={require("../../assets/red.png")}
        />
      );
    else if (item.diff === null) return <div>{"N/A"}</div>;
    return <>N/A</>;

    //   if(item.diff < 0) this.setState({
    //     change: "RED"
    //   }) else if(item.diff > 0) this.setState({
    //     change: 'GREEN'
    //   })
    //   }</div>;
  }
}

const mapStateToProps = (state) => ({
  // diff: state.table.tableData.diff
});

export default connect(mapStateToProps)(ChangeCell);
