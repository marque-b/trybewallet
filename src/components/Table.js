import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseFromState, editExpenseFromState } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const filtered = expenses.filter((expense) => expense.id !== Number(target.id));
    dispatch(removeExpenseFromState(filtered));
  };

  editExpense = ({ target }) => {
    const { dispatch } = this.props;
    const idToEdit = target.id;
    dispatch(editExpenseFromState(idToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses
              .map(({ id, value, description, currency, method, tag, exchangeRates }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      id={ id }
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.editExpense }
                    >
                      Edit
                    </button>
                    <button
                      id={ id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteExpense }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
