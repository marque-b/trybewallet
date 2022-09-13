import { CURRENCIES, EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.value,
    };
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.value,
    };
  default:
    return state;
  }
};

export default walletReducer;
