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

export const WALLET_TOTAL = 'WALLET_TOTAL';

export const walletTotal = (value) => ({
  type: WALLET_TOTAL,
  value,
});

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpenseFromState = (value) => ({
  type: REMOVE_EXPENSE,
  value,
});
