import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
class ContactData extends Component {
  // fetch any data we need
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Dan',
        address: {
          street: 'Elm Street',
          zipCode: '34312',
          country: 'United States of America'
        },
        emal: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    // alert('You continue!');
    // Create in Firebase /orders
    // .json is only for Firebase to work correctly
    axios.post('/orders.json', order)
      .then((response) => {
        // console.log(response)
        // Stop loading no matter what
        this.setState({loading: false});
      })
      .catch((error) => {
        // console.log(error)
        // Even an error occur stop loading
        // Because the user think that is still loading
        this.setState({ loading: false});
      })
  }

  render() {
    return(
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        <form>
          <input type="text" className={classes.Input} name="name" placeholder="Your name"/>
          <input type="email" className={classes.Input} name="email" placeholder="Your email"/>
          <input type="text" className={classes.Input} name="street" placeholder="Street"/>
          <input type="text" className={classes.Input} name="postal" placeholder="Postal code"/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;