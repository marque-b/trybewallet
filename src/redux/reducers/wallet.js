import { CURRENCIES, EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  editMode: false,
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
      editMode: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.value,
      editMode: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.value,
      editMode: true,
    };
  default:
    return state;
  }
};

export default walletReducer;
