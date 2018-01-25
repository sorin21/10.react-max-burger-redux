import React, { Component } from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  state = {
    show: true
  };

  // Unset show after a while
  componentDidMount() {
    setTimeout(() => {
      this.setState({show: false});
    }, 5000);
  }
  render() {
    return (
      <div>
        <Layout>
          {/* BurgerBuilder is added to the screen only if show is true */}
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
