import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const VALID_EMAIL = 'email@trybe.com';
const MOCK_TOTAL = 1520.013;

const mockState = {
  user: {
    email: VALID_EMAIL,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '100',
        description: 'Mc Donalds',
        currency: 'ARS',
        method: 'Cartão de crédito',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '250',
        description: 'Visita a London Eye',
        currency: 'GBP',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '300',
        description: 'Visita ao Mario',
        currency: 'JPY',
        method: 'Cartão de crédito',
        tag: 'Transporte',
        exchangeRates: mockData,
      },
    ],
    total: MOCK_TOTAL,
  },
};

describe('Testes da página de carteira', () => {
  it('O email de login é renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);

    const loggedEmail = screen.getByTestId('email-field');
    expect(loggedEmail).toBe(VALID_EMAIL);
  });

  it('Os inputs são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const valueInput = screen.getByRole('input', { name: 'value' });
    const descriptionInput = screen.getByRole('input', { name: 'description' });
    const currencyInput = screen.getByRole('select', { name: 'currency' });
    const methodInput = screen.getByRole('select', { name: 'method' });
    const tagInput = screen.getByRole('select', { name: 'tag' });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('O total da carteira é exibido corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: mockState });
    history.push('/carteira');

    const totalSum = screen.getByTestId('total-field');
    expect(totalSum).toBe(MOCK_TOTAL);
  });

  it('A despesa é apagada corretamente ao clicar no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState: mockState });
    history.push('/carteira');

    const deleteBtn = screen.getByTestId('edit-btn');
    console.log(deleteBtn);
  });
});
