import * as actionTypes from './actions';

const initialState = {
  ingridients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  },
  totalPrice: 4,
};

const INGREDIENTS_PRICE = {
  salad: 0.5,
  meat: 1.5,
  bacon: 1.7,
  cheese: 1,
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionTypes.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.value]: state.ingridients[action.value] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.value]
      };
    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.value]: state.ingridients[action.value] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.value]
      };
    default:
      return state;
  }
};

export default reducer;
