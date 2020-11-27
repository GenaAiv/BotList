import React, { Component } from "react";
import BotListTable from "../Table/BotListTable";
import ADMINBotListTable from "../Table/ADMINBotListTable";
import AddBot from "../Table/AddBot";
import { connect } from "react-redux";
import { getToken } from "../../redux/actions";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getToken();
  }

  render() {
    const { isLoggedIn, isLoading } = this.props;
    if (isLoading) return <p>Loading...</p>;
    else {
      return (
        <>
          {isLoggedIn ? (
            <div>
              <AddBot />
              <ADMINBotListTable />
            </div>
          ) : (
            <BotListTable />
          )}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  token: state.signIn.token,
  isLoggedIn: state.signIn.isLoggedIn,
});

export default connect(mapStateToProps, { getToken })(Main);
