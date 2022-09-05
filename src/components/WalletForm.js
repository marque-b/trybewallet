import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestCurrencies from '../services/currenciesAPI';
import { updateCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  async componentDidMount() {
    const data = await requestCurrencies();
    const allCurrencies = Object.keys(data);
    const selectCurrencies = allCurrencies.filter((curr) => curr !== 'USDT');
    const { dispatch } = this.props;
    dispatch(updateCurrencies(selectCurrencies));
  }

  render() {
    const { currencies } = this.props;

    return (
      <section>
        <form>
          <label htmlFor="value-input">
            Value:
            <input type="number" id="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            Description:
            <input type="text" id="description-input" data-testid="description-input" />
          </label>
          <label htmlFor="currency-input">
            Currency:
            <select id="currency-input" data-testid="currency-input">
              {currencies.map((currency) => (
                <option value={ currency } key={ currency }>{ currency }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Payment Method:
            <select id="method-input" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Category:
            <select id="tag-input" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
