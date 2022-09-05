import { USER_FORM } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_FORM:
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
};

export default userReducer;
