import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestCurrencies from '../services/currenciesAPI';
import { updateCurrencies, expenseRecord } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    btnDisabler: true,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    const exchangeRates = await requestCurrencies();
    this.setState({ exchangeRates });
    const allCurrencies = Object.keys(exchangeRates);
    const selectCurrencies = allCurrencies.filter((curr) => curr !== 'USDT');
    const { dispatch } = this.props;
    dispatch(updateCurrencies(selectCurrencies));
  };

  changeTransactionId = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  clearInputs = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  saveExpense = async () => {
    this.fetchCurrencies();
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    this.setState({ id });
    const { dispatch } = this.props;
    await dispatch(expenseRecord({
      id, value, description, currency, method, tag, exchangeRates,
    }));
    this.changeTransactionId();
    this.clearInputs();
  };

  isAddBtnDisabled = () => {
    const { description, value } = this.state;
    if (description !== '' && value !== '') {
      this.setState({ btnDisabler: false });
    } else { this.setState({ btnDisabler: true }); }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isAddBtnDisabled());
  };

  render() {
    const { btnDisabler, currency,
      description, method, tag, value } = this.state;
    const { currencies, editMode } = this.props;

    return (
      <section>
        <form>
          <label htmlFor="value-input">
            Value:
            <input
              name="value"
              type="number"
              id="value-input"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description-input">
            Description:
            <input
              name="description"
              type="text"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency-input">
            Currency:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((curr) => (
                <option value={ curr } key={ curr }>{ curr }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Payment Method:
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Category:
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.saveExpense }
            disabled={ btnDisabler }
          >
            { editMode ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
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
