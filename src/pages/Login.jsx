import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../services/fetchApi';
import { fetchUserToken } from '../redux/actions';

class Login extends Component {
  state = {
    nameUser: '',
    emailUser: '',
    disable: true,
    tokenUser: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.valiedateField);
  };

  valiedateField = () => {
    const { nameUser, emailUser } = this.state;
    const verifyName = nameUser.length > 0;
    const regex = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;
    const verifyEmail = emailUser.match(regex);
    this.setState({ disable: !(verifyName && verifyEmail) });
  };

  handleClick = async (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { tokenUser } = this.state;
    console.log(dispatch);
    this.setState({ tokenUser: await fetchToken(tokenUser) });
    dispatch(fetchUserToken(this.state));
  };

  render() {
    const { nameUser, emailUser, disable } = this.state;

    return (
      <form>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="emailUser"
            id="email"
            value={ emailUser }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="name"
            name="nameUser"
            id="name"
            value={ nameUser }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          type="submit"
          onClick={ this.handleClick }
          disabled={ disable }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
