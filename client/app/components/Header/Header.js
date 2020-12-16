import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../Login/Login";
import Modal from "react-modal";
import Logout from "../Logout/Logout";
import { connect } from "react-redux";

const MODAL_STYLES = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    width: "75%",
    height: "50%",
  },
};

Modal.setAppElement("#root");

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar>
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
                className="loginModal"
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.signIn.isLoggedIn,
});

export default connect(mapStateToProps)(Header);
