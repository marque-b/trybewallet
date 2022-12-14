export const USER_FORM = 'USER_FORM';

export const changeUserInfo = (value) => ({
  type: USER_FORM,
  value,
});

export const CURRENCIES = 'CURRENCIES';

export const updateCurrencies = (value) => ({
  type: CURRENCIES,
  value,
});

export const EXPENSE = 'EXPENSE';

export const expenseRecord = (value) => ({
  type: EXPENSE,
  value,
});

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpenseFromState = (value) => ({
  type: REMOVE_EXPENSE,
  value,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpenseFromState = (value) => ({
  type: EDIT_EXPENSE,
  value,
});

export const OVERRIDE_EXPENSE = 'OVERRIDE_EXPENSE';

export const overrideExpense = (value) => ({
  type: OVERRIDE_EXPENSE,
  value,
});
