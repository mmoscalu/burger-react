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

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionTypes.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.value]: state.ingridients[action.value] + 1,
        },
      };
    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.value]: state.ingridients[action.value] - 1,
        },
      };
    default:
      return state;
  }
};

export default reducer;
