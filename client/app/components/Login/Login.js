import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions";
import { withAlert } from "react-alert";
import { compose } from "redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {}

  onChangeEmail(e) {
    this.setState({
      signInEmail: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      signInPassword: e.target.value,
    });
  }

  onSignIn(e) {
    e.preventDefault();
    const { signInEmail, signInPassword } = this.state;

    let user = {
      email: signInEmail,
      password: signInPassword,
    };
    this.props.signIn(user);
  }
  render() {
    const { signInEmail, signInPassword } = this.state;
    const { isLoading, signInError, alert } = this.props;

    if (isLoading) return "Loading...";
    else
      return (
        <div>
          <form>
            <input
              name="email"
              type="email"
              alt="email"
              placeholder="Email..."
              value={signInEmail}
              onChange={this.onChangeEmail}
            ></input>

            <input
              name="password"
              type="password"
              alt="password"
              placeholder="Password..."
              value={signInPassword}
              onChange={this.onChangePassword}
            ></input>
            <input
              type="submit"
              value="Login"
              onClick={(e) => {
                if (
                  signInEmail.length < 1 ||
                  signInPassword.length.length < 1
                ) {
                  alert.error("Email or Password is empty");
                } else if (signInEmail != "shabzy@gmail.com") {
                  alert.error("Wrong Email");
                }
                this.onSignIn(e);
              }}
            ></input>
            <p>{signInError === "Invalid Credentials" ? signInError : ""}</p>
          </form>
        </div>
      );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.signIn.token,
  isLoading: state.table.isLoading,
  signInError: state.signIn.signInError,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, { signIn })
)(Login);
