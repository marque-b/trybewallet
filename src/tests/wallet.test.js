import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const VALID_EMAIL = 'email@trybe.com';
const MOCK_TOTAL = 1519.49;

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
  it('Utiliza a rota correta', () => {
    const { history:
      { location: { pathname } },
    } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(pathname).toEqual('/carteira');
  });

  it('Os inputs são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('O total da carteira é exibido corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialState: mockState, initialEntries: ['/carteira'] });
    const totalSum = screen.getByTestId('total-field');
    expect(Number(totalSum.innerHTML)).toBe(MOCK_TOTAL);
  });

  it('Uma despesa pode ser deletada corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialState: mockState, initialEntries: ['/carteira'] });

    const deleteBtn = screen.getAllByTestId('delete-btn');
    expect(deleteBtn).toHaveLength(3);
  });

  it('As despesas podem ser adicionadas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'McDonalds');
    userEvent.click(addExpenseBtn);

    const deleteBtn = screen.getAllByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();
  });
});
