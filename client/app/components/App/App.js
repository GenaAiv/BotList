import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Home/Main";
import Footer from "../Footer/Footer";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};
class App extends Component {
  render() {
    return (
      <>
        <AlertProvider template={AlertTemplate} {...options}>
          <Provider store={store}>
            <Header />
            <main>
              <Main />
            </main>
            <Footer />
          </Provider>
        </AlertProvider>
      </>
    );
  }
}

export default App;
