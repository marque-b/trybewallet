import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    totalSpent: 0,
  };

  render() {
    const { totalSpent } = this.state;
    const { email } = this.props;

    return (
      <header>
        <div data-testid="email-field">
          User:
          { email }
        </div>
        <div data-testid="total-field">
          Total:
          { totalSpent }
          <div data-testid="header-currency-field">
            BRL
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
