import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGRIDIENT_PRICES = {
  salat: 0.5,
  cheeese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    // 1- We get the old ingredients count
    const oldCount = this.state.ingredients[type];
    // 2- We recalculate this count
    const updatedCount = oldCount + 1;
    // 3- We make a copy of the object
    const updatedIngredients = {
      ...this.state.ingredients
    }
    // 4- Updating the copy before calling setState
    updatedIngredients[type] = updatedCount;

    // 1- We get the price of the ingredient type
    const priceAddition = INGRIDIENT_PRICES[type];
    // 2- We get the old price from the state
    const oldPrice = this.state.totalPrice;
    // 3- We update the total price before calling setState
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice, 
      ingredients: updatedIngredients
    })
  }

  removeIngredientHandler = (type) => {

  }

  render() {
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingridientAdded={this.addIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;