import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailLogin, nameLogin, tokenLogin } from '../redux/actions';
import { fetchToken } from '../services/fetchApi';
// import { fetchQuestions } from '../services/fetchApi';
// import { fetchUserToken } from '../redux/actions';

class Login extends Component {
  state = {
    nameUser: '',
    emailUser: '',
    disable: true,
    // tokenUser: '',
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
    const { nameUser, emailUser } = this.state;
    const { history, dispatch } = this.props;

    dispatch(nameLogin(nameUser));
    dispatch(emailLogin(emailUser));

    const userTokenResponse = await fetchToken();

    dispatch(tokenLogin(userTokenResponse));
    localStorage.setItem('token', userTokenResponse);
    history.push('/game');
  };

  render() {
    const { nameUser, emailUser, disable } = this.state;
    const { history } = this.props;

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
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
