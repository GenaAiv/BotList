import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../Login/Login";
import Modal from "react-modal";
import Logout from "../Logout/Logout";
import { connect } from "react-redux";
import background from "../../../public/assets/img/bg.png";

const MODAL_STYLES = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  content: {
    backgroundImage:
      "url(http://upload.wikimedia.org/wikipedia/commons/d/dd/Muybridge_race_horse_animated.gif)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    width: "350px",
    height: "450px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar className="justify-content-center">
        <Nav activeKey={window.location.pathname}>
          <Nav.Item>
            <Nav.Link href="/">ShabzBebeList</Nav.Link>
          </Nav.Item>
          {props.isLoggedIn ? (
            <Nav.Item>
              <Logout />
            </Nav.Item>
          ) : (
            <Nav.Item>
              <button onClick={() => setIsOpen(true)}>Login</button>
              <Modal
                style={MODAL_STYLES}
                isOpen={isOpen}
                onRequestClose={() => {
                  setIsOpen(false);
                }}
              >
                <Login />
              </Modal>
            </Nav.Item>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.signIn.isLoggedIn
});

export default connect(mapStateToProps)(Header);
