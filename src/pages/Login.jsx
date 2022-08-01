import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  handleClick = () => {
    this.setState({ loading: true }, async () => {
      const { history, inputName } = this.props;
      await createUser({ name: inputName });
      history.push('/search');
    });
  }

  render() {
    const { isDisabled, inputName, checkName } = this.props;
    const { loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-login">
            <input
              type="text"
              data-testid="login-name-input"
              value={ inputName }
              onChange={ checkName }
              name="user"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        )
    );
  }
}

Login.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  inputName: PropTypes.string.isRequired,
  checkName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
