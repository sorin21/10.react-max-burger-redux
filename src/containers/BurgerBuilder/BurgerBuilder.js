import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    // Make an array from ing. object to get the value
    const sum = Object.keys(ingredients).map((igKey) => {
      // Return ingredients and the value for a given key
      // console.log('ingredients[igKey]', ingredients[igKey]);
      return ingredients[igKey];
    })
    // Sum of all ingredients, reduce, with starting total zero
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    // Set the state if we add sum is true
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    // 1- We get the old ingredients count
    const oldCount = this.state.ingredients[type];
    // 2- We recalculate this count
    const updatedCount = oldCount + 1;
    // 3- We make a copy of the object to update it 
    // in an immutable way
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
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    // 1- We get the old ingredients count
    const oldCount = this.state.ingredients[type];
    // If we don't have any ingredient
    if(oldCount <= 0) {
      // Exit, nothing happend
      return;
    }
    // 2- We recalculate this count
    const updatedCount = oldCount - 1;
    // 3- We make a copy of the object to update it 
    // in an immutable way
    const updatedIngredients = {
      ...this.state.ingredients
    }
    // 4- Updating the copy before calling setState
    updatedIngredients[type] = updatedCount;

    // 1- We get the price of the ingredient type
    const priceDeduction = INGRIDIENT_PRICES[type];
    // 2- We get the old price from the state
    const oldPrice = this.state.totalPrice;
    // 3- We update the total price before calling setState
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.state({purchasing: true});
  }

  render() {
    // Copy the state in an immutable way
    const disableInfo = {
      ...this.state.ingredients
    }
    for(let key in disableInfo) {
      // Check disableInfo[key]: true or false, which is 
      // the state ingredients value
      disableInfo[key] = disableInfo[key] <=0;
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing}> 
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingridientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler} 
          disabled={disableInfo} 
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          order={this.purchaseHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;