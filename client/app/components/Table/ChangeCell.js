import React, { Component } from "react";
import { connect } from "react-redux";

class ChangeCell extends Component {
  constructor(props) {
    super(props);
    this.state = { change: "" };
  }

  render() {
    const { index, item } = this.props;
    console.log(item.diff);
    if (item.diff < 0) return <div>"GREEN"</div>;
    else if (item.diff > 0) return <div>{"RED"}</div>;
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

const mapStateToProps = state => ({
  // diff: state.table.tableData.diff
});

export default connect(mapStateToProps)(ChangeCell);
