import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeUserInfo } from '../redux/actions/index';

const FIVE = 5;

class Login extends Component {
  state = {
    email: '',
    password: '',
    btnDisabler: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.isBtnDisabled(); });
  };

  isBtnDisabled = () => {
    const { email, password } = this.state;
    if (email.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) && password.length > FIVE) {
      this.setState({ btnDisabler: false });
    } else { this.setState({ btnDisabler: true }); }
  };

  render() {
    const { dispatch, history } = this.props;
    const { email, password, btnDisabler } = this.state;

    return (
      <div>
        <img src="../images/imgbin_wallet-icon-png.png" alt="TrybeWallet" />
        <form>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
          />
          <br />
          <button
            type="button"
            disabled={ btnDisabler }
            onClick={ () => dispatch(
              changeUserInfo(email),
              history.push('/carteira'),
            ) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
