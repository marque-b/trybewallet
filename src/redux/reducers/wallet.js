import {
  CURRENCIES,
  EXPENSE, REMOVE_EXPENSE,
  EDIT_EXPENSE,
  OVERRIDE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  editMode: false,
};

const walletReducer = (state = INITIAL_STATE, { value, type }) => {
  // const { expenses } = state;

  switch (type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: value,
    };
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, value],
      editMode: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: value,
      editMode: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: value,
      editMode: true,
    };
  case OVERRIDE_EXPENSE:
    return {
      ...state,
      expenses: value,
      editMode: false,
      idToEdit: '',
    };
  default:
    return state;
  }
};

export default walletReducer;
