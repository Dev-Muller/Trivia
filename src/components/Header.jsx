import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score, token } = this.props;
    const hash = md5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img src={ gravatarUrl } alt="Profile" data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{name}</h4>
        <h4>{email}</h4>
        {token && (
          <p data-testid="header-score">
            Score:
            {' '}
            {score}
          </p>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
  token: state.player.token,
});

export default connect(mapStateToProps)(Header);
