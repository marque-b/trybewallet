import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const walletTotal = expenses.reduce((total, current) => {
      const currency = current.exchangeRates[current.currency];
      const rate = currency.ask * current.value;
      const toFixed = Number(rate.toFixed(2));

      return total + toFixed;
    }, 0.00);

    return (
      <header>
        <div data-testid="email-field">
          User:
          { email }
        </div>
        <p>Total:</p>
        <p data-testid="total-field">
          { walletTotal === 0 ? <p>0.00</p> : walletTotal }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
};

export default connect(mapStateToProps)(Header);
