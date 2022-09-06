import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('A página de login renderiza corretamente', () => {
  it('Utiliza a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O input email é renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
  });

  it('O input password é renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it('O botão "Entrar" é renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(loginBtn).toBeInTheDocument();
  });

  it('Os inputs são validados corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, 'this-is-not-an-email');
    userEvent.type(passwordInput, 'abcdef');
    expect(loginBtn).toHaveAttribute('disabled');

    userEvent.type(emailInput, 'correct@email.com');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).not.toHaveAttribute('disabled');
  });

  it('Após login o usuário é direcionado para a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, 'correct@email.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});
