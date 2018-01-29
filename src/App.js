import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

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
          {/* <BurgerBuilder /> */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
          {/* <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
