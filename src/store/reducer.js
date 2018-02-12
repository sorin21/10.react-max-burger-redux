import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state, 
        ingredients: {
          // deep clone
          ...state.ingredients,
          // es6 syndatx
          // ingredientName we get as paylod from action
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        } 
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // deep clone
          ...state.ingredients,
          // es6 syndatx
          // ingredientName we get as paylod from action
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        } 
      }
  
    default:
      return state;
  }
};

export default reducer;