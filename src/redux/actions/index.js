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
