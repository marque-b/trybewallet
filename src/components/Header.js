import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    // const { user } = this.props;
    // const { email } = user;
    // console.log(email);
    return (
      <p>A</p>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user.email,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string }).isRequired,
};

export default connect(mapStateToProps)(Header);
