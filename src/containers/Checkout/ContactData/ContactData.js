import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from "../../../components/Input/Input";

class ContactData extends Component {
  // fetch any data we need
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    // formElementIdentifier is name, email...
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    // alert('You continue!');
    // Create in Firebase /orders
    // .json is only for Firebase to work correctly
    axios
      .post("/orders.json", order)
      .then(response => {
        // console.log(response)
        // Stop loading no matter what
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error)
        // Even an error occur stop loading
        // Because the user think that is still loading
        this.setState({ loading: false });
      });
  };

  // react pass automatically an event  when this function
  // is attached to an event listener
  // inputIdentifier is name, street
  inputChangedHandler = (event, inputIdentifier) => {
    // copy the state object
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // copy deeply
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  };

  render() {
    // make an array
    const formElementsArray = Object.keys(this.state.orderForm).map(key => ({
      id: key,
      config: this.state.orderForm[key]
    }));
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;