import { CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.value,
    };
  default:
    return state;
  }
};

export default walletReducer;
