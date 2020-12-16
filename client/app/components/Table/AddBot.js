import React, { Component } from "react";
import store from "../../redux/store";
import { addBot } from "../../redux/actions";
import { withAlert } from "react-alert";

class AddBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botName: "",
      botLogo: "",
    };
    this.textInput = React.createRef();

    this.onChangeLogo = this.onChangeLogo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onChangeLogo(e) {
    this.setState({
      botLogo: e.target.files[0],
    });
  }
  onChangeName(e) {
    this.setState({
      botName: e.target.value,
    });
  }
  onSend() {
    // console.log(this.state.botLogo);
    const { botName, botLogo } = this.state;
    let fd = new FormData();
    fd.append("botLogo", botLogo);
    fd.append("botName", botName);
    if (!botName || !botLogo) return;
    store.dispatch(addBot(fd));
    this.setState({
      botName: "",
      botLogo: "",
    });
    this.textInput.current.value = "";
  }
  render() {
    return (
      <>
        <div className="addBot">
          <input
            ref={this.textInput}
            placeholder="Name of the Bot"
            type="text"
            name="botName"
            onChange={this.onChangeName}
          ></input>

          <label className="btn" htmlFor="files">
            Click Here to Add Logo
          </label>
          <input
            id="files"
            style={{ display: "none" }}
            type="file"
            name="botLogo"
            onChange={this.onChangeLogo}
          ></input>
          <h6>{this.state.botLogo.name}</h6>

          <button
            onClick={() => {
              if (/\.png|\.jpeg|\.jpg/gim.test(this.state.botLogo.name)) {
                this.onSend();
              } else {
                this.props.alert.error(
                  "Wrong Format! Only .jpeg, .jpg or .png"
                );
              }
            }}
          >
            Add Bot
          </button>
        </div>
      </>
    );
  }
}

export default withAlert()(AddBot);
