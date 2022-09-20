import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { overrideExpense } from '../redux/actions/index';

class EditSavedExpense extends Component {
  state = {
    id: '',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.getExpenseToEdit();
  }

  getExpenseToEdit = () => {
    const { expenses, idToEdit } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === Number(idToEdit));
    this.setState(expenseToEdit);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveExpense = async () => {
    const { dispatch, expenses } = this.props;
    const { id } = this.state;

    const index = expenses.findIndex((e) => e.id === id);
    const editedExpenses = [...expenses];
    editedExpenses[index] = this.state;

    await dispatch(overrideExpense(editedExpenses));
  };

  render() {
    const { btnDisabler, currency,
      description, method, tag, value } = this.state;
    const { currencies } = this.props;

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
            Payment:
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
            Editar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

EditSavedExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EditSavedExpense);
