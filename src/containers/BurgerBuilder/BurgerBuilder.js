import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-burger-project-5c90d.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({ingredients: response.data});
      })
      .catch((error) => {
        this.setState({ error: true });
      })
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
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // push() - switch the page and put it into the pages stack
    // encode ingredients in the search query to be used in URL
    const queryParams = [];
    // add elements to queryParams
    for(let i in this.state.ingredients) {
      // property name = value
      queryParams.push(
        encodeURIComponent(i) + 
        '=' +
        encodeURIComponent(this.state.ingredients[i])  
      );
    }

    const queryString =queryParams.join('&');

    queryParams.push('price=' + this.state.totalPrice);
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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

    let orderSummary = null;

    // let burger = <Spinner />
    let burger = this.state.error ? <p>Ingredients can't be loaded from server!</p> : <Spinner />;

    // Check the state ingredient to overwrote the burger
    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingridientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} />
        </Aux>
      );
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    // Show the spinner
    // Check the loading state to overwrite the orderSummary
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
   
    return <Aux>
        <Modal 
          show={this.state.purchasing} 
          modalClosed={this.purchaseCanceHandler}>
        {/* Or show orderSummary */}
        {orderSummary}
        </Modal>
        {burger}
      </Aux>;
  }
}

export default withErrorHandler(BurgerBuilder, axios);