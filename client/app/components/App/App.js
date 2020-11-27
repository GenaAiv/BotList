import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Home/Main";
import Footer from "../Footer/Footer";
import store from "../../redux/store";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Header />
          <main>
            <Main />
          </main>
          <Footer />
        </Provider>
      </>
    );
  }
}

export default App;
