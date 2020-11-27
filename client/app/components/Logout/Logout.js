import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions";
import PropTypes from "prop-types";
import store from "../../redux/store";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    // this.props.signOut();
    // this.props.signOut();
    store.dispatch(signOut());

    // console.log("sodjhasd", props);
  }

  render() {
    return (
      <>
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}

Logout.propTypes = {
  signOut: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.signIn.isLoggedIn,
});

export default connect(mapStateToProps, { signOut })(Logout);
