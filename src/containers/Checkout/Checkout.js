import React, { Component } from 'react';
import {Route} from "react-router-dom";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  // before we render the child component
  // we have access to the props
  componentWillMount() {
    // console.log("this.props", this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      // ['salad', '2']
      // param[0] is 1st item in query.entries() key, value pairs
      console.log(param)
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    // set the ingredients with the ones created and extracted here
    this.setState({ingredients: ingredients, totalPrice: price});
  }

  checkoutCancelledHandler = () => {
    // on cancel go back to last page
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    // replace actual path with: 
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        {/* render JSX so we can pass props from this file */}
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
      </div>
    );
  }
}

export default Checkout;